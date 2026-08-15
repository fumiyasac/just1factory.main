# Firebase CMS 設計メモ

将来の Firestore CMS 化に向けた設計案。
CLAUDE.md から `@docs/FIREBASE_CMS_DESIGN.md` で参照する。

## Firestore コレクション設計

```
talks/
  ├── {id}
  │   ├── title: string
  │   ├── event: string
  │   ├── date: timestamp
  │   ├── speakerDeckUrl: string
  │   ├── summary: string
  │   ├── tags: string[]
  │   └── year: number（クエリ用）

books/
  ├── {id}
  │   ├── title: string
  │   ├── description: string
  │   ├── price: number
  │   ├── publishedAt: string（例: "技術書典5"）
  │   ├── coverImage: string（public/ 内のパス）
  │   ├── githubUrl: string
  │   ├── boothUrl: string
  │   ├── amazonUrl: string | null
  │   └── sortOrder: number

works/
  ├── {id}
  │   ├── title: string
  │   ├── description: string
  │   ├── technologies: string[]
  │   ├── githubUrl: string
  │   ├── thumbnails: string[]
  │   └── category: "ios" | "android" | "web" | "design"

timeline/
  ├── {id}
  │   ├── year: number
  │   ├── month: number | null
  │   ├── title: string
  │   ├── description: string
  │   └── category: "career" | "book" | "talk" | "oss"
```

## 移行方針

1. まず JSON ファイルでデータを管理し、ページを先に作る
2. コンテンツ量が増えたら Firestore に移行（データ構造は同じ）
3. 管理画面は Firebase Auth + Firestore Rules で本人のみ書き込み可能にする
