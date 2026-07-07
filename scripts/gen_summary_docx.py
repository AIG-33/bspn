#!/usr/bin/env python3
"""Генератор Word-документа (.docx) с саммари стратегии БСПН.

Собирает валидный OOXML-файл вручную, без внешних зависимостей (python-docx),
чтобы не трогать системное окружение Python.
"""

import zipfile
from xml.sax.saxutils import escape

OUT = "/Users/gmaxby/Downloads/БСПН_саммари_и_план.docx"

# ---- Цвета / константы оформления ----
NAVY = "1F3A5F"
ACCENT = "B58B2E"
GREY = "595959"

# ---------------------------------------------------------------------------
# Низкоуровневые билдеры абзацев / таблиц (возвращают строки OOXML)
# ---------------------------------------------------------------------------

def run(text, *, bold=False, italic=False, size=None, color=None):
    rpr = []
    if bold:
        rpr.append('<w:b/>')
    if italic:
        rpr.append('<w:i/>')
    if color:
        rpr.append(f'<w:color w:val="{color}"/>')
    if size:
        rpr.append(f'<w:sz w:val="{size*2}"/><w:szCs w:val="{size*2}"/>')
    rpr_xml = f'<w:rPr>{"".join(rpr)}</w:rPr>' if rpr else ''
    return (f'<w:r>{rpr_xml}<w:t xml:space="preserve">{escape(text)}</w:t></w:r>')


def para(runs, *, align=None, space_before=0, space_after=120, bullet=False, numbered=False):
    if isinstance(runs, str):
        runs = [run(runs)]
    ppr = ['<w:spacing '
           f'w:before="{space_before}" w:after="{space_after}" w:line="276" w:lineRule="auto"/>']
    if align:
        ppr.append(f'<w:jc w:val="{align}"/>')
    if bullet:
        ppr.append('<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>')
    if numbered:
        ppr.append('<w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr>')
    return f'<w:p><w:pPr>{"".join(ppr)}</w:pPr>{"".join(runs)}</w:p>'


def heading(text, level=1):
    sizes = {0: 22, 1: 16, 2: 13}
    colors = {0: NAVY, 1: NAVY, 2: ACCENT}
    return para([run(text, bold=True, size=sizes[level], color=colors[level])],
                space_before=240 if level < 2 else 160, space_after=120)


def hr():
    return ('<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" '
            f'w:space="1" w:color="{ACCENT}"/></w:pBdr></w:pPr></w:p>')


def cell(text, *, header=False, width=None, bold=False):
    shade = f'<w:shd w:val="clear" w:fill="{NAVY}"/>' if header else ''
    wpr = f'<w:tcW w:w="{width}" w:type="dxa"/>' if width else ''
    color = "FFFFFF" if header else None
    r = run(text, bold=header or bold, size=10 if header else 10, color=color)
    return (f'<w:tc><w:tcPr>{wpr}{shade}'
            '<w:tcMar><w:top w:w="40" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/>'
            '<w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tcMar>'
            f'<w:vAlign w:val="center"/></w:tcPr>'
            f'<w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>{r}</w:p></w:tc>')


def table(rows, widths):
    borders = ('<w:tblBorders>'
               + ''.join(f'<w:{s} w:val="single" w:sz="4" w:space="0" w:color="D0D0D0"/>'
                         for s in ("top", "left", "bottom", "right", "insideH", "insideV"))
               + '</w:tblBorders>')
    grid = '<w:tblGrid>' + ''.join(f'<w:gridCol w:w="{w}"/>' for w in widths) + '</w:tblGrid>'
    body = []
    for ri, cells in enumerate(rows):
        is_header = (ri == 0)
        tcs = ''.join(cell(c, header=is_header, width=w) for c, w in zip(cells, widths))
        body.append(f'<w:tr>{tcs}</w:tr>')
    return (f'<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/>{borders}'
            '<w:tblLayout w:type="fixed"/></w:tblPr>'
            f'{grid}{"".join(body)}</w:tbl>')


