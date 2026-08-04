// 旧 components/index/parts_information/WebEngineer.vue の移植
export default function WebEngineer() {
  return (
    <div className="card">
      <img className="card-img-top" src="/summaries/card_image2.jpg" alt="Server" />
      <div className="card-header">
        <small className="text-muted">PHP / Ruby / Go / Kotlin</small>
      </div>
      <div className="card-body">
        <h4 className="card-title">Web Application</h4>
        <p className="card-text">
          20代後半にWebエンジニアになり、その際には主に大規模Webサービスやゲームのバックエンド側の開発を経験しました。
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">Since: 2012</small>
      </div>
    </div>
  );
}
