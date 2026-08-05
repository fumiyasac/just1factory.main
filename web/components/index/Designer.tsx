// 旧 components/index/parts_information/Designer.vue の移植
export default function Designer() {
  return (
    <div className="card">
      <img className="card-img-top" src="/summaries/card_image3.jpg" alt="Design" />
      <div className="card-header">
        <small className="text-muted">Adobe XD / Photoshop / Illustrator</small>
      </div>
      <div className="card-body">
        <h4 className="card-title">UI/UX Design</h4>
        <p className="card-text">
          キャリアの始まりはここからでした。シンプルかつ適度なアニメーションやインタラクションがあるものが個人的に好きです。
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">Since: 2008</small>
      </div>
    </div>
  );
}
