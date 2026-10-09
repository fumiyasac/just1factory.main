# Firestore マイグレーション仕様書

## 概要

`data/*.json`（+ `types/*.ts`）と `docs/FIREBASE_CMS_DESIGN.md` の Firestore コレクション設計案を突き合わせた結果を記録する。Phase 3（Firestore + 管理画面での CMS 化）に移行する際のフィールドマッピング、スキーマ差分、管理画面フォーム設計を本書に集約する。

本書は 2026-10-10 時点のマスターブランチを基準に作成した。実データは `data/*.json` に、型は `types/*.ts` に、Firestore 設計は `docs/FIREBASE_CMS_DESIGN.md` に存在する。

## 用語

- **「設計」** … `docs/FIREBASE_CMS_DESIGN.md` の Firestore コレクション設計案
- **「data.ts」** … 実装側の `types/<section>.ts` + `data/<section>.json` の 1 セット
- **「差分」** … 以下の 4 分類
  - `一致`: 両方にあり型も合っている
  - `data.ts のみ`: data.ts にはあるが Firestore 設計にない
  - `設計のみ`: Firestore 設計にはあるが data.ts にない
  - `型不一致`: 両方にあるが型が異なる（詳細は備考欄）

## セクション別の突き合わせ

### talks

**data.ts のパス:** `types/talks.ts` + `data/talks.json`
**Firestore コレクション名:** `talks/`
**エントリ数:** 176

**フィールド比較:**

| フィールド名 | data.ts の型 | Firestore 設計の型 | 差分 |
|---|---|---|---|
| id | string | ─（ドキュメント ID で表現） | data.ts のみ（Firestore では `{id}` 自動） |
| title | string | string | 一致 |
| event | string (optional) | string | 型不一致（設計は必須、実データでは記事に event が無く任意） |
| date | string（`YYYY-MM-DD`） | timestamp | 型不一致（Firestore 側 timestamp に変換が必要） |
| url | string | ─ | data.ts のみ（設計は `speakerDeckUrl` で命名） |
| speakerDeckUrl | ─ | string | 設計のみ（実データは Zenn / Qiita / SlideShare も含むため汎用 `url` 推奨） |
| platform | `"Speaker Deck" \| "Zenn" \| "Qiita" \| "SlideShare"` | ─ | data.ts のみ（UI バッジ・JSON-LD 用に必須） |
| category | `"ui" \| "cross" \| "arch" \| "async" \| "backend" \| "community" \| "ai"` | ─ | data.ts のみ（UI チップ分類で必須） |
| summary | ─ | string | 設計のみ（実データでは未使用。管理画面で任意入力にする想定） |
| tags | ─ | string[] | 設計のみ（実データでは未使用。カテゴリーで代替しているが将来併用可） |
| year | ─ | number（クエリ用） | 設計のみ（`date` から導出可能、Firestore インデックス高速化のためなら保持） |

**管理画面フォーム設計（逆算）:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| title | テキスト（1行） | ○ | |
| date | 日付 | ○ | `YYYY-MM-DD` |
| platform | セレクト（単一選択） | ○ | 選択肢: Speaker Deck / Zenn / Qiita / SlideShare |
| category | セレクト（単一選択） | ○ | 選択肢: ui / cross / arch / async / backend / community / ai |
| url | URL | ○ | 媒体を問わず単一 URL |
| event | テキスト（1行） | ─ | 登壇イベント名（記事は空） |
| summary | テキストエリア | ─ | 設計由来の任意フィールド（将来のリッチプレビュー用） |
| tags | タグ配列（複数選択） | ─ | 設計由来、既存コードでは未使用 |

---

### books

**data.ts のパス:** `types/books.ts` + `data/books.json`
**Firestore コレクション名:** `books/`
**エントリ数:** 6

**フィールド比較:**

| フィールド名 | data.ts の型 | Firestore 設計の型 | 差分 |
|---|---|---|---|
| id | string | ─（ドキュメント ID） | data.ts のみ |
| title | string | string | 一致 |
| publishedAt | string[] | string（例「技術書典5」） | 型不一致（実データは複数併記あり: 例「技術書典7」「第1回技書博」） |
| releasedAt | string（`YYYY-MM-DD`） | ─ | data.ts のみ（新刊順ソート・発行日表示に使用） |
| description | string[] | string | 型不一致（段落配列、各要素内の "\n" は改行として描画） |
| price | string（例「¥1,000」） | number | 型不一致（通貨記号・補足を含むため文字列保持） |
| priceNotes | string[] | ─ | data.ts のみ（※ 付き価格注釈） |
| coverImage | string | string | 一致 |
| coverAlt | string | ─ | data.ts のみ（`<img alt>` 用） |
| githubUrl | string \| null | string | 型不一致（null 許可。サンプルコード無しの書籍に対応） |
| commercialNote | string \| null | ─ | data.ts のみ（商業化の前段文章） |
| amazonUrl | string \| null | string \| null | 一致（null 許容も同じ） |
| boothUrl | string | string | 一致 |
| sortOrder | number | number | 一致 |

