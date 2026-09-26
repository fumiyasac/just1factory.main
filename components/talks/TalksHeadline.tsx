// Talks & Articles ページの導入。
// 既存 Books ページの BookHeadline と同じ .message_block パターンで統一感を出す。
export default function TalksHeadline() {
  return (
    <div className="container">
      <div className="message_block">
        <h2>Talks &amp; Articles</h2>
        <p>
          2014 年から今日まで、勉強会・カンファレンスでの登壇と技術記事という形で発信し続けてきた記録です。
          <br />
          「実装の勘どころ」を言葉・図・コードに落とし込みながら、iOS アプリの UI 実装から始まり、Android、React Native、GraphQL、Flutter、そして生成 AI との共存へと少しずつ歩みを広げてきました。
          <br />
          単にコードが動くことよりも、「なぜそう設計・実装するのか」を自分の言葉で説明できることを大切にしてきた、そんな取り組みの軌跡をテーマ別・時系列でまとめています。
        </p>
      </div>
    </div>
  );
}
