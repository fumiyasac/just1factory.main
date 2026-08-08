// 旧 components/index/parts_information/MobileEngineer.vue の移植
// BootstrapVue の <b-card> は「img-top → header → body(title+text) → footer」の順で描画される
export default function MobileEngineer() {
  return (
    <div className="card">
      <img className="card-img-top" src="/summaries/card_image1.jpg" alt="iOS App" />
      <div className="card-header">
        <small className="text-muted">iOS / Android / ReactNative</small>
      </div>
      <div className="card-body">
        <h4 className="card-title">Mobile Application</h4>
        <p className="card-text">
          デザインの良いところを全て引き出す、アプリを利用するユーザーとの接点となる部分を大切にすることを心がけています。
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted">Since: 2017</small>
      </div>
    </div>
  );
}