**管理画面フォーム設計（逆算）:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| title | テキスト（1行） | ○ | |
| publishedAt | タグ配列（複数選択/自由入力） | ○ | イベント名を複数併記可能に |
| releasedAt | 日付 | ○ | 新刊順ソートのキー |
| coverImage | 画像パス | ○ | public/books/ 配下 |
| coverAlt | テキスト（1行） | ○ | alt 属性 |
| price | テキスト（1行） | ○ | 「¥1,000」等の表記そのまま |
| priceNotes | テキストエリア（複数行、1 行 = 1 note） | ─ | 空欄なら表示なし |
| description | テキストエリア（複数行、1 段落 = 1 行） | ○ | |
| githubUrl | URL | ─ | 空ならサンプルコードセクション非表示 |
| commercialNote | テキストエリア | ─ | 空なら商業版セクション非表示 |
| amazonUrl | URL | ─ | 空なら Amazon リンク非表示 |
| boothUrl | URL | ○ | 「書籍の内容を確認する」ボタン |
| sortOrder | 数値 | ○ | releasedAt 由来で自動算出も可 |

---

### design

**data.ts のパス:** `types/design.ts` + `data/design.json`
**Firestore コレクション名:** （未定義／`FIREBASE_CMS_DESIGN.md` に該当コレクションなし）
**エントリ数:** 10（gishohaku 8 + oyakata 2）

**フィールド比較:**

Firestore 設計側に design セクションが存在しないため、**全フィールドが「data.ts のみ」** になる。本書で以下の「design コレクション設計案」を提示する。

| フィールド名 | data.ts の型 | Firestore 設計の型 | 差分 |
|---|---|---|---|
| id | string | ─ | data.ts のみ |
| section | `"gishohaku" \| "oyakata"` | ─ | data.ts のみ |
| slug | string | ─ | data.ts のみ |
| image | string | ─ | data.ts のみ |
| title | string | ─ | data.ts のみ |
| subtitle | string (optional) | ─ | data.ts のみ |
| date | string (optional, 和文日付) | ─ | data.ts のみ |
| venue | string (optional) | ─ | data.ts のみ |
| description | string | ─ | data.ts のみ |
| url | string (optional) | ─ | data.ts のみ |

**管理画面フォーム設計（逆算）:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| section | セレクト（単一選択） | ○ | 選択肢: gishohaku / oyakata |
| slug | テキスト（1行） | ○ | 画像ファイル名と揃える |
| image | 画像パス | ○ | public/design/ 配下 |
| title | テキスト（1行） | ○ | |
| subtitle | テキスト（1行） | ─ | |
| date | テキスト（1行、和文日付） | ─ | 例「2027年5月15日（土）」 |
| venue | テキスト（1行） | ─ | |
| description | テキストエリア | ○ | |
| url | URL | ─ | |

---

### manuscript

**data.ts のパス:** `types/manuscript.ts` + `data/manuscript.json`
**Firestore コレクション名:** （未定義／`FIREBASE_CMS_DESIGN.md` に該当コレクションなし）
**エントリ数:** iosdc 8 / contributions 11 / translations 2 / droidkaigi 18 PR / techBlog 15 記事 / snsNotes 9（計 **63 件、6 サブセクション**）

Manuscript は性質の異なる 6 サブセクションを持つため、Firestore 化する場合は **6 コレクション** に分割するか、**単一コレクション + `type` フィールド** での管理が必要。

**6 サブセクションのフィールド比較:**

#### manuscript.iosdc（iOSDC パンフレット原稿）
| フィールド名 | data.ts の型 | 設計の型 | 差分 |
|---|---|---|---|
| id, slug, year, variant?, title, manuscriptUrl, githubUrl | string / optional string | ─ | 全て data.ts のみ |

#### manuscript.contributions（書籍・合同誌寄稿）
| フィールド名 | data.ts の型 | 設計の型 | 差分 |
|---|---|---|---|
| id, slug, publisher, title, bookUrl?, githubUrl? | string / optional string | ─ | 全て data.ts のみ |

#### manuscript.translations（翻訳レビュー参加）
| フィールド名 | data.ts の型 | 設計の型 | 差分 |
|---|---|---|---|
| id, slug, title, bookUrl | string | ─ | 全て data.ts のみ |

