# blog

[![CI](https://github.com/s3igo/blog/actions/workflows/ci.yml/badge.svg)](https://github.com/s3igo/blog/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/s3igo/blog/branch/develop/graph/badge.svg?token=P01847QGIK)](https://codecov.io/gh/s3igo/blog)

私の個人ブログです。

- ブログ本体: https://blog.tsuki-yo.net
- RSS: https://blog.tsuki-yo.net/rss.xml
- タスク管理: https://github.com.s3igo/blog/issues
- プロジェクト管理: https://github.com/users/s3igo/projects/1/views/1
- カバレッジ: https://app.codecov.io/gh/s3igo/blog

## 技術スタック

- パッケージマネージャー: Bun
- レンダリングフレームワーク: Astro
- UIライブラリ: SolidJS
- CSSフレームワーク: TailwindCSS
- リンター・フォーマッター: Biome
- ドメイン・デプロイ・CDN: Cloudflare
- 単体テスト: Vitest
- E2Eテスト: Playwright
- VRT: Playwright + reg-suit
- CI/CD: GitHub Actions
- 依存関係のアップデート: Renovate

## 設計思想

ハイパフォーマンスかつシンプルで人的ミスの発生する余地が小さいこと

## ディレクトリ構成

```sh
.
├── .github
│   └── workflows # Github Actions
├── .scaffdog # スキャフォールディングの設定
├── plugins # remark / rehype プラグイン
├── public # 静的なアセット
├── src
│   ├── components # 再利用可能なコンポーネント
│   ├── content # 記事
│   ├── features # 機能ごとのコンポーネント
│   ├── layouts # グリッドレイアウトのためのコンポーネント
│   └── pages # ルーティング
│   └── utils # ユーティリティ関数
├── styles
└── tests
    ├── e2e # E2Eテスト
    └── vrt # ビジュアル回帰テスト
```
packaged by featureに寄せています。

`src/layouts/`ではコンポーネントのimportを行わず、スタイルを当てることのみを責務とします。
`src/pages/`以下のファイルのみからimportされるコンポーネントを`src/features/`に配置し、
それ以外の再利用可能なコンポーネントは`src/components`に配置しています。

## 開発

ブランチ戦略はGitHub flowを採用し、
`main`ブランチが本番環境に対応しています。

Issue駆動で開発し、通常PRの`closes`コメントでIssueを閉じます。

RenovateによるPRは常にマージコミットを作成します。
その他のPRは通常のマージまたは`squash and merge`でマージします。

## ライセンス

[MIT](LICENSE)
