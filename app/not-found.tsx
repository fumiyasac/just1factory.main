// カスタム404ページ。layout.tsx により NavigationBar / FooterBar が自動適用されるため、
// ここではページ本体のみを実装する。既存サイトと同じ Bootstrap 4.6 のユーティリティクラスのみを使用。
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container text-center mt-5 mb-5">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">ページが見つかりませんでした</h2>
      <p className="mb-5">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link href="/" className="btn btn-primary">
        トップページに戻る
      </Link>
    </div>
  );
}