#### manuscript.droidkaigi（DroidKaigi 公式アプリ PR）
`DroidKaigiYear` でネスト（`{ year, prs: DroidKaigiPR[] }`）。Firestore 化時は flat にして `year` フィールドで分類する想定。

| フィールド名 | data.ts の型 | 設計の型 | 差分 |
|---|---|---|---|
| id, originalTitle, summary, url | string | ─ | 全て data.ts のみ |
| year | （親の `DroidKaigiYear.year`） | ─ | flat 化で各 PR に `year: string` を持たせる |

#### manuscript.techBlog（テックブログ執筆）
`TechBlogCompany` でネスト（`{ company, articles: TechBlogArticle[] }`）。

| フィールド名 | data.ts の型 | 設計の型 | 差分 |
|---|---|---|---|
| id, title, url | string | ─ | 全て data.ts のみ |
| company | （親の `TechBlogCompany.company`） | ─ | flat 化で各記事に `company: string` を持たせる |

#### manuscript.snsNotes（自筆ノート・SNS 発信）
| フィールド名 | data.ts の型 | 設計の型 | 差分 |
|---|---|---|---|
| id, title, url | string | ─ | 全て data.ts のみ |

**管理画面フォーム設計（代表例として iosdc / contributions）:**

**iosdc:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| slug | テキスト | ○ | |
| year | テキスト（1行） | ○ | 例「2026」 |
| variant | テキスト（1行） | ─ | 例「vol.1」 |
| title | テキスト | ○ | |
| manuscriptUrl | URL | ○ | 掲載原稿 (Dropbox) |
| githubUrl | URL | ○ | 原稿ソース |

**contributions:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| slug | テキスト | ○ | |
| publisher | テキスト | ○ | 書名/合同誌タイトル |
| title | テキスト | ○ | 章タイトル |
| bookUrl | URL | ─ | |
| githubUrl | URL | ─ | |

残り 4 サブセクションも同様の形で雛形作成が可能。

---

### showcase

**data.ts のパス:** `types/showcase.ts` + `data/showcase.json`
**Firestore コレクション名:** 近いのは `works/`（ただし構造が異なる）
**エントリ数:** repos 27 件 + gishohaku 1 ドキュメント

showcase は 2 ブロックで構成される：

- **`showcase.repos`**（27 件）: 個人開発リポジトリの配列。Firestore 設計の `works/` にほぼ対応
- **`showcase.gishohaku`**（1 ドキュメント）: 技書博公式サイト運用保守の単一ドキュメント（`siteUrl` / `highlights` / `stack` / `osc`）

#### showcase.repos vs works/

| フィールド名 | data.ts の型 | Firestore 設計の型 | 差分 |
|---|---|---|---|
| id | string | ─ | data.ts のみ |
| slug | string | ─ | data.ts のみ（GitHub repo 名） |
| category | `"oss" \| "swiftui" \| "uikit" \| "rx" \| "flutter" \| "research"` | `"ios" \| "android" \| "web" \| "design"` | 型不一致（分類軸が異なる。実データの 6 分類は技術レイヤーベース、設計の 4 分類はプラットフォームベース） |
| featured | boolean (optional) | ─ | data.ts のみ |
| title | string | string | 一致 |
| description | string | string | 一致 |
| stack | string[] | ─ | data.ts のみ（設計 `technologies: string[]` に対応するが命名違い） |
| technologies | ─ | string[] | 設計のみ（実データでは `stack` 命名） |
| url | string | ─ | data.ts のみ（設計 `githubUrl` に対応） |
| githubUrl | ─ | string | 設計のみ |
| thumbnails | ─ | string[] | 設計のみ（実データでは画像保有なし） |

#### showcase.gishohaku（singleton）

Firestore 化する場合は `pages/showcase_gishohaku` のような単一ドキュメントとして保持する想定。

**管理画面フォーム設計（repos）:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| slug | テキスト | ○ | GitHub repo 名 |
| category | セレクト（単一選択） | ○ | 選択肢: oss / swiftui / uikit / rx / flutter / research |
| featured | 真偽値 | ─ | OSS など前面に出したい場合のみ true |
| title | テキスト | ○ | |
| description | テキストエリア | ○ | |
| stack | タグ配列（複数選択/自由入力） | ○ | 技術スタック 2〜4 個 |
| url | URL | ○ | GitHub URL |

