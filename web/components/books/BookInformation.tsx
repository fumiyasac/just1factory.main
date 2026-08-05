// 旧 components/books/BookInformation.vue の移植（書籍5件を1対1で忠実転記）
// BootstrapVue → 素のBootstrap4: b-row→row, b-col cols=N→col-N,
// b-img thumbnail fluid→img-thumbnail img-fluid, b-badge pill variant=info→badge badge-pill badge-info,
// b-button→a.btn.btn-secondary
export default function BookInformation() {
  return (
    <div className="container">
      <div className="book_information_block">
        <h2>Lineup of iOS UI Recipe Book</h2>

        {/* UI Recipe book vol.1 */}
        <div className="row">
          <div className="col-3">
            <div>
              <img
                className="img-thumbnail img-fluid img-responsive"
                src="/books/ui_recipt_book_vol1.jpg"
                alt="UI実装であると嬉しいレシピブック"
              />
            </div>
          </div>
          <div className="col-9">
            <div className="container">
              <h4 className="developer_name">
                iOSアプリ開発「UI実装であると嬉しいレシピブック」
              </h4>
              <p>
                <span className="small">初回頒布イベント</span>: &nbsp;
                <span className="badge badge-pill badge-info">技術書典5</span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">販売価格（同人誌版）</span>:{" "}
                <strong className="large text-danger">¥1,000</strong>
                <br />
                <span className="small">※1 現在は電子版のみ販売中です。</span>
                <br />
                <span className="small">
                  ※2 収録サンプルはXcode12.3 &amp; Swift5.3に対応しております。
                </span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                「少しの工夫とアイデアでできる表現集」として、これまでサンプル開発や実務の中で培ったノウハウ等から、UI実装いくつかのまとまったサンプル実装を例にUI構築をする上で重要な実装ポイントやアイデアを紹介していく形式にしてみました。
              </p>
              <p>
                これからiOS アプリを本格的に開発していこうと考えている方や、UI実装や表現に関する部分にさらなる磨きをかけていきたい方にとって本書が少しでもお役に立つことができれば幸いです。
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">
                  書籍内で解説しているサンプルコードにつきましては、Github上で無償で公開しております。サンプルコードで誤りや不明な点がある場合にはGithubのIssueやPullRequestをお送り頂けますと幸いです。
                </span>
              </p>
              <ul className="list-unstyled">
                <li className="mt-4 mb-4">
                  <a
                    href="https://github.com/fumiyasac/ios_ui_recipe_showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-github github_color link_icon" />
                    書籍掲載サンプルコード
                  </a>
                </li>
              </ul>
              <p>
                <span className="small">
                  こちらの書籍につきましては2019年2月にインプレスI &amp; D
                  技術の泉シリーズ（NextPublishing）様より商業化もしております。商業誌についてはKindle版・オンデマンド(ペーパーバック)を選択することができます。
                </span>
              </p>
              <ul className="list-unstyled">
                <li className="mt-4 mb-4">
                  <a
                    href="https://www.amazon.co.jp/dp/B07NQDXY1F/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-amazon amazon_color link_icon" />
                    Amazonで商業版を購入する
                  </a>
                </li>
              </ul>
            </div>
            <div className="container text-center pt-2">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    className="btn btn-secondary mt0"
                    href="https://just1factory.booth.pm/items/1021745"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    書籍の内容を確認する
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />

        {/* UI Recipe book vol.2 */}
        <div className="row pt-4">
          <div className="col-3">
            <div>
              <img
                className="img-thumbnail img-fluid img-responsive"
                src="/books/ui_recipt_book_vol2.jpg"
                alt="UI実装であると嬉しいレシピブック Vol.2"
              />
            </div>
          </div>
          <div className="col-9">
            <div className="container">
              <h4 className="developer_name">
                iOSアプリ開発「UI実装であると嬉しいレシピブック Vol.2」
              </h4>
              <p>
                <span className="small">初回頒布イベント</span>: &nbsp;
                <span className="badge badge-pill badge-info">技術書典7</span>
                &nbsp;
                <span className="badge badge-pill badge-info">
                  第1回技術書同人誌博覧会
                </span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">販売価格（同人誌版）</span>:{" "}
                <strong className="large text-danger">¥1,000</strong>
                <br />
                <span className="small">※1 現在は電子版のみ販売中です。</span>
                <br />
                <span className="small">
                  ※2 収録サンプルはXcode12.3 &amp; Swift5.3に対応しております。
                </span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                iOSアプリ開発「UI実装であると嬉しいレシピブック Vol.2」では前回の技術書典5で頒布致しました書籍の続編となります。
              </p>
              <p>
                前回とは少し趣を変えてUI実装の中でもGithubで公開されているOSSのUIライブラリでの動きや表現を取り入れて組み合わせたサンプル実装を例に、UI構築をする上で重要な実装ポイントやアイデアを紹介していく形式にしてみました。
              </p>
              <p>
                平素のiOSアプリ開発において、UIライブラリを導入する場合における検討段階での参考資料としての活用はもちろん、上手にライブラリを利用する際のUI構築時のヒント等、更にアプリのUIを一つ上のステージへ上げるためのヒントとして本書が少しでもお役に立つことができれば幸いです。
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">
                  書籍内で解説しているサンプルコードにつきましては、Github上で無償で公開しております。サンプルコードで誤りや不明な点がある場合にはGithubのIssueやPullRequestをお送り頂けますと幸いです。
                </span>
              </p>
              <ul className="list-unstyled">
                <li className="mt-4 mb-4">
                  <a
                    href="https://github.com/fumiyasac/2nd_ios_ui_recipe_showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-github github_color link_icon" />
                    書籍掲載サンプルコード
                  </a>
                </li>
              </ul>
              <p>
                <span className="small">
                  こちらの書籍につきましては2020年1月にインプレスI &amp; D
                  技術の泉シリーズ（NextPublishing）様より商業化もしております。商業誌についてはKindle版・オンデマンド(ペーパーバック)を選択することができます。
                </span>
              </p>
              <ul className="list-unstyled">
                <li className="mt-4 mb-4">
                  <a
                    href="https://www.amazon.co.jp/dp/B0843RXCB6/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-amazon amazon_color link_icon" />
                    Amazonで商業版を購入する
                  </a>
                </li>
              </ul>
            </div>
            <div className="container text-center pt-2">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    className="btn btn-secondary mt0"
                    href="https://booth.pm/ja/items/1445531"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    書籍の内容を確認する
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />

        {/* UI Recipe book まかない編 */}
        <div className="row pt-4">
          <div className="col-3">
            <div>
              <img
                className="img-thumbnail img-fluid img-responsive"
                src="/books/ui_recipt_book_meals.jpg"
                alt="UI実装であると嬉しいレシピブック まかない編"
              />
            </div>
          </div>
          <div className="col-9">
            <div className="container">
              <h4 className="developer_name">
                iOSアプリ開発「UI実装であると嬉しいレシピブック まかない編」
              </h4>
              <p>
                <span className="small">初回頒布イベント</span>: &nbsp;
                <span className="badge badge-pill badge-info">
                  技術書典8(応援祭)
                </span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">販売価格（同人誌版）</span>:{" "}
                <strong className="large text-danger">¥1,000</strong>
                <br />
                <span className="small">※1 現在は電子版のみ販売中です。</span>
                <br />
                <span className="small">
                  ※2 収録サンプルはXcode12.3 &amp; Swift5.3に対応しております。
                </span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                これまでの書籍ではUI実装のアイデアや具体的な手法についてフォーカスを当てた書籍を2冊執筆してきましたが、どうしても誌面の分量の関係等もあって見送ってしまったものもありました。
              </p>
              <p>
                本書では、Vol.1及びVol.2では惜しくも紹介ができなかったUI実装に関する実装解説を「まかない編（番外編）」として簡単でありますがまとめたものになります。また、iOS13以降で新しく登場した新機能を利用して実装したサンプルについても少しだけ触れているものもあります。
              </p>
              <p>
                これまでの実務の中で培ってきた知識や知見に加えて、一見するととても複雑に見えそうではあれども、実装時の少しの工夫やライブラリの有効活用をすることで実現することができるUI実装に関するサンプルを3点収録しております。
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">
                  書籍内で解説しているサンプルコードにつきましては、Github上で無償で公開しております。サンプルコードで誤りや不明な点がある場合にはGithubのIssueやPullRequestをお送り頂けますと幸いです。
                </span>
              </p>
              <ul className="list-unstyled">
                <li className="mt-4 mb-4">
                  <a
                    href="https://github.com/fumiyasac/meals_ios_ui_recipe_showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-github github_color link_icon" />
                    書籍掲載サンプルコード
                  </a>
                </li>
              </ul>
            </div>
            <div className="container text-center pt-2">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    className="btn btn-secondary mt0"
                    href="https://booth.pm/ja/items/1835468"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    書籍の内容を確認する
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />

        {/* UI Recipe book おもしろ編 */}
        <div className="row pt-4">
          <div className="col-3">
            <div>
              <img
                className="img-thumbnail img-fluid img-responsive"
                src="/books/ui_recipt_book_meals2.jpg"
                alt="UI実装であると嬉しいレシピブック おもしろ編"
              />
            </div>
          </div>
          <div className="col-9">
            <div className="container">
              <h4 className="developer_name">
                iOSアプリ開発「UI実装であると嬉しいレシピブック おもしろ編」
              </h4>
              <p>
                <span className="small">初回頒布イベント</span>: &nbsp;
                <span className="badge badge-pill badge-info">技術書典9</span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">販売価格（同人誌版）</span>:{" "}
                <strong className="large text-danger">¥1,000</strong>
                <br />
                <span className="small">※1 現在は電子版のみ販売中です。</span>
                <br />
                <span className="small">
                  ※2 収録サンプルはXcode12.3 &amp; Swift5.3に対応しております。
                </span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                これまでの書籍ではUI実装のアイデアや具体的な手法についてフォーカスを当てた書籍を3冊執筆してきましたが、急遽Vol.3の前段として更に番外編として表現や動きが特徴的でかつ、ユーザーにもほんの少しだけ遊び心を与えるような楽しい感覚を抱かせてくれるようなUI実装に関する解説を「おもしろ編（番外編Vol.2）」として簡単でありますがまとめたものになります。
              </p>
              <p>
                Chapter1及びChapter2で紹介しているサンプル実装についてはUIKitをベースに構築したサンプルとなっていますが、Chapter3ではiOS13から登場したSwiftUIを利用して構築したサンプルとなっております。
              </p>
              <p>
                これまでの実務の中で培ってきた知識や知見に加えて、一般的なiOSアプリに対しては利用可能なケースは限られてしまうかもしれませんが、アニメーションやインタラクションにひと工夫を加えることによって、見た目にも美しく触っていて思わず楽しくなりそうな感じのUI実装のエッセンスを盛り込んだサンプルを3点収録しております。
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">
                  書籍内で解説しているサンプルコードにつきましては、Github上で無償で公開しております。サンプルコードで誤りや不明な点がある場合にはGithubのIssueやPullRequestをお送り頂けますと幸いです。
                </span>
              </p>
              <ul className="list-unstyled">
                <li className="mt-4 mb-4">
                  <a
                    href="https://github.com/fumiyasac/meals_2nd_ios_ui_recipe_showcase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-github github_color link_icon" />
                    書籍掲載サンプルコード
                  </a>
                </li>
              </ul>
            </div>
            <div className="container text-center pt-2">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    className="btn btn-secondary mt0"
                    href="https://booth.pm/ja/items/2360379"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    書籍の内容を確認する
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />

        {/* Mobile UI note */}
        <div className="row pt-4">
          <div className="col-3">
            <div>
              <img
                className="img-thumbnail img-fluid img-responsive"
                src="/books/mobile_point_note_examples.jpg"
                alt="モバイルアプリ開発実装考察や重要ポイントを綴ったノート事例集"
              />
            </div>
          </div>
          <div className="col-9">
            <div className="container">
              <h4 className="developer_name">
                モバイルアプリ開発実装考察や重要ポイントを綴ったノート事例集
              </h4>
              <p>
                <span className="small">初回頒布イベント</span>: &nbsp;
                <span className="badge badge-pill badge-info">
                  第11回技術書同人誌博覧会
                </span>
              </p>
            </div>
            <div className="container pt-3">
              <p>
                <span className="small">販売価格（同人誌版）</span>:{" "}
                <strong className="large text-danger">¥500</strong>
                <br />
              </p>
            </div>
            <div className="container pt-3">
              <p>
                本書 『モバイルアプリ開発実装考察や重要ポイントを綴ったノート事例集』
                は、複雑なUIの実装ポイントからアーキテクチャの理解促進まで、モバイルアプリ開発に欠かせない知見をノート形式で丁寧に紹介する一冊です。UIKitからSwiftUIへのシフトが進む中でもUI実装に情熱を注ぎ、iOSとAndroidの両方に取り組んできた著者が、日々の開発を通して得た経験や学びを、自身の“ノート”を通じて公開しています。
              </p>
              <p>
                著者自身が蓄積してきたノートには、書籍やインターネット、勉強会、GitHubなどから得た多様な情報を整理・咀嚼し、自分の開発現場にフィットする形へと昇華させた工夫とプロセスが詰まっています。ただメモを残すだけでなく、必要なときにすぐ参照できる“学習の道標”として活用する方法が、本書を通じて学べることでしょう。
              </p>
              <p>
                UI実装や新しい技術へのキャッチアップを効率よく進めたい方、また情報の整理・活用方法に悩んでいる方にとって、本書のノート事例は大いに役立つはずです。読者の皆さまが自分の開発スタイルや学習法を見直し、より実践に活かせる知見へと深めるきっかけになることを願っています。
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
