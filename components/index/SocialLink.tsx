// 旧 components/index/SocialLink.vue の移植
// アイコン(Font Awesome 4)・ブランドカラー・リンク先を現行のまま維持
type Social = {
  href: string;
  icon: string; // fa-* のクラス
  color: string; // *_color のクラス
  label: string;
};

// プレゼンテーション → 記事 → ソーシャル → コード の順で並べる。
// FA4.7 に Zenn / Speaker Deck 専用アイコンが無いため、
// Zenn は執筆イメージの fa-pencil-square-o、Speaker Deck はスライド系の fa-file-powerpoint-o を採用。
const SOCIALS: Social[] = [
  { href: "https://www.slideshare.net/fumiyasakai37", icon: "fa-slideshare", color: "slideshare_color", label: "SlideShare" },
  { href: "https://speakerdeck.com/fumiyasac0921", icon: "fa-file-powerpoint-o", color: "speakerdeck_color", label: "Speaker Deck" },
  { href: "https://qiita.com/fumiyasac@github", icon: "fa-folder-open", color: "qiita_color", label: "Qiita" },
  { href: "https://zenn.dev/fumiyasac", icon: "fa-pencil-square-o", color: "zenn_color", label: "Zenn" },
  { href: "https://twitter.com/fumiyasac", icon: "fa-twitter", color: "twitter_color", label: "X(Twitter)" },
  { href: "https://www.facebook.com/fumiya.sakai.37", icon: "fa-facebook", color: "facebook_color", label: "Facebook" },
  { href: "https://note.mu/fumiyasac", icon: "fa-book", color: "note_color", label: "note" },
  { href: "https://github.com/fumiyasac", icon: "fa-github", color: "github_color", label: "GitHub" },
];

export default function SocialLink() {
  return (
    <div className="container">
      <div className="message_block">
        <h2 className="message_text">Developer&apos;s Social Links</h2>
        <div>
          <div className="container">
            <div className="text-center social_block">
              <ul className="list-unstyled list-inline">
                {SOCIALS.map((s) => (
                  <li key={s.label} className="clickable-space list-inline-item">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-floating btn-lg"
                    >
                      <i className={`fa ${s.icon} ${s.color}`} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
