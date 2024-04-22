---
title: もうsatisfiesのないTypeScriptには戻れない
tags: [TypeScript, programming]
published: 2024-03-19
updated: 2024-03-27
draft: false
---

[TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)
で`satisfies`演算子が追加されて以降、もうこれなしのTypeScriptなんては考えられなくなってしまいました。
様々な場面で便利なので、`satisfies`演算子の使い道についてまとめてみます。

## 基本の使い方

`satisfies`演算子は型推論の結果を失わずに型をチェックするために実装されました。

どういうことかというと、例えば、

```ts
const colors = [
    {
        id: 1,
        name: 'red',
    },
    {
        id: 2,
        name: 'blue',
    },
] as const;

type ColorName = (typeof colors)[number]['name'];
// => "red" | "blue"
```

こんな感じで配列からリテラル型のユニオンとして`ColorName`型を得たいとします。
しかし、これだと`ColorName`型は正しく得られるものの、
以下のようなtypoに気づくことができません。

```ts {7}
const colors = [
    {
        id: 1,
        name: 'red',
    },
    {
        ie: 2, // typo
        name: 'blue',
    },
] as const;

type ColorName = (typeof colors)[number]['name'];
// => "red" | "blue"
```

なので、`colors`変数が正しいことを保証するために型注釈を追加してみますが、

```ts ins={1-6} del={7} {19}
type Color = {
    id: number;
    name: string;
};

const colors: Color[] = [
const colors = [
    {
        id: 1,
        name: 'red',
    },
    {
        id: 2,
        name: 'blue',
    },
] as const;

type ColorName = (typeof colors)[number]['name'];
// => string
```

これだと`colors`変数は正しいものの、
型注釈によってwideningが発生し、`ColorName`が`string`型になってしまいます。

そこで、

```ts {15}
type Color = {
    id: number;
    name: string;
};

const colors = [
    {
        id: 1,
        name: 'red',
    },
    {
        id: 2,
        name: 'blue',
    },
] as const satisfies Color[];

type ColorName = (typeof colors)[number]['name'];
// => "red" | "blue"
```

こんな感じで`satisfies`演算子を使ってあげることで、
型推論の結果を活かしながら`colors`変数の型をチェックできます。
もちろん、typoも検出できます。

```ts {12}
type Color = {
    id: number;
    name: string;
};

const colors = [
    {
        id: 1,
        name: 'red',
    },
    {
        ie: 2, // Error: Object literal may only specify known properties, and 'ie' does not exist in type 'Color'.
        name: 'blue',
    },
] as const satisfies Color[];

type ColorName = (typeof colors)[number]['name'];
// => "red" | "blue"
```

より現実的な例としては、Astroで
[`getStaticPaths()`の型チェック](https://docs.astro.build/ja/guides/typescript/#getstaticpaths%E3%81%AE%E5%9E%8B%E3%81%AE%E6%8E%A8%E8%AB%96)
のために`satisfies`演算子が活用されていたりします。

## 別の使い方

型注釈は代入する時のみ利用できるのに対し、
`satisfies`演算子は代入を伴わずに式が返す値の型をチェックできます。

この特徴を利用して以下のような使い方も考えられます。

### switch文の網羅性チェック(exhaustiveness check)をする

こんなコードがあったとします。

```ts
type Subject =
    | { type: 'Math'; level: 'Basic' }
    | { type: 'Science'; level: 'Intermediate' }
    | { type: 'History'; level: 'Advanced' };

const subject: Subject = { type: 'History', level: 'Advanced' };

const printLevel = (subject: Subject) => {
    switch (subject.type) {
        case 'Math': {
            console.log(`Math: ${subject.level}`);
            break;
        }
        case 'Science': {
            console.log(`Science: ${subject.level}`);
            break;
        }
    }
}

printLevel(subject);
```

`subject.type`が`'History'`のときの処理を書き忘れているため、
このコードを実行してもなにも表示されません。

しかし、以下のようにして型レベルで網羅性を保証してあげることができます。

```ts ins={11-12}
const printLevel = (subject: Subject) => {
    switch (subject.type) {
        case 'Math': {
            console.log(`Math: ${subject.level}`);
            break;
        }
        case 'Science': {
            console.log(`Science: ${subject.level}`);
            break;
        }
        default:
            subject satisfies never; // Error: Type '{ type: "History"; level: "Advanced"; }' does not satisfy the expected type 'never'.
    }
}
```

もっとも、`satisfies`演算子を使わずとも、
デフォルトケースで

```ts
const _assert: never = subject;
```

のようにしたり、
`never`型の引数を取る関数に`subject`を渡すことで網羅性チェックはできます。

しかし、前者の方法では`_assert is declared but its value is never read.`のエラーが出てしまい、
後者の方法ではわざわざアサート用の関数を用意しなければいけないという欠点があります。

それを考慮するとやはり`satisfies`を使って網羅性チェックをするのがキレイかなーと思っています。

## 最後に

改めてまとめてみたらあんまり使い道多くなかったですね。
TypeScriptを書いているときは事あるごとに`satisfies`ってタイプしては
`satisfies`が使える現代に生まれたことを感謝していたつもりだったのですが、
ただの気のせいだったようです。

もし他にも便利な用途を見つけたら追記するかもしれません。

