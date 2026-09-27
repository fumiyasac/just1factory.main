// Showcaseページの導入。Talks / Manuscriptの .message_blockパターンで統一。
export default function ShowcaseHeadline() {
  return (
    <div className="container">
      <div className="message_block">
        <h2>Development Showcase</h2>
        <p>
          iOS / Android / Flutterエンジニアとしての実務と接続する形で、
          <strong>UI実装や状態管理・技術検証をGitHub上で公開してきたリポジトリ</strong>
          をカテゴリー別にまとめています。
          <br />
          あわせて、運営メンバーとして継続的に関わっている
          <strong>技術書同人誌博覧会（技書博）公式サイトの運用保守</strong>
          についても、このShowcaseページで紹介しています。
        </p>
      </div>
    </div>
  );
}