**管理画面フォーム設計（gishohaku singleton）:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| siteUrl | URL | ○ | 技書博公式サイト URL |
| highlights | テキストエリア（1 行 = 1 項目） | ○ | 10 項目 |
| stack | グループ付きタグ配列 | ○ | Frontend / Backend & Infra / Dev & Verification の 3 グループ |
| osc.title | テキスト | ○ | スライド題 |
| osc.event | テキスト | ○ | 登壇イベント名 |
| osc.slideUrl | URL | ○ | Docswell 等掲載元 |

---

### timeline

**data.ts のパス:** `components/timeline/data.ts`（JSON 未切り出し、TypeScript リテラル保持）
**Firestore コレクション名:** `timeline/`
**エントリ数:** 16（2003〜2025）

**フィールド比較:**

| フィールド名 | data.ts の型 | Firestore 設計の型 | 差分 |
|---|---|---|---|
| year | string（例「2003」） | number | 型不一致（Firestore は number） |
| month | ─ | number \| null | 設計のみ（実データでは年単位のみ） |
| subtitle | string | ─ | data.ts のみ（一言テーマ） |
| paragraphs | string[] | ─ | data.ts のみ（本文段落配列） |
| title | ─ | string | 設計のみ（`subtitle` が近いが命名違い） |
| description | ─ | string | 設計のみ（`paragraphs` を結合すれば対応可能） |
| keywords | string[] | ─ | data.ts のみ（Chip 表示用） |
| category | ─ | `"career" \| "book" \| "talk" \| "oss"` | 設計のみ（実データでは未使用） |

**timeline は data.ts と設計のズレが最も大きい。** 命名も分類方針も揃っておらず、JSON 切り出しも未実施。Phase 3 前に **再設計**（命名統一・サブタイトル/本文分離の方針確定）が必要。

**管理画面フォーム設計（逆算）:**

| フィールド | 入力タイプ | 必須 | 備考 |
|---|---|---|---|
| year | 数値 | ○ | 2003 〜 現在 |
| subtitle | テキスト（1行） | ○ | 一言テーマ（設計の `title` に相当） |
| paragraphs | テキストエリア（複数段落、空行区切り） | ○ | |
| keywords | タグ配列（複数選択/自由入力） | ○ | 4〜6 個 |
| category | セレクト（単一選択） | ─ | 設計由来の任意フィールド |

## 全体サマリー

| セクション | data.ts エントリ数 | data.ts のみ | 設計のみ | 型不一致 | 一致 |
|---|---|---|---|---|---|
| talks | 176 | 4（id / url / platform / category） | 4（speakerDeckUrl / summary / tags / year） | 2（event / date） | 1（title） |
| books | 6 | 5（id / releasedAt / priceNotes / coverAlt / commercialNote） | 0 | 4（publishedAt / description / price / githubUrl） | 4（title / coverImage / amazonUrl / boothUrl / sortOrder） |
| design | 10 | 10（section / slug / image / title / subtitle / date / venue / description / url / id） | 0 | 0 | 0（設計未定義） |
| manuscript | 63 | 全フィールド | 0 | 0 | 0（設計未定義） |
| showcase.repos | 27 | 2（id / featured） | 2（thumbnails / technologies（名称差）） | 2（category / url↔githubUrl 命名差） | 2（title / description） |
| showcase.gishohaku | 1 | 全フィールド | 0 | 0 | 0（設計未定義） |
| timeline | 16 | 3（subtitle / paragraphs / keywords） | 3（month / title / description / category） | 1（year） | 0 |

**差分が最も大きいセクション**: design / manuscript / showcase.gishohaku の 3 つは **Firestore 設計案そのものが未定義**。timeline は定義済みだが実装と命名・構造が合わない。

## FIREBASE_CMS_DESIGN.md への更新提案

以下の変更を提案する（別 PR で反映予定）。

### A. 既存コレクションの修正

- **`talks/`**
  - `speakerDeckUrl: string` → `url: string`（複数媒体に対応）
  - `platform: "Speaker Deck" | "Zenn" | "Qiita" | "SlideShare"` を追加
  - `category: "ui" | "cross" | "arch" | "async" | "backend" | "community" | "ai"` を追加
  - `event: string` → `event: string | null`（記事は null）
- **`books/`**
  - `publishedAt: string` → `publishedAt: string[]`（複数イベント併記）
  - `releasedAt: string（YYYY-MM-DD）` を追加
  - `description: string` → `description: string[]`（段落配列）
  - `price: number` → `price: string`（表記そのまま保持）
  - `priceNotes: string[]` を追加
  - `coverAlt: string` を追加
  - `commercialNote: string | null` を追加
  - `githubUrl: string` → `githubUrl: string | null`
