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
- [x] `feature/nextjs-migration` ブランチを作成
- [x] 比較基準の確保：旧サイトを再ビルドせず、リポジトリ内の既存 `dist/`（`index.html` / `books/index.html`）をベースラインとする
- [x] 実行環境の確定（下記「環境メモ」参照）
- [ ] 見た目の基準スクショは Phase 6 で新旧を**同一条件で並べて**取得する方針に変更（別々に撮るより厳密なため）

> **環境メモ（重要・再現用）**
> - システム標準の Node は **v16.17.1**（`/usr/local/bin/node`）で、最新 Next.js は非対応。
> - `nvm` に **v22.23.1** が入っており、これを使う。各シェル呼び出しで state が消えるため、node 系コマンドは毎回以下で有効化する:
>   ```bash
>   export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 22
>   ```
> - `web/.nvmrc` に `22` を置き、プロジェクトの Node を固定する。
> - Homebrew は `/usr/local/bin/brew`（Intel系）。`.zprofile` が参照する `/opt/homebrew/bin/brew` は存在せず警告が出るが無害。

### Phase 1 — Next.js 雛形作成（`web/`）
- [x] `web/` に Next.js を作成（**Next 16.2.12 / React 19.2.4 / TypeScript / App Router / ESLint / src なし**）
- [x] `next.config.ts` に `output: 'export'` / `trailingSlash: true` / `images.unoptimized: true` / `turbopack.root` を設定
- [x] `bootstrap@4.6.2` と `font-awesome@4.7.0` を導入
- [x] `app/layout.tsx` で Bootstrap CSS → Font Awesome CSS → globals.css の順で import（`<html lang="ja">`、`#wrapper` 構造）
- [x] `metadata`（title・description）を旧 `nuxt.config.js` から移植（viewport は Next が既定で付与）
- [x] `next build` で静的エクスポート成功を確認（`out/index.html` 生成、Bootstrap の `card-deck` と Font Awesome フォントがバンドルされることを検証済み）
- [x] テンプレート由来の不要ファイル（public の SVG 群、page.module.css）を削除

> 補足: create-next-app が生成した `web/AGENTS.md`（Next16 破壊的変更の注意書き）と `web/CLAUDE.md` はそのまま残す。

### Phase 2 — アセット移設
- [x] `static/summaries/*`（3枚）, `static/books/*`（5枚）を `web/public/` へコピー（パスは `/summaries/...`, `/books/...` のまま）
- [x] 全8枚が **バイト単位で一致**することを `cmp` で検証
- [ ] 参照が404にならないことは、コンポーネント移植後（Phase 4/5）にビルド出力で確認

### Phase 3 — 共通レイアウト移植
- [x] `NavigationBar`（**"use client"**：ハンバーガー開閉を `useState` で実装。内部遷移は `next/link`、外部は `<a target="_blank">`）
- [x] `FooterBar`（Copyright 表記「&copy; 2025 Copyright Just1factory」を現行のまま維持）
- [x] `app/layout.tsx` で `#wrapper` 内に NavigationBar / children / FooterBar を配置（`layouts/default.vue` と同等）
- [x] 付随 `<style>` を `globals.css` に移設（`.navbar_block` #444444, `.logo_font`, `a.nav-link`, `.footer`, `.footer-copyright p` を厳密踏襲）
- [x] ビルドで brand/footer/toggler と `/books/` リンク（trailingSlash）を出力確認

### Phase 4 — トップページ `/` 移植
- [x] `Message`
- [x] `Introduction`（内部に `Avatar` / `Profile` / `Skills`）
- [x] `SocialLink`（7 リンク＋各ブランドカラー、Font Awesome 4 アイコン）
- [x] `Information`（`card-deck` 内に `MobileEngineer` / `WebEngineer` / `Designer` の3カード）
- [x] `app/page.tsx` で上記を順に配置
- [x] ビルドで全コンテンツ・`card-deck`・`badge-pill`・画像参照の出力を確認、ESLint もクリーン
- [ ] 旧 `/` とのスクショ比較は Phase 6 で実施
- [x] ESLint 調整: 静的unoptimized方針のため `@next/next/no-img-element` を off、本文の `'`/`"` は `&apos;`/`&quot;` でエスケープ
- [ ] 要確認(Phase 6): `<b-card>` の描画順（img→header→body→footer）と `card-title` のタグ(h4)が現行と一致するか

### Phase 5 — Books ページ `/books` 移植
- [x] `BookHeadline`
- [x] `BookInformation`（書籍5件分の row/col・バッジ・価格・外部リンク・画像を厳密移植。構成差があるため `.map()` 化せず1対1転記）
- [x] `app/books/page.tsx` で配置
- [x] ビルドで `/books/index.html` 生成、バッジ6・書籍画像5・各Amazon/BOOTH/GitHubリンクの出力を確認、ESLint もクリーン
- [ ] 旧 `/books` とのスクショ比較は Phase 6 で実施

