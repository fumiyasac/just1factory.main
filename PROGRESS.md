# PROGRESS.md — Nuxt.js 2 → Next.js 静的サイト移行計画

> 対象リポジトリ: `just1factory.main`（Fumiya Sakai 個人サイト）
> 作成日: 2026-08-03
> 方針: **戦略B（現状を壊さず、隣に新規プロジェクトを構築 → 完成後に差し替え）**
> ゴール: **デザインを一切変えずに**、Vue(Nuxt2) 製の静的サイトを、使い慣れた **Next.js(React/TypeScript)** で作り直し、**Firebase Hosting** へ従来通りデプロイする。バックエンドは作らない（現状ゼロのため）。

---

## 0. 意思決定サマリ（なぜこの構成か）

| 論点 | 結論 | 理由 |
|---|---|---|
| バックエンド | **作らない** | 全ページがハードコードの静的コンテンツ。API通信は0件（`axios`/`asyncData`/`fetch` 使用箇所なし）。DB/gRPC/Laravel は現要件に不要。 |
| フロント FW | **Next.js(App Router) + Static Export** | 利用者が使い慣れている。現在の「generate → dist → Hosting」モデルと1対1で対応。 |
| CSS | **Bootstrap 4.6 の CSS のみ** を読み込む | 現行は Bootstrap 4 で組まれている。`card-deck` / `badge-pill` / `badge-info` は **Bootstrap 4 固有**（BS5 で廃止・改名）。デザイン完全維持のため BS4.6 を採用し、Tailwind への書き換えはしない。 |
| アイコン | **Font Awesome 4.7** の CSS | 現行は `fa fa-github` 等の **FA4 記法**。同記法を維持するため 4.7 を採用（FA5/6 では記法が変わる）。 |
| JS 依存 | **jQuery を使わない** | Bootstrap 4 の JS(navbar collapse) は jQuery 依存だが、唯一の動的処理であるナビバー開閉は React state で自前実装するため CSS のみで足りる。 |
| デプロイ | **Firebase Hosting 継続** | 既存の Firebase プロジェクト `just1factory-main` をそのまま利用。実質 ¥0。 |

---

## 1. 現状インベントリ（移行対象の棚卸し）

### 1.1 ページ（2枚）
| ルート | 現行ファイル | 構成コンポーネント |
|---|---|---|
| `/` | `pages/index.vue` | Message → Introduction → SocialLink → Information |
| `/books` | `pages/books.vue` | BookHeadline → BookInformation |

### 1.2 レイアウト
- `layouts/default.vue` … `NavigationBar` + `<nuxt/>` + `FooterBar`（全ページ共通）

### 1.3 コンポーネント（全17ファイル / READMEを除く）
```
global/       NavigationBar, FooterBar
index/        Message, Introduction, SocialLink, Information
  parts_introduction/  Avatar, Profile, Skills
  parts_information/    MobileEngineer, WebEngineer, Designer
books/        BookHeadline, BookInformation
```

### 1.4 動的処理（＝ "use client" が必要な箇所）
- **ナビバーのモバイル開閉（ハンバーガー）1箇所のみ。** それ以外は完全に静的。

### 1.5 静的アセット（`static/` → `public/` へ移設）
```
static/summaries/card_image1.jpg   (Mobile カード画像)
static/summaries/card_image2.jpg   (Web カード画像)
static/summaries/card_image3.jpg   (Design カード画像)
static/books/ui_recipt_book_vol1.jpg
static/books/ui_recipt_book_vol2.jpg
static/books/ui_recipt_book_meals.jpg
static/books/ui_recipt_book_meals2.jpg
static/books/mobile_point_note_examples.jpg
```
- 外部画像: アバターは `https://avatars0.githubusercontent.com/u/949561`（リモート参照のまま維持）。

