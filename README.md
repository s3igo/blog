# blog

私の個人ブログです。

<ul>
    <li>ブログ本体: <a href="https://blog.tsuki-yo.net" target="_blank">https://blog.tsuki-yo.net</a></li>
    <li>タスク管理: <a href="https://github.com/s3igo/blog/issues" target="_blank">https://github.com/s3igo/blog/issues</a></li>
    <li>プロジェクト管理: <a href="https://github.com/users/s3igo/projects/1/views/1" target="_blank">https://github.com/users/s3igo/projects/1/views/1</a></li>
</ul>

## 背景・方針

プログラミングのこと日常のこと問わず、アウトプットの場が欲しかったので作りました。
詳しくは<a href="https://blog.tsuki-yo.net/posts/first-post/" target="_blank">こちら</a>へ。

## ディレクトリ構成

```shell
$ tree -ad -L 1 -I node_modules -I .git
.
├── .devcontainer  # devcontainerの設定
├── .github        # GitHub Actionsの設定
├── app            # ソースコード
├── contents       # ブログ記事
└── infra          # 開発環境のDockerfile

6 directories
```

npm workspacesを使ってルートから動かず作業するようにしています。

##  技術選定

- 言語: TypeScript
- レンダリングフレームワーク: Astro
- CSSフレームワーク: tailwindCSS(PostCSS)
- リンター: ESLint
- フォーマッター: Prettier
- ドメイン・デプロイ・CDN: Cloudflare

## 開発

### 環境

Git、Docker、GNU makeが必要です。
コンテナの内外どちらでも開発できるようにしてありますが、VSCodeのDev Containerを使うのが最も手っ取り早いです。
VSCodeを使う場合は、workspace機能を利用することを想定しているため、ディレクトリではなく`./blog.code-workspace`を開きます。

### 手法

Issue駆動で開発し、1つのIssueに対して1つのPRを対応させています。
PRは、squash and mergeでマージします。
ブランチ戦略はGit-flowで、releaseブランチは省いています。
