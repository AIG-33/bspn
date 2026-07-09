/**
 * Генерация пакета документов для вступления в БСПН:
 * заявление, анкета и договор о делегировании полномочий.
 * Формы соответствуют официальным бланкам союза (2026).
 * Работает в браузере: собирает три .docx и отдаёт их одним zip-архивом.
 */
import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  TextRun,
  Tab,
  TabStopType,
} from "docx";
import JSZip from "jszip";

export type MembershipTypeKey = "solidary" | "active" | "full";
export type BasisKey = "charter" | "poa";
export type OwnershipKey =
  | "private"
  | "state"
  | "stateUnder50"
  | "stateOver50";

export interface MembershipDocData {
  contactName: string;
  position: string;
  email: string;
  phone: string;
  company: string;
  unp: string;
  okpo: string;
  ownership: OwnershipKey | "";
  postalCode: string;
  city: string;
  address: string;
  activity: string;
  employees: string;
  founded: string;
  website: string;
  membershipType: MembershipTypeKey;
  basis: BasisKey;
  iban: string;
  bank: string;
  interests: string[];
}

const MEMBERSHIP_INSTRUMENTAL: Record<MembershipTypeKey, string> = {
  solidary: "солидарным членом",
  active: "действительным членом",
  full: "полномочным членом",
};

const BASIS_GENITIVE: Record<BasisKey, string> = {
  charter: "служебных полномочий",
  poa: "доверенности",
};

const OWNERSHIP_LABELS: Record<OwnershipKey, string> = {
  private: "частная",
  state: "государственная",
  stateUnder50: "с долей государства до 50%",
  stateOver50: "с долей государства более 50%",
};

const BSPN_REQUISITES = [
  "Бизнес союз предпринимателей и нанимателей имени профессора М.С. Кунявского",
  "ул. Фабричная, 22 (4-й этаж), 220033 г. Минск, Республика Беларусь",
  "IBAN: BY19BLBB30150190006230001001",
  "Идентификационный код BLBBBY2X, Дирекция по г. Минску и Минской области ОАО «Белинвестбанк», код 739, ул. Коллекторная, 11, г. Минск",
  "УНП 190006230; ОКПО 00030461",
];

const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

function todayRu(): string {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  return `«${day}» ${MONTHS_GENITIVE[d.getMonth()]} ${d.getFullYear()} года`;
}

function fullAddress(data: MembershipDocData): string {
  return [data.postalCode, data.city, data.address].filter(Boolean).join(", ");
}

// ---------- Помощники разметки ----------

const FONT = "Times New Roman";

function run(text: string, opts?: { bold?: boolean; underline?: boolean; size?: number }) {
  return new TextRun({
    text,
    font: FONT,
    size: opts?.size ?? 28, // 14 pt
    bold: opts?.bold,
    underline: opts?.underline ? {} : undefined,
  });
}

function p(
  children: TextRun[] | string,
  opts?: {
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
    spacingAfter?: number;
    indent?: boolean;
  }
) {
  return new Paragraph({
    children: typeof children === "string" ? [run(children)] : children,
    alignment: opts?.align ?? AlignmentType.JUSTIFIED,
    spacing: { after: opts?.spacingAfter ?? 120 },
    indent: opts?.indent ? { firstLine: 709 } : undefined,
  });
}

function emptyLine() {
  return p("", { spacingAfter: 120 });
}

function checkbox(checked: boolean, label: string): TextRun[] {
  return [run(checked ? "☒ " : "☐ "), run(label)];
}

function doc(children: Paragraph[]): Document {
  return new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: 28 } },
      },
    },
    sections: [{ properties: {}, children }],
  });
}

// ---------- 1. Заявление ----------

