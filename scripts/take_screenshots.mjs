/**
 * Скриншоты страниц сайта для презентации Правлению.
 * Запуск: node scripts/take_screenshots.mjs
 * Требует запущенный прод-сервер на :3005 и установленный Google Chrome.
 */
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3005";
const OUT = "docs/presentation-assets";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 780, deviceScaleFactor: 2 });

async function goto(path) {
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 600));
}

async function scrollToHeading(text, offset = 110) {
  await page.evaluate(
    (t, off) => {
      const el = [...document.querySelectorAll("h2, h1")].find((e) =>
        e.textContent.includes(t)
      );
      if (!el) throw new Error("heading not found: " + t);
      const y = el.getBoundingClientRect().top + window.scrollY - off;
      window.scrollTo({ top: y, behavior: "instant" });
    },
    text,
    offset
  );
  await new Promise((r) => setTimeout(r, 700));
}

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("✓", name);
}

// --- Главная ---
await goto("/ru");
await shot("home-hero");

await scrollToHeading("С какой проблемой вы пришли?", 90);
await shot("home-problems");

await scrollToHeading("Диалог с экспертами-практиками", 110);
await shot("home-experts");

await scrollToHeading("Сколько стоит и что входит", 110);
await shot("home-pricing");

await scrollToHeading("Правовой дайджест БСПН", 260);
await shot("home-digest");

await scrollToHeading("Присоединяйтесь к БСПН", 150);
await shot("home-cta");

// --- Кейсы и победы (квартальные результаты переехали сюда) ---
await goto("/ru/about/achievements");
await scrollToHeading("Что мы сделали за последний квартал", 100);
await shot("achievements-quarter");

// --- Виды членства: матрица услуг ---
await goto("/ru/membership/types");
await scrollToHeading("Полный перечень услуг по видам членства", 90);
await shot("membership-matrix");

// --- Эксперты: компетенции + подбор ---
await goto("/ru/experts");
await scrollToHeading("Компетенции союза", 90);
await shot("experts-skills");

// подбор: отрасль «Медицина и фармацевтика» + тема «Лицензирование»
await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find(
    (b) => b.textContent.trim() === "Медицина и фармацевтика"
  );
  btn.click();
});
await new Promise((r) => setTimeout(r, 400));
await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find(
    (b) => b.textContent.trim() === "Лицензирование и техрегулирование"
  );
  btn.click();
});
await new Promise((r) => setTimeout(r, 600));
await scrollToHeading("Подбор эксперта под вашу задачу", 80);
await shot("experts-match");

// --- Хаб «Чем помогаем» и форма заявки ---
await goto("/ru/business");
await shot("business-hub");

await goto("/ru/membership/join");
await shot("join-form");

await browser.close();
console.log("done");
