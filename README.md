# www.tsukuba.wide.ad.jp (Zola)

WIDE Project つくばNOCのWebサイトを Zola で構築したリポジトリです。

## 開発

```bash
npm install
npm run site:serve
```

`site:serve` / `site:build` 実行時に Tailwind のユーティリティCSS（`static/css/tailwind.css`）も自動生成されます。

## 本番ビルド

```bash
npm run site:build
```

## 更新ポイント

### フロント依存（Swiper / フォント）を更新する

1. `package.json` のバージョンを更新
2. `npm install`
3. （自動で `deps:sync` が実行される）

依存は `package-lock.json` で固定され、実ファイルは `static/vendor` と `static/fonts` に同期されます。

### お知らせを追加する

1. `content/news/` に `YYYY-MM-DD-*.md` を追加
2. Front Matter の `date` と `tags` を設定
3. 障害情報の場合は `tags = ["障害情報"]` を含める

例:

```toml
+++
title = "回線メンテナンスのお知らせ"
date = 2026-03-01
[taxonomies]
tags = ["障害情報", "メンテナンス"]
+++
```

### おもな活動を更新する

- `content/activities.md` を編集
- 英語も更新する場合は `content/activities.en.md` を編集

### メンバーを更新する

- `data/members.json` を編集
- 英語も更新する場合は `data/members.en.json` を編集
- `active` と `alumni` に分けて管理
- `active` には `grade`（例: `B1`）と `department` を設定
- `alumni` は `department` のみでOK

### i18n

- デフォルトは日本語（`ja`）、英語は `en`
- 文字列翻訳は `config.toml` の `[translations]` と `[languages.en.translations]`
- コンテンツ翻訳は `content/*.en.md` を追加
- データ翻訳が必要なページは `data/*.en.json` を追加

### 通常ページ（Markdownのみ）を追加する

1. `content/` に `*.md` を追加
2. ナビに出したい場合は `config.toml` の `[[extra.nav]]` を追加
