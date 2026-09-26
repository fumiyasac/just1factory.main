// Design ページの導入。既存 Books/Talks の .message_block パターンで統一。
export default function DesignHeadline() {
  return (
    <div className="container">
      <div className="message_block">
        <h2>Design</h2>
        <p>
          元Webデザイナーとしての経歴を活かし、技術書同人誌博覧会（技書博）の告知チラシやコミュニティのビジュアル、書籍への寄稿など、
          <strong>「技術の広がりや、ものづくりの温度を、限られた一枚で伝える」</strong>
          ことを軸にデザイン制作を続けてきました。
          <br />
          写真・イラスト・タイポグラフィをどう組み合わせれば意図が伝わるか、
          回を重ねるごとに手触りを更新しています。ここではこれまでの主なデザイン成果物を紹介します。
        </p>
      </div>
    </div>
  );
}