# ---------------------------------------------------------------------------
# Содержание документа
# ---------------------------------------------------------------------------
body = []
A = body.append

A(heading("БСПН: куда двигаться", 0))
A(para([run("Саммари стратегических материалов и план первоочередных шагов по сайту",
            italic=True, color=GREY, size=12)], space_after=60))
A(para([run("Подготовлено к заседанию союза. Основано на 10 аналитических документах "
            "и прототипе сайта (bspn.vercel.app).", color=GREY, size=10)], space_after=120))
A(hr())

A(heading("1. Главный вывод", 1))
A(para("Десять документов писали разные авторы и под разными углами (PESTEL, SWOT, TOWS, "
       "внедрение ИИ, две финансовые стратегии, маркетинг, защита от ассоциаций-дублёров, "
       "перспективы рынка, «ловушка компетентности»), но все они сходятся в одном:"))
A(para([run("БСПН должен перестать быть «дискуссионным клубом / библиотекой опыта» и стать "
            "«операционной системой для бизнеса» — цифровой сервисной платформой с клубной "
            "надстройкой.", bold=True)]))
A(para("Сайт, который разрабатывается, — это не отдельная задача, а практическое воплощение "
       "этой стратегии. Без него все материалы остаются текстом; с ним — это работающий "
       "продукт. Это и есть способ сдвинуться с мёртвой точки."))

A(heading("2. Сквозные темы документов", 1))
themes = [
    ("Переход к сервисно-платформенной модели", "от идеологии — к инфраструктуре, от "
     "мероприятий — к экосистеме услуг, от разовой помощи — к подписке."),
    ("Цифровизация обязательна", "личный кабинет, CRM, базы данных, онлайн-сервисы; "
     "«ассоциация только с конференциями» теряет ценность."),
    ("Парадокс успеха / ловушка компетентности", "сильные стороны (35 лет, GR-связи, лидер, "
     "аналитика, многопрофильность) при бездействии превращаются в слабости. Лечение — "
     "стратегия «двурукости»: сохранять старое и параллельно запускать новое («БСПН-Цифра»)."),
    ("Угроза №1 — «ассоциации-дублёры» и «зачистка поля от НКО»", "(SWOT: 4 и 5 баллов). "
     "Защита через «стоимость переключения», монополию на качественную аналитику и PR реальных побед."),
    ("Внедрение ИИ на архиве за 35 лет", "«ИИ-Кунявский» (RAG-чат), «ИИ-Навигатор изменений», "
     "Smart-субконтрактация, ИИ-контент. То, что дублёры физически не повторят."),
    ("Деньги: многоуровневое членство + Фонд + Клуб кредиторов", "пакеты Базовый/Расширенный/"
     "Премиум, спонсорство по Указу №112, гранты БФФПП и ЕАЭС, смешанный Фонд (70/20/10)."),
    ("Низкая заметность и слабый PR", "«цифровой фасад» в Telegram, рубрика «Кейс месяца», "
     "упаковка аналитики в чек-листы, карточки и видео-гайды."),
    ("Слабые регионы и поколенческий разрыв", "онлайн-сервисы и события, молодёжное крыло, менторство."),
]
for i, (t, d) in enumerate(themes, 1):
    A(para([run(f"{i}. {t}. ", bold=True), run(d)], bullet=False, space_after=80))

A(heading("3. Что уже заложено в прототипе сайта", 1))
A(para("Модель данных уже поддерживает большинство предложений: членство и заявки, взносы "
       "(invoices), платные консультации, события и регистрации/билеты, эксперты, судебная "
       "практика, трекер лоббирования (advocacy_initiatives), документы, уведомления. Есть "
       "личный кабинет, админка, 3 языка. Многие ключевые страницы пока заглушки — значит, "
       "задача не «строить с нуля», а достроить 3–4 флагманских модуля."))