export function buildZayavlenie(data: MembershipDocData): Document {
  const filled = (v: string, fallback = "____________________") =>
    v.trim() || fallback;

  return doc([
    p(
      [
        run("В Правление"),
      ],
      { align: AlignmentType.RIGHT, spacingAfter: 0 }
    ),
    p([run("Бизнес союза предпринимателей")], { align: AlignmentType.RIGHT, spacingAfter: 0 }),
    p([run("и нанимателей имени профессора")], { align: AlignmentType.RIGHT, spacingAfter: 0 }),
    p([run("М.С. Кунявского (БСПН им. Кунявского)")], { align: AlignmentType.RIGHT, spacingAfter: 240 }),
    p([run("З А Я В Л Е Н И Е", { bold: true })], {
      align: AlignmentType.CENTER,
      spacingAfter: 240,
    }),
    p(
      [
        run("Я, "),
        run(`${filled(data.contactName)}, ${filled(data.position)}`, { underline: true }),
        run(", представитель организации "),
        run(filled(data.company), { underline: true }),
        run(", действующий/ая на основании "),
        run(BASIS_GENITIVE[data.basis], { underline: true }),
        run(", прошу принять "),
        run(filled(data.company), { underline: true }),
        run(
          " в состав Бизнес союза предпринимателей и нанимателей имени профессора М.С. Кунявского "
        ),
        run(MEMBERSHIP_INSTRUMENTAL[data.membershipType], { bold: true, underline: true }),
        run("."),
      ],
      { indent: true }
    ),
    p(
      "С Уставом и Порядком приема и выхода из состава членов БСПН ознакомлен и их признаю. Обязуюсь выполнять обязанности члена БСПН им. Кунявского в соответствии с указанными документами и уплатить вступительный взнос в размере 250 белорусских рублей.",
      { indent: true }
    ),
    emptyLine(),
    p([
      run(`${todayRu()}      М.П.  ______________  `),
      run(`${filled(data.contactName)}, ${filled(data.position)}`),
    ]),
    emptyLine(),
    p(
      "Рекомендации на вступление в БСПН (члена Правления — члена БСПН, члена БСПН) будут представлены к заседанию Правления.",
      { indent: true }
    ),
    emptyLine(),
    p([run("Приложение:", { bold: true })]),
    p("1. Ксерокопия свидетельства о регистрации юридического лица."),
    p(
      "2. Выписка из решения полномочного органа, если руководитель сам не вправе решать вопрос вступления в БСПН им. Кунявского."
    ),
    emptyLine(),
    p([
      run("Почтовый индекс, адрес, телефон, телефакс: "),
      run(`${fullAddress(data)}, тел. ${data.phone}`, { underline: true }),
    ]),
  ]);
}

// ---------- 2. Анкета ----------

export function buildAnketa(data: MembershipDocData): Document {
  const blank = "___________________________________________";

  const ownershipRuns: TextRun[] = [run("Форма собственности: ")];
  (Object.keys(OWNERSHIP_LABELS) as OwnershipKey[]).forEach((key, i) => {
    if (i > 0) ownershipRuns.push(run(";  "));
    ownershipRuns.push(...checkbox(data.ownership === key, OWNERSHIP_LABELS[key]));
  });

  return doc([
    p([run("Анкета", { bold: true })], { align: AlignmentType.CENTER, spacingAfter: 0 }),
    p(
      [
        run(
          "вступающего в члены Бизнес союза предпринимателей и нанимателей имени профессора М.С. Кунявского (БСПН)",
          { bold: true }
        ),
      ],
      { align: AlignmentType.CENTER, spacingAfter: 240 }
    ),
    p([
      run("1. Наименование вступающей организации (в соответствии со свидетельством о государственной регистрации): "),
      run(data.company || blank, { underline: true }),
    ]),
    p(ownershipRuns),
    emptyLine(),
    p([
      run("2. Почтовый адрес: "),
      run(fullAddress(data) || blank, { underline: true }),
    ]),
    p([run("Телефон приёмной: "), run(data.phone || blank, { underline: true })]),
    p([
      run("Ф.И.О. контактного лица, с которым можно обсудить текущие вопросы: "),
      run(data.contactName || blank, { underline: true }),
    ]),
    p([run("E-mail: "), run(data.email || blank, { underline: true })]),
    p([run("Сайт в Internet: "), run(data.website || blank, { underline: true })]),
    emptyLine(),
    p([
      run("3. Краткая информация об основных видах экономической деятельности организации: "),
      run(data.activity || blank, { underline: true }),
    ]),
    emptyLine(),
    p([run("4. Руководитель", { bold: true })]),
    p([run("Ф.И.О. (полностью): "), run(data.contactName || blank, { underline: true })]),
    p([run("Должность: "), run(data.position || blank, { underline: true })]),
    p([run("Тел.: "), run(data.phone || blank, { underline: true })]),
    emptyLine(),
    p([run("5. Первый заместитель", { bold: true })]),
    p([run(`Ф.И.О. (полностью): ${blank}`)]),
    p([run(`Должность: ${blank}   Тел.: ${blank}`)]),
    emptyLine(),
    p([run("6. Руководители (специалисты), возглавляющие службы:", { bold: true })]),
    p([run(`Экономическую — Ф.И.О., должность, тел.: ${blank}`)]),
    p([run(`Бухгалтерскую — Ф.И.О., должность, тел.: ${blank}`)]),
    p([run(`Правовую — Ф.И.О., должность, тел.: ${blank}`)]),
    emptyLine(),
    p([
      run(
        "7. По каким из следующих направлений вы хотели бы получать помощь и поддержку союза:",
        { bold: true }
      ),
    ]),
    ...data.interests.map((label) => p(checkbox(true, label))),
    emptyLine(),
    p([
      run("8. Существует ли в организации практика заключения коллективных договоров: "),
      run("да / нет (нужное подчеркнуть)"),
    ]),
    p([
      run("9. Среднесписочная численность работников организации: "),
      run(data.employees || blank, { underline: true }),
    ]),
    p([
      run("10. Дата создания организации, юбилейные и памятные даты: "),
      run(data.founded || blank, { underline: true }),
    ]),
    emptyLine(),
    p([run("11. Банковские реквизиты:", { bold: true })]),
    p([run("IBAN: "), run(data.iban || blank, { underline: true })]),
    p([
      run("Наименование банка, код: "),
      run(data.bank || blank, { underline: true }),
    ]),
    p([
      run("УНП: "),
      run(data.unp || blank, { underline: true }),
      run("   ОКПО: "),
      run(data.okpo || blank, { underline: true }),
    ]),
  ]);
}

