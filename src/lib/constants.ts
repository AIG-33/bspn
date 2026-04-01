export const SITE = {
  name: "БСПН",
  fullName:
    "Белорусский союз предпринимателей и нанимателей им. проф. М.С. Кунявского",
  domain: "bspn.by",
  foundedYear: 1990,
  address: "ул. Фабричная 22, Минск",
  phone: "+375 17 210-18-42",
  email: "info@bspn.by",
  socialLinks: {
    telegram: "https://t.me/bspn_by",
    facebook: "https://facebook.com/bspn.by",
    linkedin: "https://linkedin.com/company/bspn",
  },
} as const;

export const STATS = {
  members: 94,
  councils: 20,
  years: 35,
  associations: 7,
} as const;

export const MEMBERSHIP_TYPES = [
  "full",
  "active",
  "solidary",
  "associated",
] as const;

export const FAQ_CATEGORIES = [
  "registration",
  "taxation",
  "labor",
  "contracts",
  "consumer-rights",
  "personal-data",
  "foreign-trade",
  "pricing",
  "digital",
] as const;

export const BLOG_CATEGORIES = [
  "law",
  "taxes",
  "digital",
  "marketing",
  "startups",
  "international",
] as const;

export const NEWS_CATEGORIES = [
  "legislation",
  "events",
  "members",
  "partners",
  "union",
] as const;

export const PROTECTED_ROUTES = [
  "/cabinet",
  "/consumer-protection",
  "/data-protection",
  "/membership/directory",
] as const;
