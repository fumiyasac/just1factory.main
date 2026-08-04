// 旧 components/index/parts_introduction/Profile.vue の移植
export default function Profile() {
  return (
    <div>
      <div className="container developer_block">
        <h3 className="developer_name">fumiyasac (Fumiya Sakai)</h3>
        <p>1984年9月21日 石川県金沢市生まれ / 東京都在住</p>
      </div>
      <div className="container description_block">
        <p>
          アプリのUI実装が好きな元デザイナーからジョブチェンジをしたエンジニア。
          <br />
          まだまだ学ぶことは沢山ありますが「整理・負担を軽く」＆「感謝され期待に添えること」の2つをコンセプトに技術を磨く毎日です。平素の業務以外でもQiitaやGithub等でもUI実装に関するサンプルや解説記事を投稿したり主にiOS界隈での勉強会でたまに登壇しています。
          <br />
          アイデアを練ったり、設計のためのメモや図解を作る時はもっぱら手書きで描くことが多いです。
          <br />
          2020年からはiOSアプリ開発と並行して、Androidアプリ開発でのお仕事にも取り組んでおります。
        </p>
      </div>
    </div>
  );
}