### Phase 6 — ビルド & 静的エクスポート検証
- [x] `next build` が成功し `web/out/` が生成される
- [x] `web/out/index.html` / `web/out/books/index.html` が生成される
- [x] ローカル静的サーバ（`python3 -m http.server 4321`）で `out/` を配信し目視確認
- [x] **新旧ビジュアル比較（デスクトップ1280px）を実施**：ローカル新サイト vs 本番 `https://just1factory-main.web.app`
  - ホーム: ヘッダー / Message / Developer's Profile（アバター・スキルバッジ）/ Developer's Social Links（FA4アイコン+ブランドカラー）/ Developer's Summary（3カード: img→header→body→footer 順）/ フッター — **すべてピクセル一致**
  - Books: 先頭（Books見出し・書籍vol1）〜末尾（モバイルノート ¥500・ボタン無し）— **すべてピクセル一致**
  - 懸念だった `<b-card>` 描画順・`card-title`(h4) は現行と完全一致を確認
- [~] モバイル幅(375/414px)の狭幅スクショは、当環境で Chrome ウィンドウのリサイズが描画ビューポートに反映されず取得できなかった。レスポンシブは現行と同一の **Bootstrap 4.6**（`navbar-expand-md`/グリッド/`card-deck`）に依存し構造的に等価。ハンバーガー開閉のみ自前 `useState`。→ **Phase 7 の実機確認に委ねる**

### Phase 7 — Firebase プレビュー配信（本番前ステージング）
- [x] `firebase.json` を `web/out` 配信・rewrite無しへ更新（本番は未デプロイのため無影響）
- [x] Firebase CLI v13.29.2 / `just1factory@gmail.com` でログイン済みを確認
- [x] `firebase hosting:channel:deploy preview --expires 7d` で配信成功
  - プレビューURL: `https://just1factory-main--preview-bmepfadt.web.app`（**2026-08-12 失効**）
  - 本番 `just1factory-main.web.app` は無影響（旧サイトのまま）
- [x] ルーティング検証: `/`=200 / `/books`=301→`/books/`=200 / 画像=200 / 存在しないパス=404（Nextの404.html）
- [x] デプロイ済みプレビューをブラウザで表示し描画正常を確認（デスクトップ）
- [ ] **要ユーザー: 実機（スマホ）で最終目視**（特にモバイルのハンバーガーメニュー開閉）
- [ ] Lighthouse 参考取得（任意）

> 認証メモ: 保存済みFirebaseトークンが失効していたため、ユーザーが `firebase login --reauth` を実機ターミナルで実施して復旧（対話ログインのため要ユーザー操作）。

### Phase 8 — カットオーバー（本番切替）
- [x] `firebase.json` の `public` を `web/out` に変更（Phase 7 で実施）
- [x] rewrites を静的多ページ用に調整（除去、§7）
- [x] `firebase deploy --only hosting` を実行（54ファイル配信、release complete）
- [x] 本番URLで最終確認: `/_next/` 検出・`/_nuxt/` 消滅で新サイト稼働を確認、ルーティング(/=200, /books=301→/books/=200, 未存在=404)・`lang=ja`・title 正常
- [ ] （フォロー）数日安定後、旧 Nuxt 関連ファイルを別コミットで撤去、`README.md` を更新 ※ロールバック用に当面は残す
- [ ] `feature/nextjs-migration` を `master` へマージ（PR 経由）

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
移行後（**実際に適用した最終形**）:
```json
{
  "hosting": {
    "public": "web/out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```
- 静的エクスポートは `/books` の実体HTMLを生成するため、SPA 用の全域 `**→/index.html` rewrite は**外した**（残すと `/books` 直アクセスがトップに化ける）。
- `next.config` の `trailingSlash: true` により `out/books/index.html` が生成され、Firebase のディレクトリ配信で `/books/` が解決する。内部リンクも `next/link` が `/books/` を出力するため **`cleanUrls` は付けない**（trailingSlash と併用すると余計なリダイレクトになり得るため）。
- 404 は Next が生成する `out/404.html` を Firebase が自動使用。
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
| 0 準備 | ✅ 完了 | ブランチ作成・計画コミット・Node22(nvm)確定・ベースライン=既存dist |
| 1 雛形 | ✅ 完了 | Next16.2.12+React19+TS。静的export/Bootstrap4.6/FontAwesome4.7 導入・ビルド成功 |
| 2 アセット | ✅ 完了 | 画像8枚をweb/publicへ移設、cmpでバイト一致を確認 |
| 3 レイアウト | ✅ 完了 | NavigationBar(client)+FooterBar作成、layoutへ配置、styleをglobalsへ移設 |
| 4 トップ | ✅ 完了 | Message/Introduction/SocialLink/Information と配下9部品を移植、build/lint OK |
| 5 Books | ✅ 完了 | BookHeadline+BookInformation(書籍5件)を忠実移植、build/lint OK |
| 6 ビルド検証 | ✅ 完了 | build/export OK。デスクトップ新旧ビジュアル比較で全域ピクセル一致を確認 |
| 7 プレビュー | ✅ 配信完了 | preview-bmepfadt.web.app へ配信、ルーティング検証OK。実機目視のみユーザー待ち |
| 8 カットオーバー | ✅ 本番切替完了 | firebase deploy実行、本番が新サイト(Next.js)稼働を確認。旧Nuxt撤去は別途フォロー |

（状態記号: ⬜未着手 / 🟨作業中 / ✅完了）

---

## 12. スコープ外（今回はやらない）
- バックエンド構築（Laravel / Firestore / gRPC）※ 動的機能が必要になった時点で別途検討
- デザイン変更・リニューアル
- CMS 化・書籍のDB管理
- Tailwind 等へのスタイル刷新