// ---------- 3. Договор ----------

export function buildDogovor(data: MembershipDocData): Document {
  const blank = "____________________";
  const basisText = data.basis === "charter" ? "Устава" : "доверенности";

  const obligations = [
    "4.1. оперативно рассматривать обращения члена БСПН, оказывать ему консультационную и информационную помощь, разрабатывать рекомендации, предложения по проблемным вопросам;",
    "4.2. осуществлять взаимодействие с государственными органами и другими заинтересованными организациями и способствовать:",
    "4.2.1. созданию равных условий хозяйствования члена БСПН с государственными организациями;",
    "4.2.2. оказанию равной государственной поддержки члену БСПН по сравнению с государственными организациями;",
    "4.2.3. снижению налоговой нагрузки и упрощению налоговой системы;",
    "4.2.4. снижению размеров экономических санкций и административных штрафов за непреднамеренное нарушение налогового и таможенного законодательства;",
    "4.2.5. созданию благоприятных условий инвестиционной деятельности членов БСПН и для привлечения иностранных инвесторов;",
    "4.2.6. созданию более справедливой системы социальной защиты для руководящих работников члена БСПН.",
    "4.3. принимать активное участие в разработке, экспертизе проектов законодательных и других нормативных правовых актов в целях совершенствования правовой среды;",
    "4.4. содействовать участию члена БСПН в конкурсах, аукционах, выставках, ярмарках товаров (работ, услуг) в Республике Беларусь и за рубежом;",
    "4.5. проводить анализ последствий нормативных актов, принятых органами государственного управления, затрагивающих интересы члена БСПН;",
    "4.6. принимать участие в совершенствовании системы подготовки и переподготовки кадров для члена БСПН;",
    "4.7. принимать участие в формировании организационной, информационной, научно-технической системы обеспечения и поддержки члена БСПН;",
    "4.8. содействовать диалогу между членом БСПН и представителями власти посредством проведения заседаний Республиканского Клуба директоров, круглых столов, дискуссий, встреч и т.п.",
  ];

  const rights = [
    "5.1. запрашивать необходимые для работы документы и информацию у члена БСПН;",
    "5.2. проводить анкетные опросы члена БСПН;",
    "5.3. привлекать представителей члена БСПН для работы в рабочих группах, временных творческих коллективах для решения вышеизложенных задач;",
    "5.4. принимать участие в рабочих совещаниях, встречах со специалистами и руководителями члена БСПН.",
  ];

  const memberObligations = [
    "6.1. исполнять Устав, решения съезда и Правления БСПН;",
    "6.2. оказывать необходимое содействие БСПН в реализации обязательств, предусмотренных п. 4 настоящего договора;",
    "6.3. финансировать работу БСПН, в сроки, определённые руководящими органами БСПН, уплачивать установленный ежегодный членский взнос и целевые членские взносы;",
    "6.4. участвовать в работе съездов и заседаний выборных и рабочих органов;",
    "6.5. выполнять иные, принятые на себя обязательства, согласно Уставу и решениям Съезда и Правления.",
  ];

  const memberRights = [
    "7.1. участвовать в управлении БСПН;",
    "7.2. получать информацию о деятельности БСПН в соответствии с Уставом;",
    "7.3. после уплаты членских взносов пользоваться установленным объёмом услуг, оказываемых БСПН, для избранного вида членства;",
    "7.4. выносить на рассмотрение БСПН вопросы и предложения, в решении и реализации которых он заинтересован;",
    "7.5. добровольно (на основе письменного заявления) выйти из БСПН по окончании финансового года в соответствии с установленным порядком.",
  ];

  return doc([
    p([run("Договор", { bold: true })], { align: AlignmentType.CENTER, spacingAfter: 0 }),
    p(
      [
        run(
          "о делегировании полномочий и взаимных обязательствах вступающей в члены БСПН организации и БСПН",
          { bold: true }
        ),
      ],
      { align: AlignmentType.CENTER, spacingAfter: 240 }
    ),
    new Paragraph({
      children: [
        run(todayRu()),
        new TextRun({ children: [new Tab()], font: FONT, size: 28 }),
        run("г. Минск"),
      ],
      tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
      spacing: { after: 240 },
    }),
    p(
      [
        run(
          "Бизнес союз предпринимателей и нанимателей имени профессора М.С. Кунявского (далее — БСПН) в лице директора Тарасевич Жанны Казимировны, действующего на основании Устава, и Организации, вступающей в члены БСПН, (далее — Организация) "
        ),
        run(data.company || blank, { underline: true }),
        run(" в лице "),
        run(`${data.contactName || blank}, ${data.position || blank}`, { underline: true }),
        run(", действующего на основании "),
        run(basisText, { underline: true }),
        run(
          ", далее — Стороны, в целях реализации положений Устава БСПН, договорились о следующем:"
        ),
      ],
      { indent: true }
    ),
    p(
      [
        run("1. Организация "),
        run(data.company || blank, { underline: true }),
        run(
          " уполномочивает БСПН представлять и отстаивать её интересы в органах государственной власти на республиканском и местном уровнях по экономическим и социально-трудовым вопросам, в том числе на ведение консультаций с органами государственного управления и профсоюзами при заключении соответствующих соглашений на республиканском, отраслевом и региональном уровнях."
        ),
      ],
      { indent: true }
    ),
    p(
      "2. БСПН представляет и отстаивает интересы члена БСПН в государственных органах власти, международных, общественных и иных организациях (советах, комиссиях и т.п.) в соответствии с методами работы, определёнными Уставом и иными документами БСПН.",
      { indent: true }
    ),
    p(
      "3. Стороны при реализации взаимных обязательств руководствуются законодательством Республики Беларусь, Уставами, решениями Съездов и Правления БСПН и настоящим договором.",
      { indent: true }
    ),
    p(
      "4. БСПН в соответствии с избранным Организацией видом членства принимает на себя следующие обязательства:",
      { indent: true }
    ),
    ...obligations.map((text) => p(text)),
    p("5. БСПН имеет право:", { indent: true }),
    ...rights.map((text) => p(text)),
    p("6. Член БСПН обязуется:", { indent: true }),
    ...memberObligations.map((text) => p(text)),
    p("7. Член БСПН имеет право:", { indent: true }),
    ...memberRights.map((text) => p(text)),
    p(
      "8. Установить рамки финансового года для БСПН им. Кунявского — с 1 января т.г. по 31 декабря т.г.",
      { indent: true }
    ),
    emptyLine(),
    p([run("РЕКВИЗИТЫ СТОРОН:", { bold: true })], { align: AlignmentType.CENTER, spacingAfter: 240 }),
    p([run("БСПН:", { bold: true })]),
    ...BSPN_REQUISITES.map((text) => p(text)),
    p([run("__________________ Тарасевич Ж.К.")]),
    emptyLine(),
    p([run("Организация:", { bold: true })]),
    p([run(data.company || blank, { underline: true })]),
    p([run(fullAddress(data) || blank, { underline: true })]),
    p([run("IBAN: "), run(data.iban || blank, { underline: true })]),
    p([run("Банк: "), run(data.bank || blank, { underline: true })]),
    p([
      run("УНП: "),
      run(data.unp || blank, { underline: true }),
      run("   ОКПО: "),
      run(data.okpo || blank, { underline: true }),
    ]),
    emptyLine(),
    p([
      run("М.П.  __________________  "),
      run(`${data.contactName || blank}`, { underline: true }),
    ]),
  ]);
}

// ---------- Скачивание пакета ----------

export async function downloadMembershipDocs(data: MembershipDocData) {
  const [zayavlenie, anketa, dogovor] = await Promise.all([
    Packer.toBlob(buildZayavlenie(data)),
    Packer.toBlob(buildAnketa(data)),
    Packer.toBlob(buildDogovor(data)),
  ]);

  const zip = new JSZip();
  zip.file("1_Заявление.docx", zayavlenie);
  zip.file("2_Анкета.docx", anketa);
  zip.file("3_Договор.docx", dogovor);
  const blob = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Документы_для_вступления_в_БСПН.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
