// 旧 components/index/SocialLink.vue の移植
// アイコン(Font Awesome 4)・ブランドカラー・リンク先を現行のまま維持
type Social = {
  href: string;
  icon: string; // fa-* のクラス
  color: string; // *_color のクラス
  label: string;
};

const SOCIALS: Social[] = [
  { href: "https://www.slideshare.net/fumiyasakai37", icon: "fa-slideshare", color: "slideshare_color", label: "SlideShare" },
  { href: "https://qiita.com/fumiyasac@github", icon: "fa-folder-open", color: "qiita_color", label: "Qiita" },
  { href: "https://medium.com/@fumiyasakai/", icon: "fa-medium", color: "medium_color", label: "Medium" },
  { href: "https://twitter.com/fumiyasac", icon: "fa-twitter", color: "twitter_color", label: "X(Twitter)" },
  { href: "https://www.facebook.com/fumiya.sakai.37", icon: "fa-facebook", color: "facebook_color", label: "Facebook" },
  { href: "https://www.linkedin.com/in/%E6%96%87%E4%B9%9F-%E9%85%92%E4%BA%95-77363a48/", icon: "fa-linkedin", color: "linkedin_color", label: "LinkedIn" },
  { href: "https://note.mu/fumiyasac", icon: "fa-book", color: "note_color", label: "note" },
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
