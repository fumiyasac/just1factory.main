# ISR/SSG 切り替え影響範囲分析

## 概要

`next.config.ts` から `output: "export"` を外して ISR / SSR に切り替えた場合の影響範囲を、ビルド出力・各ページ・ホスティング・CI/CD・Claude Code 設定の 5 系統で分析した結果。本書は Phase 3（Firestore + 管理画面での CMS 化）の実装計画と ADR（Architectural Decision Record）の材料として使用する。

前提として [`docs/firestore-migration-spec.md`](./firestore-migration-spec.md)（PR #75）の内容を踏まえ、Firestore 由来の動的データが入ることでレンダリング戦略の選択肢が変わる点も織り込んでいる。

## 現在のビルド構成

### next.config.ts
```ts
const nextConfig: NextConfig = {
  turbopack: { root: import.meta.dirname },
  output: "export",            // ← 本件の中心。静的エクスポートを強制
  trailingSlash: true,         // /books → /books/index.html に出力
  images: { unoptimized: true } // 画像最適化サーバが無いため無効化
};
```

### 実装の特徴

- **サーバーサイド処理ゼロ**: API Route、Server Action、`fetch(...)` の動的呼び出し、`generateStaticParams` の動的ルーティングはすべて未使用
- **データ源**: `data/*.json`（6 セクション、計 292 件）を各ページから `import` して SSG 時に展開
- **sitemap**: `app/sitemap.ts` に `export const dynamic = "force-static"` を明示（静的エクスポート互換）
- **404**: `app/not-found.tsx` でカスタム 404 ページ（静的に `out/404.html` へ出力）
- **画像**: 全ページで素の `<img>` を使用、`next/image` の最適化パイプラインには依存していない
- **フォント**: Google Fonts などの外部フェッチは無く、Bootstrap 4.6 + Font Awesome 4.7 を npm パッケージ経由で CSS バンドルに同梱

### firebase.json
- `public: "out"` を前提とした静的配信
- 詳細な `headers` キャッシュポリシー（JS/CSS 1 年 immutable / 画像 30 日 / HTML 5 分 + SWR 1 日 / robots・sitemap 1 日）
- セキュリティヘッダー（`X-Content-Type-Options` / `X-Frame-Options: DENY` / `Referrer-Policy` / `Permissions-Policy`）

### CI/CD
- 現時点では `.github/workflows/ci.yml` のみ存在（型チェック + ビルド + `out/` 存在検証）
- CLAUDE.md / firebase-deploy Skill に記載されている `deploy-preview.yml` / `deploy-production.yml` は **未実装**（README 等でも「将来追加」の位置付け）
- デプロイは手動 `firebase deploy --only hosting`

## 影響を受けるファイル一覧

| ファイル | 変更内容 | 重要度 |
|---|---|---|
| `next.config.ts` | `output: "export"` 削除 + `images.unoptimized` の扱いを再検討 | **高** |
| `firebase.json` | `public: "out"` 系の静的配信前提を書き換え。ホスティング先により `hosting.rewrites`（SSR への振り分け）や Cloud Functions / Cloud Run 連携設定を追加 | **高** |
| `.github/workflows/ci.yml` | `out/` 存在確認ステップの削除 or `.next/` 検証への差し替え。ビルドコマンドは据え置き可 | **中** |
| `app/sitemap.ts` | 動的データが入る場合に `dynamic = "force-static"` を再評価（Firestore 由来なら ISR 対象へ） | **中** |
| `app/not-found.tsx` | SSR 環境では `notFound()` ハンドラ経由で返されるため URL パスの出力場所が変わる（挙動は同じ） | 低 |
| `app/<section>/page.tsx` 全 7 枚 | ISR 化する場合は `export const revalidate = N` を追加。Firestore 連携時は `fetch` のキャッシュ戦略を記述 | **中** |
| `CLAUDE.md` | 「Do NOT: output: 'export' を外さない」ルールの削除 or 条件付きに書き換え | **高** |
| `.claude/skills/firebase-deploy/SKILL.md` | デプロイガイドのビルド出力ディレクトリ記述・制約欄・デプロイ前チェック手順の全面更新 | **高** |
| `.claude/skills/content-entry/SKILL.md` | ISR 化後は「ページ追加 → 自動反映 or 手動 revalidate」の運用になるため、`sitemap.ts` エントリ追加以外の運用手順を追記 | 中 |
| `.claude/commands/pre-deploy.md` | `out/` 配下の HTML 件数確認ステップを `.next/` 配下 or `next build --dry-run` に置き換え | 中 |
| `components/global/JsonLd.tsx` | SSR / ISR になっても server component のまま維持可（追加作業なし） | 低 |
| `data/*.json` → Firestore 連携 | 本件自体では直接改修しないが、ISR 化の恩恵を享受できるのは Firestore 連動後のため、[`firestore-migration-spec.md`](./firestore-migration-spec.md) と連動して計画 | 高（Phase 3 本体） |

