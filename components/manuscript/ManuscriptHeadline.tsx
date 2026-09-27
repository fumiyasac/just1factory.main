// Manuscript ページの導入。既存 Books / Talks / Design の .message_block パターンで統一。
export default function ManuscriptHeadline() {
  return (
    <div className="container">
      <div className="message_block">
        <h2>Manuscript &amp; Writings</h2>
        <p>
          カンファレンスのパンフレット原稿、合同誌への寄稿、書籍の翻訳レビュー、OSSアプリへのContribution、テックブログでの発信まで、
          <strong>「書く」という手段で技術と向き合ってきた記録</strong>
          をまとめています。
          <br />
          特にiOSDC Japanでは、UI実装や設計の勘どころを毎年パンフレット原稿として発表しており、その積み重ねを最上部で紹介しています。
        </p>
      </div>
    </div>
  );
}