### 1.6 外部リンク（すべて維持・別タブ）
Books / Private(`techblog-just1factory.vercel.app`) / Speaker Deck / GitHub / SlideShare / Qiita / Medium / X(Twitter) / Facebook / LinkedIn / note / Amazon(各書籍) / BOOTH(各書籍) / 各サンプルコードの GitHub リポジトリ。

### 1.7 現行のメタ情報（`nuxt.config.js`）
- `mode: 'spa'`、title = `package.json` の description、description メタ、viewport。→ Next の `metadata` で再現。

---

## 2. 技術スタック（移行後）

| 項目 | 採用 |
|---|---|
| フレームワーク | Next.js（最新安定版, App Router） |
| 言語 | TypeScript |
| 出力 | 静的エクスポート（`next.config` に `output: 'export'`、`images.unoptimized: true`） |
| CSS | `bootstrap@4.6.x` の `dist/css/bootstrap.min.css` を import（JS は読み込まない） |
| アイコン | `font-awesome@4.7.0` の `css/font-awesome.min.css` を import |
| フォント | `'Palatino'` 等のシステムフォント指定を CSS でそのまま維持（Web フォント追加なし） |
| Lint | ESLint（Next 標準） |
| デプロイ | Firebase Hosting（既存プロジェクト） |

---

## 3. 移行戦略（戦略B：安全な並行構築 → 差し替え）

### 3.1 基本原則
1. **`master` は常にデプロイ可能な状態を維持**（現行 Nuxt サイトを壊さない）。
2. 作業は専用ブランチ **`feature/nextjs-migration`** で行う。
3. 新 Next.js アプリは **サブディレクトリ `web/`** に構築し、旧 Nuxt ファイルと共存させる。
4. ローカルとプレビュー環境で **旧サイトと新サイトの見た目が一致すること** を確認してから、初めて本番切替（カットオーバー）する。

### 3.2 共存レイアウト（作業中）
```
just1factory.main/
├─ web/                 ← 新: Next.js アプリ（ここで開発）
│   ├─ app/
│   ├─ public/
│   └─ next.config.ts
├─ pages/ components/ layouts/ nuxt.config.js …   ← 旧: Nuxt（触らない）
├─ firebase.json        ← カットオーバー時のみ変更
└─ PROGRESS.md
```

### 3.3 カットオーバー（差し替え）方針
- 検証完了後、`firebase.json` の `public` を `dist` → `web/out` に変更し、`web/out` を配信。
- 旧 Nuxt 関連（`pages/ components/ layouts/ middleware/ plugins/ store/ server/ assets/ static/ nuxt.config.js tsconfig.json .nuxt/ .eslintrc.js` 等）は、切替が本番で確認できるまで**削除しない**。安定確認後に別コミットで撤去。

---

## 4. 具体的な移行ステップ（フェーズ別チェックリスト）

### Phase 0 — 準備
- [ ] `feature/nextjs-migration` ブランチを作成
- [ ] 旧サイトのビルド確認（`yarn generate` が通ること＝比較の基準を確保）
- [ ] 旧サイトの見た目を基準スクショとして保存（`/` と `/books`、デスクトップ幅・モバイル幅）

### Phase 1 — Next.js 雛形作成（`web/`）
- [ ] `web/` に Next.js（TypeScript, App Router, ESLint, `src/` なし想定）を作成
- [ ] `next.config` に `output: 'export'` と `images: { unoptimized: true }` を設定
- [ ] `bootstrap@4.6.x` と `font-awesome@4.7.0` を導入
- [ ] `app/layout.tsx` で Bootstrap CSS / Font Awesome CSS / グローバル CSS を import
- [ ] `metadata`（title・description・viewport）を旧 `nuxt.config.js` から移植
- [ ] `next dev` で空ページが起動することを確認

### Phase 2 — アセット移設
- [ ] `static/summaries/*`, `static/books/*` を `web/public/` へコピー（パスは `/summaries/...`, `/books/...` のまま）
- [ ] 参照が404にならないことを確認

