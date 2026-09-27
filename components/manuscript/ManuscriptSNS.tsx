// 自筆ノート・SNS 発信セクション。X(Twitter)への投稿として公開している自筆ノートの一部を紹介。
import { SNS_NOTES } from "@/components/manuscript/data";

export default function ManuscriptSNS() {
  return (
    <div className="container">
      <div className="sns_block">
        <h2>自筆ノート・SNSでの発信</h2>
        <p className="sns_lead">
          デザイナー時代からの習慣の延長で、実務や個人開発の中でインプットした知識・TIPSを
          <strong>自分のノート</strong>
          にまとめてX(Twitter)へ公開したものの一例です。
          すぐに参照できるアウトプットとして継続的に投稿しています。
        </p>
        <ul className="sns_list list-unstyled">
          {SNS_NOTES.map((note) => (
            <li key={note.url} className="sns_item">
              <a
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sns_link"
              >
                <i className="fa fa-twitter" aria-hidden="true" />
                <span className="sns_title">{note.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