A(heading("4. Что сделать на сайте в первую очередь", 1))
rows = [
    ["#", "Сделать", "Раздел сайта", "Что закрывает"],
    ["1", "Трекер лоббирования «предложили → приняли → результат → эффект» + «Кейс месяца»",
     "/advocacy", "Угрозу «дублёры» и «формальность ОКС». Быстро — модель данных уже есть"],
    ["2", "Членство как продукт: 3 пакета с ценой и выгодой + онлайн-оплата взносов",
     "/membership/types, /cabinet/billing", "«Нет чёткого продукта», «дефицит финансов»"],
    ["3", "Онлайн-монетизация: платные консультации, билеты, платные шаблоны",
     "/experts, /events, /data-protection", "«Дефицит финансов», «малая дирекция»"],
    ["4", "Цифровой фасад: автопостинг новостей и итогов ОКС в Telegram / e-mail",
     "/news", "«Низкий PR в СМИ»"],
    ["5", "Закрытая база знаний + MVP ИИ-ассистента (старт с Telegram-бота по архиву)",
     "/cabinet", "Защита от дублёров, технологическое отставание"],
    ["6", "Клуб кредиторов + упаковка заявок на гранты ЕАЭС/БФФПП",
     "/investments", "Финансирование членов (быстрая ценность)"],
]
A(table(rows, [500, 3100, 2360, 3400]))
A(para("", space_after=60))

A(heading("5. Дорожная карта", 1))
roadmap = [
    ("К встрече", "показать живой сайт + страницу /advocacy с реальными кейсами. Один "
     "работающий экран убеждает сильнее десяти Word-файлов."),
    ("Фаза 1 (1–2 мес)", "трекер лоббирования, судебная практика, награды, партнёры, "
     "Telegram-автопостинг."),
    ("Фаза 2 (2–4 мес)", "платные пакеты членства, онлайн-взносы, платные консультации и билеты."),
    ("Фаза 3 (4–6 мес)", "закрытая база знаний + MVP ИИ-ассистента."),
    ("Фаза 4 (6–12 мес)", "Клуб кредиторов, упаковка грантов, затем регистрация Фонда (Указ №302)."),
]
for t, d in roadmap:
    A(para([run(f"{t}: ", bold=True, color=ACCENT), run(d)], bullet=True, space_after=80))

A(heading("6. Что предложить на заседании", 1))
A(para([run("«Идей у нас не дефицит — есть 10 стратегий, и все говорят одно. Дефицит — в "
            "реализации. Я принёс реализацию».", italic=True)]))
A(para("Утвердить прототип и запустить Фазу 1 (трекер лоббирования + Telegram) — дёшево, "
       "быстро и бьёт по главной угрозе (дублёры). Маленькая реальная победа разрывает "
       "нынешнюю мёртвую точку «больших планов без запуска»."))

document_xml = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    '<w:body>'
    + ''.join(body)
    + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
      '<w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" '
      'w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>'
    '</w:body></w:document>'
)

content_types = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
    '<Default Extension="xml" ContentType="application/xml"/>'
    '<Override PartName="/word/document.xml" '
    'ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
    '<Override PartName="/word/numbering.xml" '
    'ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>'
    '</Types>'
)

rels = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    '<Relationship Id="rId1" '
    'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
    'Target="word/document.xml"/></Relationships>'
)

doc_rels = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    '<Relationship Id="rId1" '
    'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" '
    'Target="numbering.xml"/></Relationships>'
)

# Маркированный (numId=1) и нумерованный (numId=2) списки
numbering = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    '<w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/>'
    '<w:numFmt w:val="bullet"/><w:lvlText w:val="\u2022"/><w:lvlJc w:val="left"/>'
    '<w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>'
    '<w:abstractNum w:abstractNumId="1"><w:lvl w:ilvl="0"><w:start w:val="1"/>'
    '<w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/>'
    '<w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>'
    '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>'
    '<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>'
    '</w:numbering>'
)

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("[Content_Types].xml", content_types)
    z.writestr("_rels/.rels", rels)
    z.writestr("word/_rels/document.xml.rels", doc_rels)
    z.writestr("word/document.xml", document_xml)
    z.writestr("word/numbering.xml", numbering)

print("OK ->", OUT)