- **`works/`** → **`showcase_repos/`** にリネーム
  - `category` の候補を `"oss" | "swiftui" | "uikit" | "rx" | "flutter" | "research"` に変更
  - `technologies: string[]` → `stack: string[]` にリネーム
  - `githubUrl: string` → `url: string` にリネーム
  - `thumbnails: string[]` を削除（実データで未使用）
  - `featured: boolean` を追加
- **`timeline/`**
  - `title: string` → `subtitle: string` にリネーム
  - `description: string` → `paragraphs: string[]` に変更
  - `keywords: string[]` を追加
  - `month` と `category` は実装側で未使用のため「将来拡張用」として注記
  - `year: number` → `year: string` または `year: number`（データ側で統一を要決定）

### B. 新規コレクションの追加

- **`design/`**（10 件）: 本仕様書「design」セクションの設計をそのまま採用
- **`manuscript_iosdc/`** / **`manuscript_contributions/`** / **`manuscript_translations/`** / **`manuscript_droidkaigi/`** / **`manuscript_techblog/`** / **`manuscript_sns/`** の 6 コレクション。または単一 `manuscript/` に `type` フィールドで統合
- **`pages/`**（単一ドキュメント集）: `showcase_gishohaku` を含むページ単位の設定ドキュメント

## 管理画面で特殊な入力が必要なフィールド

| フィールド | 入力タイプ | 特殊要件 |
|---|---|---|
| books.priceNotes / design.description / manuscript.*.* | テキストエリア | 1 段落 = 1 行、空行区切りの複数段落 |
| books.description | テキストエリア | 要素内 "\n" が改行となる段落配列 |
| talks.platform / talks.category / showcase.repos.category / design.section | セレクト | **固定選択肢**。管理画面側で enum 読み込み必須 |
| books.publishedAt / showcase.repos.stack / timeline.keywords | タグ配列 | 自由入力タグ（カンマ区切り or Chip UI） |
| showcase.gishohaku.stack | グループ付きタグ配列 | Frontend / Backend / Dev の 3 グループ内で複数タグ |
| books.coverImage / design.image | 画像パス | **public/<section>/ 配下にアップロード** → 相対パスを保存 |
| books.releasedAt / talks.date | 日付 | `YYYY-MM-DD`（Firestore timestamp に変換） |
| talks.event / books.commercialNote 等 | オプション文字列 | 空の場合は該当セクションを非表示とする UI 条件分岐が必要 |

**画像のアップロード方法（提案）**: Firebase Storage を併用し、管理画面で画像をアップロード → 返却された URL（または Storage path）を Firestore ドキュメントに保存。既存は public/ 配下の静的ファイルなので、移行時には Storage 併用のタイミングも決定が必要。

## 次のアクション

Phase 3 を進めるにあたり、本仕様書を起点として以下の作業を推奨する。

1. **FIREBASE_CMS_DESIGN.md 更新**（別 PR）
   - 本書「FIREBASE_CMS_DESIGN.md への更新提案」を反映し、実装と設計の記述を同期させる
   - design / manuscript / showcase.gishohaku の新規コレクション定義を追記
2. **timeline の JSON 切り出し**
   - `components/timeline/data.ts` を `data/timeline.json` + `types/timeline.ts` へ分離し、他 5 セクションと保守形式を揃える
3. **Firestore schema 定義ファイルの作成**
   - TypeScript 側の `types/*.ts` から導出した converter（`FirestoreDataConverter<T>`）を `firestore/converters/` に用意
4. **Firebase Auth + Firestore Rules の初期設定**
   - 読み取り: パブリック / 書き込み: 本人 UID のみ、の Rules を書く
   - 管理画面を別ホスト（`admin.just1factory.net` 等）で分離する運用方針を確定
5. **管理画面プロトタイプの UI 設計**
   - 本仕様書「管理画面フォーム設計」の各セクション雛形から Figma / 実装を起こす
   - 固定選択肢（platform / category / section）を型定義から自動生成する仕組みを前提とする
6. **移行用スクリプトの用意**
   - `data/*.json` → Firestore へ初期投入する 1 回限りのスクリプト（Admin SDK 使用）
   - 投入前後の `npm run build` 出力 HTML が byte-identical になることをマイグレーションの成功基準とする
7. **ドキュメント ID 戦略の決定**
   - 既存 `id`（`talk-001` 等）を Firestore ドキュメント ID として採用するか、Firestore 側で自動生成するかを決める
   - 既存 ID 採用の場合、JSON-LD / 内部リンクで参照しているアンカーの維持を担保できる

本書に基づいて FIREBASE_CMS_DESIGN.md を更新した後、Phase 3 の実装タスクを ROADMAP.md に反映する。
