// 書籍一覧の描画コンポーネント。
// 以前は 6 冊分の HTML を JSX として直書きしていたが、データ(data/books.json)と
// ビュー(本ファイル)を分離するために data 駆動へ移行。
// HTML 構造・CSS クラス・表示順は元の実装 (components/books/BookInformation.tsx の
// 1 対 1 転記) を完全に保持する。
import { Fragment } from "react";

import booksData from "@/data/books.json";
import type { Book } from "@/types/books";

const BOOKS: Book[] = [...(booksData as Book[])].sort(
  (a, b) => a.sortOrder - b.sortOrder,
);

// "2018-10-08" → "2018年10月8日" (発行日表示は漢字区切りで統一)
function formatReleasedAt(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${Number(y)}年${Number(m)}月${Number(d)}日`;
}

// 書籍ごとに本文中へ "\n" を含めうる段落を <br /> に変換して描画する。
function renderParagraphLines(line: string) {
  const parts = line.split("\n");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

function BookCard({ book, isFirst }: { book: Book; isFirst: boolean }) {
  // 元 JSX の 1 冊目は "row"、2 冊目以降は "row pt-4" で描画されていたため同じ分岐を維持。
  return (
    <div className={isFirst ? "row" : "row pt-4"}>
      <div className="col-3">
        <div>
          <img
            className="img-thumbnail img-fluid img-responsive"
            src={book.coverImage}
            alt={book.coverAlt}
          />
        </div>
      </div>
      <div className="col-9">
        <div className="container">
          <h4 className="developer_name">{book.title}</h4>
          <p>
            <span className="small">初回頒布イベント</span>: &nbsp;
            {book.publishedAt.map((event, i) => (
              <Fragment key={event}>
                <span className="badge badge-pill badge-info">{event}</span>
                {i < book.publishedAt.length - 1 ? <>&nbsp;</> : null}
              </Fragment>
            ))}
            <br />
            <span className="small">発行日</span>:{" "}
            <span className="small">{formatReleasedAt(book.releasedAt)}</span>
          </p>
        </div>
        <div className="container pt-3">
          <p>
            <span className="small">販売価格（同人誌版）</span>:{" "}
            <strong className="large text-danger">{book.price}</strong>
            <br />
            {book.priceNotes.map((note, i) => (
              <Fragment key={i}>
                <span className="small">{note}</span>
                {i < book.priceNotes.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        </div>
        <div className="container pt-3">
          {book.description.map((para, i) => (
            <p key={i}>{renderParagraphLines(para)}</p>
          ))}
        </div>
        {book.githubUrl ? (
          <div className="container pt-3">
            <p>
              <span className="small">
                書籍内で解説しているサンプルコードにつきましては、Github上で無償で公開しております。サンプルコードで誤りや不明な点がある場合にはGithubのIssueやPullRequestをお送り頂けますと幸いです。
              </span>
            </p>
            <ul className="list-unstyled">
              <li className="mt-4 mb-4">
                <a
                  href={book.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-github github_color link_icon" />
                  書籍掲載サンプルコード
                </a>
              </li>
            </ul>
            {book.commercialNote ? (
              <p>
                <span className="small">{book.commercialNote}</span>
              </p>
            ) : null}
            {book.amazonUrl ? (
              <ul className="list-unstyled">
                <li className="mt-4 mb-4">
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-amazon amazon_color link_icon" />
                    Amazonで商業版を購入する
                  </a>
                </li>
              </ul>
            ) : null}
          </div>
        ) : null}
        <div className="container text-center pt-2">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a
                className="btn btn-secondary mt0"
                href={book.boothUrl}
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
  );
}

export default function BookInformation() {
  return (
    <div className="container">
      <div className="book_information_block">
        <h2>Lineup of iOS UI Recipe Book</h2>

        {BOOKS.map((book, i) => (
          <Fragment key={book.id}>
            <BookCard book={book} isFirst={i === 0} />
            <hr />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
