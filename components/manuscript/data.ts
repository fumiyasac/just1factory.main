// Manuscript & Writings ページの 6 セクション分データの集約点。
// 本体は data/manuscript.json に分離済み。本ファイルでは型を re-export しつつ、
// 既存の 6 名前付きエクスポート(IOSDC_MANUSCRIPTS / CONTRIBUTIONS / ...)の API を
// 維持することで、components/manuscript/* 側の import 経路を変更せずに済ませる。
import manuscriptData from "@/data/manuscript.json";
import type {
  Contribution,
  DroidKaigiPR,
  DroidKaigiYear,
  IOSDCEntry,
  ManuscriptData,
  SNSNote,
  TechBlogArticle,
  TechBlogCompany,
  TranslationReview,
} from "@/types/manuscript";

export type {
  Contribution,
  DroidKaigiPR,
  DroidKaigiYear,
  IOSDCEntry,
  SNSNote,
  TechBlogArticle,
  TechBlogCompany,
  TranslationReview,
};

const DATA = manuscriptData as ManuscriptData;

export const IOSDC_MANUSCRIPTS: IOSDCEntry[] = DATA.iosdc;
export const CONTRIBUTIONS: Contribution[] = DATA.contributions;
export const TRANSLATION_REVIEWS: TranslationReview[] = DATA.translations;
export const DROIDKAIGI: DroidKaigiYear[] = DATA.droidkaigi;
export const TECH_BLOG: TechBlogCompany[] = DATA.techBlog;
export const SNS_NOTES: SNSNote[] = DATA.snsNotes;
