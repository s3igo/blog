---
layout: ~/layouts/Blog.astro
pubDate: 2023-02-21
updatedAt: 2023-03-03
tags: [programming]
---

# Astroの新機能、Content Collectionsを使わない理由

このブログは[Astro](https://astro.build/)で作られています。
AstroはNext.jsやNuxt、SvelteKitといった競合が存在するレンダリングフレームワークの1つで、
歴史が浅いながら[The State of JS 2022](https://2022.stateofjs.com/ja-JP/libraries/rendering-frameworks/)
ではランキング1位を獲得しています。
このブログを作ってみて（まだ完成してませんが）多少なりともAstroについて理解が深まったので、思ったことをまとめてみます。

## Astroの特徴

詳しい説明は[公式ドキュメント](https://docs.astro.build/ja/concepts/why-astro/)が分かりやすいためそちらに譲るとして、
Astroについて軽く紹介しておこうと思います。

AstroはMPAを構築するためのフレームワークです。
インタラクティブな部分のみでHydrationを行う方法を採っているため、最小限のJavaScriptが配信されます。
こうしてPartial Hydrationを実現する方針はIsland Architectureと呼ばれ、Deno Freshなどとも共通しています。
公式が提供するアダプターによってSSRも可能です。
Remixなど例外はあるものの、Next.jsを筆頭にできる限りを静的ジェネレーションで済まそうとする手法は最近のトレンドのようです。

Astroは`.astro`拡張子を持つファイルをコンポーネントとして扱います。
Astroコンポーネントはビルド時に実行されるJavaScriptとhtmlを含み、
ReactやVueのコンポーネントを埋め込むことができます。
また、`.astro`の他に`.html`や`.md`のような拡張子を持つファイルもページとして扱うことができます。
このような柔軟性とパフォーマンスの両立がAstroの特徴です。

## Astroを使ってみた感想

Astroを使ってみて最初に感じたのは、学習コストの低さです。
`src/pages`ディクレトリ以下のfile-system based routingは直感的で、Next.jsに触れたことがあればすぐに理解できます。
もちろん、ファイル名を`[id].astro`のような形式にすることによるDynamic Routesもサポートされています。

Astroの肝となるAstroコンポーネントについて、ビルド時に実行されるスクリプトは、
Markdownにおけるfrontmatterのような記法で囲みます。
そうすることによってロジックが構造と視覚的に離れるため、直感的で分かりやすいです。
また、テンプレートと呼ばれる構造部分はほぼHTMLのままで書くことができ、
`.jsx`のような式の埋め込みや、テンプレートエンジンのようなスロットにも対応しています。

個人的にはこの部分が絶妙だと思っていて、JavaScriptを拡張したJSX記法では、
記述量が多くなったり、Childrenを含むPropsの処理が分かりにくくなったりしがちです。
対してHTMLをベースにした各種テンプレートエンジンは、
言語によるところが大きいかもしれませんが、独自記法が多くてとっつきにくい印象があります。
しかし、Astroのテンプレートの独自記法はせいぜい`<slot />`や、
ハイドレーションのディレクティブぐらいで、動的な生成はJSX方式の式の埋め込みで表現します。

Astroコンポーネントは、ビルド時にHTMLを生成するものであると同時に、
各種フロントエンドライブラリのコンポーネントと同じように扱われ、
いわんや各コンポーネントを組み込むことさえできてしまうものです。
そのためセマンティクスとしてはテンプレートエンジンに近く、
シンタックスとしてはJSXに近いものと言えるのではないでしょうか。
このような、JSXとテンプレートエンジンの良いとこ取りをしたAstroコンポーネントの存在が、
Astroの魅力を底上げしているのだと思います。これが中庸の徳ということなのでしょうか（絶対違う）。

実際、多様なフロントエンドライブラリとのインテグレーションを強みとするAstroですが、
開発中にReactを使いたいと感じる場面はほとんどありませんでした。
作ったのがブログサイトという性格もあるでしょうが、
状態を持たない（=ビルド時に結果が一意に定まる）限りはAstroコンポーネントで十分で、
状態を持つ場合のみReactなどのライブラリの力を借りることになりそうです。

また、Astroコンポーネントの副次的な効果として、Tailwind CSSとの相性が良いということが発見できました。
Astroはデフォルトで名前空間をコンポーネントに閉じてくれるため、
`<style>`タグ内で`@apply`ディレクティブを使ってクラス名に対してスタイルを当てても、グローバル空間を汚染することがありません。
`@apply`ディクレクティブの使いすぎはTailwindの良さを潰してしまうため考えものですが、
WETになりがちなTailwindのコードをDRYに保つための方法として一考の価値がある方法のひとつだと考えています。
本来、このコンポーネントに閉じたスタイルの再利用は、
JSXを用いるReactプロジェクトであればtwin.macroなどのライブラリを導入してはじめて実現できるものです。

ここまで散々褒め千切ってきたように、今後MPAを作るならAstroしか使いたくないと思えるほど完成度が高いフレームワークでした。
強いて欠点を挙げるのであれば、まだエコシステムが成熟していない所でしょうか。
これだけ注目度の高いフレームワークなので、この問題は時間が解決してくれると思いますが、
Next.jsと比較すると、ネット上の情報量や周辺ライブラリの観点で痒いところに手が届かないと感じることがあります。
しかし、これはさらなる発展の余地があるとポジティブに捉えることもできるので、やっぱ欠点なんてありません。
Astro最強です。Astroしか勝たん。

## Content Collection

お待たせしました、ようやく本題に入ります。ちょうどこのブログの開発中にAstro2.0が正式リリースされたため、早速このブログサイトにも導入してみました。
Astro2.0ではいくつかの新機能が追加されましたが、なかでも最大の変更点は、
Content Collectionの正式導入です。

Content Collectionとは、型安全なfrontmatterスキーマのバリデーションや、
コンテンツを一括取得するためのシンプルなAPIの提供など、Markdownのコンテンツを包括的に管理するために便利な機能です。
`src/content`という予約ディレクトリにスキーマ定義とMarkdownファイルを置くことにより有効化でき、
ブログやメディアサイトを作成するのにうってつけの機能です。
なので、当然私もこれに飛びついたわけですが、導入してみてもいまいちしっくりきませんでした。

### 犠牲にしているもの

まずは、`src/pages`以下にMarkdownをポン置きしてもページとして表示してくれるというAstroの利点です。
Astroは、`.md`のファイルでも、frontmatterにて適用するレイアウトを指定しておけばよしなに表示してくれるという特徴があります。
しかし、Content Collectionはそれを犠牲にルーティングとコンテンツの執筆を分離を実現しています。

イマイチだと感じた最大の原因は、Astroの柔軟性を犠牲にしている点です。
Content Collectionは、`getCollection()`と`getEntryBySlug()`というコンテンツを取得するAPIを提供します。
しかし、もともとAstroは`Astro.glob()`という似たようなことができるAPIを持っています。
`getCollction()`のコールバック関数による絞り込みや`getEntryBySlug()`による単一記事の取得は、
`Astro.glob()`で全件取得してから`filter`メソッドや`find`メソッドで絞り込んでもさほど実装量は変わりません。
加えて、これはビルド時に実行されるためクライアントにおけるパフォーマンスにも影響しません。

また、AstroはRemark PluginによってMarkdownの前処理が可能で、それらはレンダリング時のみ実行されます。
従って、`getCollection()`や`getEntryBySlug()`によって取得した記事は、
各記事の`render()`メソッドが返すPromiseを解決しないとRemark Pluginによって追加されたfrontmatterにアクセスできません。
そのためそれらの動的なプロパティは、zodのバリデーションによって実現する型安全なfrontmatterの恩恵に与ることもできません。
これは
[Astroのドキュメントでも言及されている](https://docs.astro.build/ja/guides/content-collections/#modifying-frontmatter-with-remark)
注意点です。

このように、Content Collectionは得られる恩恵とRemark Pluginとの相性が微妙でAstroの柔軟性を犠牲にするため、
私は使っていません。
もちろん、リリースされたばかりの新機能なので、どんどん改善されていくことになるとは思いますし、
複数のコンテンツタイプがある場合やurlを動的に割り当てたい場合は有効な方法だと思っています。

### じゃあどうするか

コンテンツの取得のためのAPIは、素直に`Astro.glob()`を使います。
この場合はもともとのMarkdownが持つものとRemark Pluginによって追加されたもの問わず、
各記事の`frontmatter`プロパティからfrontmatterにアクセスできます。

zodのバリデーションは、remarkPluginによって実現します。
例えば、frontmatterのスキーマをこのように定義するとします。

```ts:types.ts
import { z } from 'astro/zod';

export const frontmatterSchema = z.object({
    layout: z.literal('~/layouts/Blog.astro'),
    title: z.string(),
    tags: z.array(z.string()).nonempty().optional(),
    description: z.string(),
    draft: z.literal(true).optional(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
});
```

そして、Remark Pluginとして以下を実装します。

```ts:remarkPlugin.ts
import { frontmatterSchema as schema } from './types';

export const validateFrontmatter = () => {
    return (_, { data }) => {
        schema.parse(data.astro.frontmatter);
    };
};
```

この`validateFrontmatter`を`astro.config.mjs`にてRemark Pluginの配列の末尾に追加することで、
ビルド時にはなりますが、動的に追加したプロパティを含むfrontmatterのバリデーションを行なうことができます。
