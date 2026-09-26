// Talks & Articles ページの導入。
// 既存 Books ページの BookHeadline と同じ .message_block パターンで統一感を出す。
export default function TalksHeadline() {
  return (
    <div className="container">
      <div className="message_block">
        <h2>Talks &amp; Articles</h2>
        <p>
          2014年から今日まで、勉強会・カンファレンスでの登壇と技術記事という形で発信し続けてきた記録です。
          <br />
          iOSアプリのUI実装から始まり、バックエンド、React Native、Android、GraphQL、Flutter、そして生成AIとの共存へと少しずつ歩みを広げてきました。単にコードが動くことよりも、「なぜそう設計・実装するのか」を自分の言葉で説明できることを大切にしてきた 13 年間の軌跡を、
          <strong>年別・全 176 本のアーカイブ</strong>
          としてまとめています。
          <br />
          それぞれの登壇資料・記事には興味の対象がわかるように<strong>7つのカテゴリー</strong>を付けています。
        </p>
      </div>
    </div>
  );
}