### Phase 3 — 共通レイアウト移植
- [ ] `NavigationBar`（**"use client"**：ハンバーガー開閉を `useState` で実装）
- [ ] `FooterBar`（Copyright 表記維持）
- [ ] `app/layout.tsx` で NavigationBar / children / FooterBar を配置（`layouts/default.vue` と同等）
- [ ] 付随 `<style>` は CSS Modules もしくは `globals.css` に移設（クラス名・値は現行を厳密に踏襲）

### Phase 4 — トップページ `/` 移植
- [ ] `Message`
- [ ] `Introduction`（内部に `Avatar` / `Profile` / `Skills`）
- [ ] `SocialLink`（7 リンク＋各ブランドカラー）
- [ ] `Information`（`card-deck` 内に `MobileEngineer` / `WebEngineer` / `Designer` の3カード）
- [ ] `app/page.tsx` で上記を順に配置
- [ ] 旧 `/` とスクショ比較

### Phase 5 — Books ページ `/books` 移植
- [ ] `BookHeadline`
- [ ] `BookInformation`（書籍5件分の row/col・バッジ・価格・外部リンク・画像を厳密移植）
- [ ] `app/books/page.tsx` で配置
- [ ] 旧 `/books` とスクショ比較

### Phase 6 — ビルド & 静的エクスポート検証
- [ ] `next build` が成功し `web/out/` が生成される
- [ ] `web/out/index.html` / `web/out/books/index.html`（もしくは `books.html`）が生成される
- [ ] ローカル静的サーバで `out/` を配信し、全リンク・全画像・レイアウトを目視確認

### Phase 7 — Firebase プレビュー配信（本番前ステージング）
- [ ] `firebase hosting:channel:deploy preview`（一時URL）で新サイトを検証
- [ ] 実機（スマホ）＋デスクトップで最終目視
- [ ] Lighthouse 参考取得（任意）

### Phase 8 — カットオーバー（本番切替）
- [ ] `firebase.json` の `public` を `web/out` に変更
- [ ] rewrites を静的多ページ用に調整（下記 §7）
- [ ] `firebase deploy --only hosting`
- [ ] 本番URLで最終確認
- [ ] 数日安定後、旧 Nuxt 関連ファイルを別コミットで撤去、`README.md` を更新
- [ ] `feature/nextjs-migration` を `master` へマージ

---

## 5. コンポーネント対応表（Vue → React）

| 現行(Vue) | 移行後(React) | 種別 | 備考 |
|---|---|---|---|
| `layouts/default.vue` | `app/layout.tsx` | server | 共通レイアウト。metadata もここ |
| `global/NavigationBar.vue` | `components/global/NavigationBar.tsx` | **client** | ハンバーガー開閉を `useState` 実装 |
| `global/FooterBar.vue` | `components/global/FooterBar.tsx` | server | |
| `pages/index.vue` | `app/page.tsx` | server | |
| `index/Message.vue` | `components/index/Message.tsx` | server | |
| `index/Introduction.vue` | `components/index/Introduction.tsx` | server | |
| `index/parts_introduction/Avatar.vue` | `components/index/Avatar.tsx` | server | 外部画像URL維持 |
| `index/parts_introduction/Profile.vue` | `components/index/Profile.tsx` | server | |
| `index/parts_introduction/Skills.vue` | `components/index/Skills.tsx` | server | badge 9個 |
| `index/SocialLink.vue` | `components/index/SocialLink.tsx` | server | リンク7件＋色 |
| `index/Information.vue` | `components/index/Information.tsx` | server | `card-deck` |
| `index/parts_information/MobileEngineer.vue` | `components/index/MobileEngineer.tsx` | server | card |
| `index/parts_information/WebEngineer.vue` | `components/index/WebEngineer.tsx` | server | card |
| `index/parts_information/Designer.vue` | `components/index/Designer.tsx` | server | card |
| `pages/books.vue` | `app/books/page.tsx` | server | |
| `books/BookHeadline.vue` | `components/books/BookHeadline.tsx` | server | |
| `books/BookInformation.vue` | `components/books/BookInformation.tsx` | server | 書籍5件（重要・分量大） |

