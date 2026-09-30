// Timelineページの導入。既存のTalks / Manuscript / Showcaseと同じ.message_blockパターン。
export default function TimelineHeadline() {
  return (
    <div className="container">
      <div className="message_block">
        <h2>Career Timeline</h2>
        <p>
          一直線の経歴ではありません。
          <br />
          Web制作、サーバーサイド、iOS、Android、Flutter、技術書、登壇、コミュニティ運営へと領域を広げながら、その時々で必要な技術を身につけ、手を動かしてきました。
          <br />
          <strong>履歴書だけでは伝わりにくい守備範囲の広さと、これまで積み上げてきた証憑の記録</strong>
          です。
        </p>
      </div>
    </div>
  );
}