## ページ別の推奨レンダリング戦略

Firestore 化後のデータ更新頻度を加味した推奨。更新頻度が低いページは SSG（build 時展開）で十分、更新頻度が中〜高で管理画面との双方向性があるものは ISR を推奨する。

| ページ | 現在 | 推奨 | revalidate 目安 | 理由 |
|---|---|---|---|---|
| `/` (Home) | 静的 | **ISR** | 3600（1 時間） | RecentActivity が直近エントリに追従するため、Firestore 連携後は定期再生成が必要 |
| `/books` | 静的 | **SSG** | （再ビルド） | 新刊追加が年 1〜2 回のため、master push で再ビルドの運用で十分 |
| `/talks` | 静的 | **ISR** | 3600（1 時間） | 登壇・記事が月数件追加される。カテゴリー × 年のフィルターはクライアント処理なので ISR と相性良 |
| `/design` | 静的 | **SSG** | （再ビルド） | 技書博のチラシ追加は半年に 1 回。手動再ビルドで足りる |
| `/manuscript` | 静的 | **ISR** | 3600（1 時間） | iOSDC パンフレット・寄稿・DroidKaigi PR・テックブログ・SNS と更新チャネルが多いため ISR 推奨 |
| `/showcase` | 静的 | **SSG + 手動 revalidate** | 86400（24 時間） or on-demand | GitHub リポジトリ追加は季節的、技書博 OSC 情報は年数回 |
| `/timeline` | 静的 | **SSG** | （再ビルド） | 年単位の章追加のみ |

### 推奨の背景

- **CDN キャッシュとの相性**: 現在の `firebase.json` で HTML を `max-age=300` + `stale-while-revalidate=86400` に設定済み。ISR の挙動（stale データ返却 → バックグラウンドで再生成）と考え方が揃っており、Firebase Hosting の CDN と相互補完できる
- **ビルド時間の増加**: 現状 `npm run build` は 2〜3 秒で完了（176 件 talks でもローカル JSON 展開のみ）。Firestore 連携後に全ページ SSG すると ms 単位の fetch × エントリ数で build が延びるため、更新頻度の高い `/`・`/talks`・`/manuscript` は ISR の方が運用コストが低い

## ホスティング先の比較

| 観点 | (A) Firebase Hosting + Cloud Functions | (B) Firebase Hosting + Cloud Run | (C) Vercel |
|---|---|---|---|
| Next.js ISR サポート | △（アダプタ経由、公式サポート弱） | ○（Next.js 標準 runtime をコンテナ化、安定稼働） | ◎（純正サポート） |
| 現在の構成からの移行コスト | 中（Functions 側実装 + rewrites 設定） | 中（Dockerfile + Cloud Build CI + rewrites） | **高**（Firebase から全移管、ドメイン・OGP・解析など再設定） |
| `firebase.json` の headers 維持 | ◎（静的アセットは従来通り） | ◎（静的アセットは従来通り） | ×（`vercel.json` に書き直し。キャッシュポリシーも再設定） |
| Cold Start | **あり**（Functions の冷起動） | あり（min-instances で緩和可、課金増） | **なし**（Edge Network） |
| 料金（想定トラフィック） | **Blaze プラン必須**（従量課金化） | Blaze + Cloud Run 従量課金 | Hobby 無料枠（商用利用不可）/ Pro $20/month |
| Firestore との親和性 | ◎（同一 Firebase プロジェクト、Admin SDK 直叩き） | ◎（同じ GCP プロジェクト、Service Account 連携容易） | ○（SDK は使えるが IAM 分離） |
| Preview Channels | ◎（現行 Firebase Hosting Preview Channels を維持） | ○（Cloud Run のリビジョンタグで擬似実現） | ◎（Vercel Preview Deployments） |
| Edge 配信 | △（グローバル CDN は Fastly 相当だが Functions は region 固定） | ○（Cloud Run multi-region を組めば可） | ◎（Edge Functions / Edge Runtime） |
| 技術的統合先 | Firebase エコシステム完結 | Firebase + GCP 併用 | Vercel 完結 |

