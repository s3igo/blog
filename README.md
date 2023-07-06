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

## 設計思想

任意のエディタで編集できることとロックインを避けることを意識してCMSを使わず、
素のMarkdownで記事を作成しています。

## ディレクトリ構成

### ルート

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

npm workspacesを使ってルートから動かず作業するようにしています。
記事を書くときのみ、記事実体がある`./app/src/data`に移動して作業します。

### コンポーネント

```shell
$ tree ./app/src/components -d
./app/src/components
├── atoms      # Atom
├── molecules  # Molecule
└── organisms  # Organism

4 directories
```

Atomic Designを参考にしています。
しかし、コンポーネントの粒度が曖昧になりがちな部分を解消するため、
以下のような基準を設け、振り分けるべきディレクトリを明確にしています。

```mermaid
flowchart TB
    A([コンポーネント]) --> B[状態を持ってる?]
    B -->|Yes| C([Organism])
    B -->|No| D[他のコンポーネントに依存してる?]
    D -->|Yes| E([Molecule])
    D -->|No| F([Atom])
```

また、TemplateとPageはコンポーネントとして扱わず、
Templateは`./app/src/layouts`に、Pageは`./app/src/pages`に配置しています。
これは、Astroにはデフォルトで`layouts`ディレクトリと`pages`ディレクトリが用意されているためです。


## 開発環境

Git、Docker、GNU makeが必要です。
エディタとコンテナの内外を問わず開発できるようにしてありますが、
LSPや拡張機能などの開発支援ツールが設定済みであるVSCodeのDev Containerを使うのがベターです。
VSCodeを使う場合は、Multi-root Workspaces機能を利用することを想定しているため、
プロジェクトフォルダの代わりに`./blog.code-workspace`を開きます。

### Makefile

Makefileをタスクランナーとして活用し、コンテナ内外で同じコマンドが使えるようにしてあります。
基本的にnpm-scriptsをラップする形でターゲットを定義していますが、
以下に当てはまるもののみ実装して必用以上にコマンドが増えないようにしています。

- 使用頻度が高い
- 複数のコマンドを組み合わせる必要がある
- コンテナ外から実行するのが大変

### 開発手法

Issue駆動で開発し、PRの`close`コメントでIssueを閉じます。
軽微な変更の場合、Issueを立てずにPRを作成することもあります。
また、PRは`squash and merge`でマージします。
ブランチ戦略はGit-flowでreleaseブランチは省き、
mainブランチにマージすることで本番環境にデプロイされます。