> リファクタ余地: `BookInformation` は同型の書籍ブロックの繰り返し。移植を優先し**まず1対1で忠実移植**、動作一致を確認した後に「書籍データ配列＋`.map()`」へ整理する（Phase 8 以降の任意改善）。

---

## 6. BootstrapVue → 素の Bootstrap 4 対応表（変換ルール）

| BootstrapVue | 素の HTML/クラス(BS4) | 注意 |
|---|---|---|
| `<b-container>` | `<div className="container">` | |
| `<b-row>` | `<div className="row">` | |
| `<b-col cols="3">` | `<div className="col-3">` | 9/3 のグリッド維持 |
| `<b-img thumbnail fluid>` | `<img className="img-thumbnail img-fluid">` | `next/image` は使わず素の img（静的・忠実優先） |
| `<b-badge pill variant="info">` | `<span className="badge badge-pill badge-info">` | **BS4固有**（BS5は `rounded-pill bg-info`） |
| `<b-card title img-src img-top>` | `.card` > `img.card-img-top` + `.card-body`>`.card-title` | slot header/footer は `.card-header`/`.card-footer` |
| `<b-card-group deck>` | `<div className="card-deck">` | **BS4固有**（BS5廃止）→ BS4.6 必須 |
| `<b-button href>` | `<a className="btn btn-secondary">` | 既定 variant は secondary |
| `<b-navbar color="dark" type="dark" sticky>` | `nav.navbar.navbar-dark.bg-dark.sticky-top` + 独自 `.navbar_block` | 開閉は自前 state |
| `<b-nav-item href>` | `li.nav-item > a.nav-link` | |
| `slot="header/footer"` | `.card-header` / `.card-footer` | Vue slot → JSX 直書き |

> クラス属性は React では `className`。`<br>` は `<br />`、`&nbsp;`/`&amp;`/`&copy;` はそのまま or `{' '}` 等でエスケープ。

---

## 7. firebase.json（カットオーバー時の変更）

現行:
```json
{ "hosting": { "public": "dist", "rewrites": [ { "source": "**", "destination": "/index.html" } ] } }
```
移行後（案）:
```json
{
  "hosting": {
    "public": "web/out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "rewrites": []
  }
}
```
- 静的エクスポートは `/books` の実体HTMLを生成するため、SPA 用の全域 `**→/index.html` rewrite は**外す**（残すと `/books` 直アクセスがトップに化ける恐れ）。
- `cleanUrls: true` で `/books.html` を `/books` として配信（Next の出力形態に合わせ最終調整）。
- `.firebaserc`（`just1factory-main`）は変更不要。

---

## 8. テスト戦略

対象が「ロジックのない静的ビジュアルサイト」であるため、**ビジュアル一致 + ビルド健全性 + リンク健全性**を三本柱とする。単体テスト(Jest等)は費用対効果が低いため導入しない。

### 8.1 ビジュアル・リグレッション（最重要）
- 旧サイト（`yarn generate` → `dist` を静的配信）と新サイト（`next build` → `out` を静的配信）を**同一URL・同一ビューポート**で開き、スクショ比較。
- 比較ビューポート: **375px（モバイル）/ 768px（BS4 md 境界）/ 1280px（デスクトップ）**。
- 対象ページ: `/` と `/books`。
- 判定: レイアウト・余白（`padding-top:80px` 等）・フォント（Palatino）・ブランドカラー・カード段組み・バッジ形状が一致すること。
- 手段: Playwright のスクショ or ブラウザ自動化で新旧を並べて目視。差分が出た箇所のみ CSS を突き合わせる。

