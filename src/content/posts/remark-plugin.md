---
title: remarkプラグインでMarkdownをいじる
tags: []
published: 2024-03-25
updated:
draft: true
---

最近このブログに大幅に手を加えました。
そのときに作成したremarkプラグインを紹介します。

## remarkとrehype

このブログは[Astro](https://astro.build/)製で、
AstroではMarkdownファイルを直接ページとして扱えます。
直接ページとして扱えるということは
内部でMarkdownからHTMLに変換しているということになり、

Astroはremarkとrehypeというツールを用いてMarkdownからHTMLへの変換します。
Markdownにはmdastという抽象構文木（AST）の形式があり、
同様にHTMLにはhastというASTの形式があります。
remarkはmdastを、rehypeはhastを扱うためのものです。
つまり、Markdownをmdastに変換し、mdastをhastに変換し、hastからHTMLを構築する
処理の流れになっています。

remarkとrehypeはプラグインシステムを持ち、
それらのプラグインを作成することによって、
変換時に任意の処理を挟み込むことができます。

## 困っていること

ずばり、`\n`や`\r\n`などの改行(Soft line breaks)が半角スペースとして扱われてしまうことです。
これはもともとHTMLの仕様ですが、MarkdownはHTMLを記述する際の負担を減らすことを
目的とした形式であるため、Markdownもこの仕様を持っています。

これの何が困るかというと、 
可読性のための改行が不自然なスペースとして表示されてしまうことです。 
英語圏であれば単語を半角スペースで区切ることが一般的なので 
特に問題になることはありませんが、 
単語の区切りにスペースを使わない我々日本語圏に暮らすものとしては 
頭を悩ませる問題です。 

視覚的にどのくらいの影響を与えるか確認するために、1つ前の段落では
<!-- TODO: -->


## 解決策

改行が半角スペースとして扱われるのが問題ならば、改行をなくしてしまえば万事解決です。
Markdownでは明示的な改行（Hard line breaks）は行末に2つのスペースやバックスラッシュを置くことで
表現するため、改行を排除しても問題ありません。
英語の文章を書いていて、視認性のための改行するときだけ行頭か前の行の行末に
明示的に半角スペースを配置することを気をつければOKです。

今回はもともとのMarkdownから改行をなくしてしまうというアプローチのため、
remarkプラグインを作成します。
実際のコード以下のとおりになります。

```js title="remark-strip-line-breaks.ts"
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

type Text = Node & { value: string };

export const remarkStripLineBreaks = () => (tree: Node) => {
    visit(tree, 'text', (node: Text) => {
        node.value = node.value.replace(/\r?\n|\r/g, ''); // matches \r\n, \n, \r
    });
};
```

やっていることとしては文字列から正規表現で改行を探して、
マッチしたものをすべて削除しているだけです。
unist-util-visitを使うと、
構文木の各ノードをたどってくれるため、簡単にテキストをいじることができます。

あとは、Astroの設定ファイルに追加して完成です。

```ts title="astro.config.ts"

```

今回取り上げたremarkプラグインを使っている
[このブログのコード]()はGitHubで公開しています。

## 参考

https://spec.commonmark.org/0.31.2/
