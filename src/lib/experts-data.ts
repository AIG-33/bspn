/**
 * Каталог экспертов союза: таксономия «отрасли × компетенции» и карточки.
 *
 * Демо-версия хранит данные в коде — единый источник для страницы каталога,
 * блока «Компетенции союза» и подбора эксперта. При переходе на Supabase
 * структура 1:1 переносится в таблицу `experts` (поля industries[],
 * specializations[]). Тексты карточек живут в i18n под `experts.<id>.*`.
 */

export const INDUSTRIES = [
  "ind_all",
  "ind_med",
  "ind_industry",
  "ind_ads",
  "ind_transport",
  "ind_construction",
  "ind_trade",
  "ind_it",
  "ind_finance",
] as const;

export const COMPETENCIES = [
  "c_gr",
  "c_law",
  "c_tax",
  "c_labor",
  "c_consumer",
  "c_pd",
  "c_customs",
  "c_procurement",
  "c_licensing",
  "c_intl",
  "c_social",
] as const;

export type IndustryId = (typeof INDUSTRIES)[number];
export type CompetencyId = (typeof COMPETENCIES)[number];

export interface ExpertMeta {
  /** i18n namespace key: experts.<id>.* */
  id: string;
  photo?: string;
  /** "ind_all" означает межотраслевого эксперта — совпадает с любой отраслью. */
  industries: IndustryId[];
  competencies: CompetencyId[];
  /** У карточки есть расширенные блоки (роли/темы/хронология) в i18n. */
  hasDetails?: boolean;
}

export const EXPERTS: ExpertMeta[] = [
  {
    id: "e2",
    industries: ["ind_all"],
    competencies: ["c_gr", "c_social", "c_tax", "c_labor", "c_intl"],
  },
  {
    id: "e3",
    industries: ["ind_all"],
    competencies: ["c_law", "c_customs", "c_pd", "c_procurement", "c_gr"],
  },
  {
    id: "g1",
    photo: "/images/experts/gorbatsevich.jpg",
    industries: ["ind_med"],
    competencies: ["c_licensing", "c_procurement", "c_gr", "c_intl"],
    hasDetails: true,
  },
];

export function matchesFilters(
  expert: ExpertMeta,
  industry: IndustryId | null,
  competency: CompetencyId | null
): boolean {
  const industryOk =
    !industry ||
    industry === "ind_all" ||
    expert.industries.includes("ind_all") ||
    expert.industries.includes(industry);
  const competencyOk = !competency || expert.competencies.includes(competency);
  return industryOk && competencyOk;
}
