# blog

[![CI](https://github.com/s3igo/blog/actions/workflows/main.yml/badge.svg?event=push)](https://github.com/s3igo/blog/actions/workflows/main.yml)
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
- UIライブラリ: Solid
- CSSフレームワーク: TailwindCSS
- リンター・フォーマッター: Biome
- ドメイン・デプロイ・CDN: Cloudflare
- 単体テスト: Vitest
- E2Eテスト: Playwright
- CI/CD: GitHub Actions
- 依存関係管理: Renovate

## 設計思想

ハイパフォーマンスかつシンプルで人的ミスの発生する余地が小さいこと

## ディレクトリ構成

```sh
.
├── .github
│   └── workflows # Github Actions
├── plugins # remark / rehype プラグイン
├── public # 静的なアセット
├── src
│   ├── components # 再利用可能なコンポーネント
│   ├── content # 記事
│   ├── features # 機能ごとのコンポーネント
│   ├── layouts # グリッドレイアウトのためのコンポーネント
│   └── pages # ルーティング
└── tests
    └── e2e # E2Eテスト
```
packaged by featureに寄せています。

`src/layouts/`ではコンポーネントのimportを行わず、スタイルを当てることのみを責務とします。
`src/pages/`以下のファイルのみからimportされるコンポーネントを`src/features/`に配置し、
それ以外の再利用可能なコンポーネントは`src/components`に配置しています。

## 開発

`develop`ブランチを`main`ブランチにマージすることで本番環境に反映されます。

Issue駆動で開発し、PRの`closes`コメントでIssueを閉じます。
軽微な変更の場合、Issueを立てずにPRを作成することがあります。

新規コミットを含むブランチから`develop`ブランチへは`squash and merge`を行い、
`main`ブランチへはマージコミットを作成してマージします。

## ライセンス

[MIT](LICENSE)