### サマリー

- **既存の Firebase 投資を維持したい** かつ **ISR の恩恵が必要** なら **(B) Cloud Run** が現実解
- **(A) Cloud Functions** は Next.js アダプタ（例: FirebaseExtensions の `nextjs` extension）の対応状況が追従しづらく、ISR の対応は限定的
- **(C) Vercel** は ISR 最適だが、Firebase Hosting の資産（`firebase.json` headers / Preview Channels / Firebase 認証連携）がリセットされる

## CI/CD への影響

### `.github/workflows/ci.yml`

**現状の問題点**:
```yaml
- name: Verify export output
  run: |
    if [ ! -d "out" ]; then
      echo "::error::Static export directory 'out' was not created"
      exit 1
    fi
```

ISR 化後は `out/` が生成されないため、このステップは失敗する。**以下いずれかに変更**:

- **(1)** `out/` 存在確認を削除し、`npm run build` の exit code のみで成否判定
- **(2)** `.next/` 配下の存在と `.next/BUILD_ID` を検証
- **(3)** Playwright 等で簡易 E2E（起動 → `/talks` にアクセスして 200）を追加して「本当に動くか」を保証

推奨は **(1) + (3)**。CI 時間は 1 分前後増えるが、SSR 回帰を早期に検知できる。

### 未実装の `deploy-preview.yml` / `deploy-production.yml`

CLAUDE.md と README では「存在する前提」で記述されているが、実ファイルは未作成。ISR / SSR へ移行する際に新規作成することになるため、以下のテンプレートを想定：

- **Firebase Hosting + Cloud Run の場合**:
  - `gcloud builds submit` でコンテナビルド → Artifact Registry
  - `gcloud run deploy` で Cloud Run 更新
  - `firebase hosting:channel:deploy preview` or `firebase deploy --only hosting` で静的アセットと rewrites 反映
- **Vercel の場合**:
  - PR → Vercel 自動 Preview（workflow 不要）
  - master マージ → Production 自動反映（workflow 不要）

いずれの選択肢でも、現在手動運用の `firebase deploy --only hosting` を workflow 化するタイミングと ISR 移行は同時進行できる。

## Claude Code 設定への影響

### `CLAUDE.md`
- **Do NOT から削除**: 「`output: 'export'` を外さない（SSR/ISR には移行していない）」の 1 行
- **Architecture Notes の更新**: 「完全な静的サイト。API ルートやサーバーサイド処理はない」→ ISR / SSR 構成を反映した記述に差し替え（例: Firestore 連動の ISR 構成であること、revalidate 間隔の目安）
- **Tech Stack**: ホスティング先が Cloud Run 等に変わる場合に追記

### `.claude/skills/firebase-deploy/SKILL.md`
- **基本構成**: 「ビルド出力: out/」→「ビルド出力: `.next/`（SSR 用）+ Cloud Run / Vercel」等に書き換え
- **キャッシュ戦略**: ISR の `s-maxage` と `stale-while-revalidate` の併用方針を追記
- **制約**: 「`output: 'export'` を外さない」を削除、代わりに「ISR の revalidate 値を根拠なく変更しない」等の新規制約を追加
- **デプロイ前チェック**: 「`out/` に HTML が生成されていること」を「`npm run build` 成功 + 新しい確認コマンド」に差し替え

### `.claude/skills/content-entry/SKILL.md`
- **運用変更の追記**: Firestore 連携後は「`data/*.json` 編集 → コミット → 再ビルド」ではなく「管理画面から Firestore 更新 → ISR revalidate で自動反映」になる旨の運用図を記載
- `sitemap.ts` 更新の説明は維持（新規ページ追加時は引き続き必要）

### `.claude/commands/pre-deploy.md`
- `out/` の HTML 件数確認を `npm run build` の成否 + 任意で `.next/` 配下の確認コマンドに差し替え
- `app/sitemap.ts` と `out/` 配下の HTML 突き合わせは、ISR 化後は意味を持たないため削除 or 「静的ルートのみ」に限定

## firebase.json の headers 設定の扱い

現在の `firebase.json` の headers は以下 4 群：

1. 全パス共通のセキュリティヘッダー（nosniff / DENY / Referrer / Permissions）
2. `**/*.@(js|css|map)` → 1 年キャッシュ + immutable
3. 画像/フォント → 30 日キャッシュ
4. `**/*.html` → 5 分 + CDN 10 分 + SWR 1 日
5. `robots.txt` / `sitemap.xml` → 1 日

