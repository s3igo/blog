# blog

[![CI](https://github.com/s3igo/blog/actions/workflows/main.yml/badge.svg?event=push)](https://github.com/s3igo/blog/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/s3igo/blog/branch/develop/graph/badge.svg?token=P01847QGIK)](https://codecov.io/gh/s3igo/blog)

私の個人ブログです。

- ブログ本体: https://blog.tsuki-yo.net
- RSS: https://blog.tsuki-yo.net/rss.xml
- タスク管理: https://github.com.s3igo/blog/issues
- プロジェクト管理: https://github.com/users/s3igo/projects/1/views/1
- カバレッジ: https://app.codecov.io/gh/s3igo/blog

## 背景・方針

プログラミングのこと日常のこと問わず、アウトプットの場が欲しかったので作りました。
詳しくは[こちら](https://blog.tsuki-yo.net/posts/2023-01-01/first-post)へ。

## 技術スタック

- 言語: TypeScript
- パッケージマネージャー: npm
- レンダリングフレームワーク: Astro
- UIライブラリ: solid-js
- CSSフレームワーク: tailwindCSS
- リンター: ESLint
- フォーマッター: Prettier
- ドメイン・デプロイ・CDN: Cloudflare
- 単体テスト: Vitest
- E2Eテスト: Playwright
- CI/CD: GitHub Actions
- 依存関係管理: Renovate

## 設計思想

ハイパフォーマンスかつシンプルであることを重視しています。  
また、自動化や型による保護を積極的に取り入れ、人的ミスが発生する余地をなくすことを目指しています。

### 記事

任意のエディタで編集できることとロックインを避けることを意識してCMSを使わず、
素のMarkdownで記事を作成しています。

### コード品質

Lintをできるだけ厳しく設定することでテストを最小限にとどめています。
ブログというメディアは要件上複雑なビジネスロジックを必要としないため、
この運用で十分だと考えています。
<!-- WIP: また、実際の環境での動作を重視して結合テストを行わず、
E2Eテストの比重を大きくしています。 -->

### 型

扱うデータはすべて型で表現し、Primitive Obsessionに陥ることを避けています。
型による安全性をさらに高めるため、Opaque型を適用して各データを公称型として扱っています。

## ディレクトリ構成

各ディレクトリについて、さらにサブディレクトリを作るときは`index.{ts,tsx,astro}`を特別視せず、
ファイル名と同名のディレクトリを作るようにしています。
これは、既存のコードを移動・変更せずに拡張性を高めるため、エディタのタブ表示の治安を保つためです。

```shell
$ tree -ad -L 2 -I 'node_modules|.git|.astro'
.
├── .github
│   └── workflows  # GitHub Actions
├── public
├── src
│   ├── components # UIコンポーネント
│   ├── content    # 記事実体
│   ├── domain     # ドメインに紐づく処理
│   ├── pages      # ページルーティング
│   ├── styles     # グローバルに適用されるCSS
│   └── utils      # プロジェクト全体で使うユーティリティ
└── tests
    └── e2e        # E2Eテスト

13 directories
```

### UIコンポーネント

```shell
$ tree ./src/components -L 1
./src/components
├── base     # プロジェクト全体で使うもの
├── features # ページを構成する部品ごとに分割したもの
└── layouts  # ページ全体のレイアウトを担当するもの

4 directories, 0 files
```

## 開発

### 環境

Git、GNU makeが必要です。
エディタを問わず開発できるようにしてありますが、
VS Code Workspaceを使うことを想定し、`blog.code-workspace`を配置しています。
エディタ環境の統一のために`.editorconfig`を、
ツールチェーンのバージョン固定のために`.node-version`と`package.json`のenginesフィールドを使っています。

### 手法

Issue駆動で開発し、PRの`close`コメントでIssueを閉じます。
軽微な変更の場合、Issueを立てずにPRを作成することもあります。
また、PRは`squash and merge`でマージします。
ブランチ戦略はGit-flowでreleaseブランチは省き、
mainブランチにマージすることで本番環境にデプロイされます。

## 詳細

### 記事の管理

記事のメタデータは必要なもののみYAML Frontmatterに記述し、
AstroのContent Collectionを使ってzodによるバリデーションを行って型安全を保っています。
文章の品質を保つためTextlintを使っています。

### テスト

単体テストはVitestのIn-source testingを利用して実際のコードにできるだけ近い位置で書くようにしています。
一応カバレッジの計測は行っていますが、明確な目標は設けていません。

### Opaque型

TypeScriptはStructural typingなので、
Branded typesでOpaque型を作成して部分的にNominal typingを実現しています。
また、型の定義はドメインに紐づけて行うことで、ドメインの変更に伴う修正箇所を最小限に抑えています。

### 自動化

GitHub Actionsを使ってCI/CDの自動化を、Renovateを使って依存関係の更新を自動化しています。
GitHub Actionについては、
ジョブの並列化とキャッシュの活用でできるだけ高速に実行されるよう意識しています。
Cloudflare PagesとのGitHub連携でマージをトリガーに本番環境へのデプロイを行っています。

<!-- 変更容易性 -->
<!-- export制御 -->