### 8.2 ビルド健全性
- [ ] `next build` がエラー0で完了
- [ ] `out/` に `/` と `/books` の HTML が生成
- [ ] 生成HTML内に `card-deck` / `badge-pill` 等のクラスが**そのまま**出力されている（BS4 CSS が効く前提）

### 8.3 リンク & アセット健全性
- [ ] ナビ4リンク・SNS7リンク・書籍の Amazon/BOOTH/GitHub 各リンクが正しいURL・`target="_blank"` で開く
- [ ] 8枚のローカル画像 + 外部アバター画像がすべて表示（404なし）
- [ ] 内部遷移 `/ ↔ /books` が動作

### 8.4 インタラクション
- [ ] モバイル幅でハンバーガー開閉が機能（唯一の動的処理）
- [ ] `sticky-top` のナビ追従を確認

### 8.5 レスポンシブ
- [ ] col-3 / col-9 グリッドの折返し挙動を新旧で一致確認

### 8.6 ステージング検証
- [ ] Firebase プレビューチャネルの一時URLで実機確認（iOS/Android/PC ブラウザ）
- [ ] （任意）Lighthouse: Performance/Accessibility/SEO を旧比で劣化していないこと

### 8.7 受け入れ基準（Definition of Done）
1. `/` `/books` が3ビューポートで旧サイトと視覚的に一致
2. 全リンク・全画像・ナビ開閉が正常
3. `next build` 成功・`out/` 生成
4. プレビューチャネルで実機確認済み
5. 本番デプロイ後の最終目視 OK

---

## 9. リスクと対策

| リスク | 影響 | 対策 |
|---|---|---|
| Bootstrap 5 を誤って導入 | `card-deck`/`badge-*` が崩れデザイン不一致 | **4.6 系にバージョン固定**。§6 の変換表を遵守 |
| Font Awesome 5/6 を導入 | `fa fa-github` 記法が効かずアイコン消失 | **4.7.0 に固定** |
| `next/image` 最適化で静的export失敗 | ビルドエラー | `images.unoptimized:true` or 素の `<img>` |
| SPA rewrite 残存 | `/books` 直アクセスがトップ表示 | §7 の通り rewrite 撤去 + `cleanUrls` |
| 旧ファイル早期削除 | ロールバック不能 | 本番安定まで旧 Nuxt を残す |
| カード/余白の微差 | デザイン不一致 | `<style>` の値（80px, #444444, 各色）を厳密移植し目視差分 |

---

## 10. ロールバック手順
1. **未カットオーバー時**: `master` は無傷。`feature/nextjs-migration` を破棄すれば良い。
2. **カットオーバー後に問題発覚**: `firebase hosting` の前リリースへロールバック（Firebase コンソール/CLI）。または `firebase.json` を旧 `public:"dist"` に戻して再デプロイ（旧 `dist` を残しておくこと）。

---

## 11. 進捗トラッカー
| Phase | 状態 | メモ |
|---|---|---|
| 0 準備 | ⬜ 未着手 | |
| 1 雛形 | ⬜ 未着手 | |
| 2 アセット | ⬜ 未着手 | |
| 3 レイアウト | ⬜ 未着手 | |
| 4 トップ | ⬜ 未着手 | |
| 5 Books | ⬜ 未着手 | |
| 6 ビルド検証 | ⬜ 未着手 | |
| 7 プレビュー | ⬜ 未着手 | |
| 8 カットオーバー | ⬜ 未着手 | |

（状態記号: ⬜未着手 / 🟨作業中 / ✅完了）

---

## 12. スコープ外（今回はやらない）
- バックエンド構築（Laravel / Firestore / gRPC）※ 動的機能が必要になった時点で別途検討
- デザイン変更・リニューアル
- CMS 化・書籍のDB管理
- Tailwind 等へのスタイル刷新