### 選択肢別の挙動

- **(A) Firebase Hosting + Cloud Functions**: 静的アセット（1〜3）は現行の `firebase.json` 設定がそのまま有効。HTML（4）は Functions 側の `res.setHeader(...)` で代替
- **(B) Firebase Hosting + Cloud Run**: 同上。Cloud Run 側 Next.js の `next.config.ts` `headers()` or middleware で HTML レスポンスヘッダーを設定
- **(C) Vercel**: `vercel.json` の `headers` セクションに全移行。Vercel の Edge Cache で `s-maxage` / `stale-while-revalidate` を Next.js 側コードで指定

### HTML レスポンスヘッダーの Next.js 側設定例（(A)(B) 共通）

```ts
// next.config.ts
headers: async () => [
  {
    source: "/((?!_next/).*)",
    headers: [
      { key: "Cache-Control", value: "public, max-age=300, s-maxage=600, stale-while-revalidate=86400" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  },
]
```

静的アセットは `firebase.json` 側で引き続き管理し、動的 HTML は Next.js 側で管理する **ハイブリッド構成** が破綻しにくい。

## 推奨アプローチ

### フェーズ分割提案

1. **Phase 3-A: Firestore 連携準備（コード変更なし）**
   - 本仕様書 + `firestore-migration-spec.md` に基づく設計の確定
   - FIREBASE_CMS_DESIGN.md の更新
2. **Phase 3-B: Cloud Run への移行検証（別ブランチ）**
   - **ホスティング先候補は (B) Firebase Hosting + Cloud Run を推奨**
   - 既存の Firebase エコシステム（Hosting / Firestore / Auth / Preview Channels）を維持できるため移行後の運用変化が最小
   - 本番の `just1factory.net` には影響させず、`run.app` の URL で動作確認
3. **Phase 3-C: `output: "export"` 外し + ISR 化**
   - `/talks` / `/manuscript` / `/` の 3 ページを ISR 化（`revalidate: 3600`）
   - `/books` / `/design` / `/timeline` は SSG のまま
   - Firestore 連携は未実施でも、現状の `data/*.json` import でも ISR 化は可能（Phase 3-D を独立させる）
4. **Phase 3-D: Firestore 連携 + 管理画面**
   - `data/*.json` → Firestore 読み出しに置き換え
   - 管理画面を `admin.just1factory.net` 等で分離構築

### リスク軽減策

- **デザイン互換の継続検証**: 既存 PR で何度か用いた「master と feature ブランチの SSR 出力を byte-identical で比較」を Phase 3-C でも実施。ISR 初回描画の HTML が静的エクスポート時代と視覚的に同一であることをマイグレーションの成功基準にする
- **Firebase Preview Channels の継続利用**: Cloud Run を併用する場合でも、`firebase.json` の `rewrites` を Preview Channel ごとに切り替えて検証
- **コスト上昇の見積り**: Blaze プラン課金 + Cloud Run 無料枠（180,000 vCPU 秒 / 月）を基準に、現状のアクセス量（月数 100 PV 程度）で収まるか試算

## 次のアクション

本分析に基づき、Phase 3 で以下を順番に実施することを推奨する。

1. **FIREBASE_CMS_DESIGN.md の更新**（PR #75 の提案を反映、別 PR）
2. **ADR として本書の内容を要約し、ホスティング先を正式決定**
   - 推奨: Firebase Hosting + Cloud Run
3. **CI/CD ワークフローの事前設計**
   - `deploy-preview.yml` / `deploy-production.yml` のテンプレートを作成（まだ output: 'export' のまま運用可能な形で）
4. **ローカル検証の準備**
   - Cloud Run 用 Dockerfile のドラフト作成
   - Firebase Hosting の `rewrites: /** → cloudrun` を dev プロジェクトで検証
5. **ページ単位での ISR 動作確認**
   - 代表 2 ページ（`/talks`、`/`）で `revalidate` 動作を確認し、HTML byte-identical を Phase 3-C のゲートに
6. **CLAUDE.md / Skills / Commands の一斉更新**
   - 移行完了後に 1 PR で `output: 'export'` 関連の記述を全削除
7. **移行後の運用マニュアル追補**
   - 管理画面での更新 → ISR revalidate → CDN 配信までのタイミングを README or 専用ドキュメントに記載

本書は分析と推奨の提示のみを目的とし、最終的なホスティング先・移行時期・各ページの revalidate 値は別途 ADR / ROADMAP の更新で決定する。
