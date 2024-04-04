---
title: remarkプラグインでMarkdownをいじる
tags: [programming]
published: 2024-04-04
updated:
draft: false
---

このブログを作成するために使用している[Astro](https://astro.build/)では、
`.md`や`.mdx`のレンダーにremark/rehypeプラグインを挟み込むことができるため、
プラグインを作ることさえできればMarkdownを好きに処理できます。

プラグインを自作するというと敷居が高そうに見えますが、
ちょっとしたものであれば数行のコードで実現可能です。

## 困っていること

Markdownを使っていて、
`\n`や`\r\n`などの改行（Soft line breaks）が半角スペースとして扱われてしまうことに困っています。
これはもともとHTMLの仕様ですが、
MarkdownはHTMLを筆頭とする構造化テキストを記述する際の負担を減らすための形式であるため、
HTMLに変換した際この仕様の影響を受けます。

これの何が困るかというと、プレーンテキストとしての可読性のための改行が
レンダリング後に不要なスペースとして残ってしまうことです。
英語圏であれば単語を分かち書きすることが一般的なので、
このスペースがないと改行前と後の単語がつながってしまうため、
これは自然な挙動と言えます。
しかし、分かち書きをしない我々日本語圏に暮らすものとしては頭を悩ませる問題です。

これをプラグインによって解決してみます。&nbsp;
ちなみに、視覚的にどのくらいの影響を与えるか確認するために、&nbsp;
この段落ではあえて今回作成したプラグインを適用しない状態を&nbsp;
再現しています。&nbsp;

上の段落について、

> 解決してみます。

> 確認するために、

> しない状態を

> 再現しています。

の後に不要なスペースが表示されていることが分かります。
句読点の後ろのスペースは違和感を感じにくいですが、

> しない状態を

<!-- textlint-disable ja-technical-writing/no-doubled-joshi -->
の後のスペースはわかりやすいのではないでしょうか。
<!-- textlint-enable -->

## 解決策

改行が半角スペースとして扱われるのが問題ならば、改行を消し去ってしまえばいいです。
Markdownでは行末に2つのスペースまたはバックスラッシュを置くことで明示的な改行（Hard line breaks）を
表現するため、`\n`や`\r\n`などの改行文字を取り除いても問題ありません。
英語の文章で視認性のための改行するときだけ、
改行後の行頭か改行する行の行末に明示的に`&nbsp;`を配置すればOKです。

ちなみに、Astroで使えるremarkとrehypeについて、
remarkはMarkdownのAST(抽象構文木、英: abstract syntax tree)を扱い、
rehypeはHTMLのASTを扱うためのものです。

今回はMarkdownから改行をなくすアプローチを採るため
remarkプラグインを作成します。
実際のコード以下のとおりです。

```ts title="remark-strip-line-breaks.ts"
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

type Text = Node & { value: string };

const remarkStripLineBreaks = () => (tree: Node) => {
    visit(tree, 'text', (node: Text) => {
        node.value = node.value.replace(/\r?\n|\r/g, ''); // matches \r\n, \n, \r
    });
};

export default remarkStripLineBreaks;
```
やっていることは単純で、
ASTのテキストを含む全てのノードから正規表現で改行を探し、
マッチしたものすべてを削除しているだけです。
[unist-util-visit](https://www.npmjs.com/package/unist-util-visit)
を使うとASTのノードをたどる処理を簡単に書くことができます。

なお、remarkのAST形式であるmdastやrehypeのAST形式であるhastが基づくunistは拡張を前提とした
型になっているため雑に`Text`型を定義して使っています。
カリー化関数になっているところは注意です。

あとは、Astroの設定ファイルに追加して完成です。

```ts title="astro.config.ts" ins={1,5-7}
import remarkStripLineBreaks from './remark-strip-line-breaks';

export default defineConfig({
    // ...
    markdown: {
        remarkPlugins: [stripLineBreaks],
    },
});
```

## 参考

- https://spec.commonmark.org/0.31.2/
- https://unifiedjs.com/learn/guide/create-a-plugin/
