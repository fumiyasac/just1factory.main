// schema.org 準拠の構造化データを <script type="application/ld+json"> として
// 埋め込む共通コンポーネント。
// - props.data は単一オブジェクトまたは配列を受け取る(ページ単位で複数スキーマを
//   並べる場合は配列で渡す)
// - XSS 対策として、埋め込み文字列中の "<" を "<" にエスケープする
//   (dangerouslySetInnerHTML 経由の </script> 混入を防ぐため)
// - next/script は使わない。SSG 出力時に静的な <script> として並べたいだけなので
//   クライアント注入の仕組みは不要。
type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

export default function JsonLd({ data }: { data: JsonLdValue }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
