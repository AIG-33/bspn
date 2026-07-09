#!/usr/bin/env node
/**
 * Бот закрытой группы БСПН (супергруппа с темами / forum).
 *
 * Что делает:
 *  - /setup    — создаёт стартовые темы (Новости, Обсуждения, Контент для медиа),
 *                публикует и закрепляет меню-навигацию в General
 *  - /newtopic — админы создают дополнительные темы: /newtopic 🎯 Название
 *  - /menu     — пересобрать/обновить закреплённое меню
 *  - следит за темами, созданными/переименованными вручную через UI Telegram,
 *    и сам обновляет меню
 *
 * Запуск: npm run bot  (нужен TELEGRAM_BOT_TOKEN в .env.local)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_FILE = path.join(__dirname, ".telegram-bot-state.json");

// ---------- env ----------

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvLocal();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// Необязательно: ограничить бота одной группой, например -1001234567890
const ONLY_CHAT_ID = process.env.TELEGRAM_GROUP_ID
  ? Number(process.env.TELEGRAM_GROUP_ID)
  : null;

if (!TOKEN) {
  console.error(
    "Не задан TELEGRAM_BOT_TOKEN.\n" +
      "1. Создайте бота у @BotFather (/newbot) и скопируйте токен\n" +
      "2. Добавьте в .env.local строку: TELEGRAM_BOT_TOKEN=123456:ABC-...",
  );
  process.exit(1);
}

const API = `https://api.telegram.org/bot${TOKEN}`;

// ---------- Bot API helpers ----------

async function tg(method, params = {}) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!data.ok) {
    const err = new Error(`${method}: ${data.description}`);
    err.code = data.error_code;
    throw err;
  }
  return data.result;
}

// ---------- состояние (id меню и список тем на группу) ----------

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8"));
  } catch {
    return { chats: {} };
  }
}

function saveState() {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

const state = loadState();

function chatState(chatId) {
  if (!state.chats[chatId]) state.chats[chatId] = { menuMessageId: null, topics: [] };
  return state.chats[chatId];
}

function userLabel(user) {
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  return user.username ? `${name} (@${user.username})` : name;
}

// ---------- стартовые темы ----------

// Допустимые icon_color тем в Telegram
const COLORS = {
  blue: 7322096,
  yellow: 16766590,
  violet: 13338331,
  green: 9367192,
  rose: 16749490,
  red: 16478047,
};

const DEFAULT_TOPICS = [
  { emoji: "📰", name: "Новости", color: COLORS.blue },
  { emoji: "💬", name: "Обсуждения", color: COLORS.green },
  { emoji: "🎬", name: "Контент для медиа", color: COLORS.violet },
];

// ---------- меню ----------

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function topicUrl(chatId, threadId) {
  // Ссылка на тему в приватной супергруппе: t.me/c/<id без -100>/<thread id>
  const internalId = String(chatId).replace(/^-100/, "");
  return `https://t.me/c/${internalId}/${threadId}`;
}

function buildMenu(chatId) {
  const cs = chatState(chatId);
  const text = [
    "🏛 <b>Закрытая группа БСПН</b>",
    "<i>Бизнес-союз им. проф. М.С. Кунявского — с 1990 года</i>",
    "",
    "Добро пожаловать в сообщество членов союза!",
    "Здесь мы делимся новостями, обсуждаем важные вопросы и готовим материалы для медиа.",
    "",
    "📌 <b>Разделы группы</b> — нажмите, чтобы перейти:",
    ...cs.topics.map((t) => `  ${t.emoji} ${escapeHtml(t.name)}`),
    "",
    "ℹ️ Пишите в подходящую тему — так информация не теряется.",
    "Админы могут добавлять темы: <code>/newtopic 🎯 Название</code>",
    "",
    "📮 <b>Контакты союза</b>",
    "✉️ info@bspn.by · ☎️ +375 17 210-18-42",
    "📍 Минск, ул. Фабричная 22",
  ].join("\n");

  // По 2 кнопки в ряд
  const buttons = cs.topics.map((t) => ({
    text: `${t.emoji} ${t.name}`,
    url: topicUrl(chatId, t.id),
  }));
  const keyboard = [];
  for (let i = 0; i < buttons.length; i += 2) keyboard.push(buttons.slice(i, i + 2));
  keyboard.push([
    { text: "🌐 Сайт bspn.by", url: "https://bspn.by" },
    { text: "📢 Telegram-канал", url: "https://t.me/bspn_by" },
  ]);

  return { text, reply_markup: { inline_keyboard: keyboard } };
}

async function publishMenu(chatId) {
  const cs = chatState(chatId);
  const { text, reply_markup } = buildMenu(chatId);

  if (cs.menuMessageId) {
    try {
      await tg("editMessageText", {
        chat_id: chatId,
        message_id: cs.menuMessageId,
        text,
        parse_mode: "HTML",
        reply_markup,
      });
      return;
    } catch (e) {
      // Сообщение удалили или оно не изменилось — при необходимости публикуем заново
      if (String(e.message).includes("message is not modified")) return;
      cs.menuMessageId = null;
    }
  }

  const msg = await tg("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    reply_markup,
  });
  cs.menuMessageId = msg.message_id;
  saveState();

  try {
    await tg("pinChatMessage", {
      chat_id: chatId,
      message_id: msg.message_id,
      disable_notification: true,
    });
  } catch (e) {
    console.warn("Не удалось закрепить меню (нужно право «Закрепление сообщений»):", e.message);
  }
}

// ---------- права ----------

const adminCache = new Map(); // chatId -> { ids: Set, at: number }

async function isAdmin(chatId, userId) {
  const cached = adminCache.get(chatId);
  if (!cached || Date.now() - cached.at > 5 * 60 * 1000) {
    const admins = await tg("getChatAdministrators", { chat_id: chatId });
    adminCache.set(chatId, { ids: new Set(admins.map((a) => a.user.id)), at: Date.now() });
  }
  return adminCache.get(chatId).ids.has(userId);
}

// ---------- команды ----------

async function reply(msg, text) {
  await tg("sendMessage", {
    chat_id: msg.chat.id,
    text,
    parse_mode: "HTML",
    message_thread_id: msg.is_topic_message ? msg.message_thread_id : undefined,
    reply_parameters: { message_id: msg.message_id, allow_sending_without_reply: true },
  });
}

async function cmdSetup(msg) {
  const chatId = msg.chat.id;
  const cs = chatState(chatId);

  if (!msg.chat.is_forum) {
    await reply(
      msg,
      "⚠️ В этой группе не включены <b>темы</b>.\n" +
        "Откройте настройки группы → «Темы» (Topics) → включите, затем повторите /setup.",
    );
    return;
  }

  const created = [];
  for (const t of DEFAULT_TOPICS) {
    if (cs.topics.some((x) => x.name === t.name)) continue;
    const topic = await tg("createForumTopic", {
      chat_id: chatId,
      name: `${t.emoji} ${t.name}`,
      icon_color: t.color,
    });
    cs.topics.push({ id: topic.message_thread_id, name: t.name, emoji: t.emoji });
    created.push(t.name);
  }
  saveState();

  await publishMenu(chatId);
  await reply(
    msg,
    created.length
      ? `✅ Созданы темы: <b>${created.join(", ")}</b>.\nМеню опубликовано и закреплено.`
      : "Все стартовые темы уже существуют. Меню обновлено.",
  );
}

async function cmdNewTopic(msg, args) {
  const chatId = msg.chat.id;
  const cs = chatState(chatId);

  if (!args.trim()) {
    await reply(msg, "Использование: <code>/newtopic 🎯 Название темы</code> (эмодзи необязателен)");
    return;
  }

  // Первое «слово» — эмодзи, если это не буква/цифра
  let emoji = "📌";
  let name = args.trim();
  const first = [...name][0];
  if (first && !/[\p{L}\p{N}]/u.test(first)) {
    emoji = name.split(/\s+/)[0];
    name = name.slice(emoji.length).trim();
  }
  if (!name) {
    await reply(msg, "Укажите название темы после эмодзи.");
    return;
  }
  if (cs.topics.some((t) => t.name.toLowerCase() === name.toLowerCase())) {
    await reply(msg, `Тема «${escapeHtml(name)}» уже существует.`);
    return;
  }

  const colorValues = Object.values(COLORS);
  const topic = await tg("createForumTopic", {
    chat_id: chatId,
    name: `${emoji} ${name}`,
    icon_color: colorValues[cs.topics.length % colorValues.length],
  });
  cs.topics.push({ id: topic.message_thread_id, name, emoji });
  saveState();

  await publishMenu(chatId);
  await reply(msg, `✅ Тема ${emoji} <b>${escapeHtml(name)}</b> создана, меню обновлено.`);
}

async function cmdInvite(msg) {
  const chatId = msg.chat.id;
  const cs = chatState(chatId);

  if (!cs.inviteLink) {
    try {
      const link = await tg("createChatInviteLink", {
        chat_id: chatId,
        name: "Члены союза — по заявке",
        creates_join_request: true,
      });
      cs.inviteLink = link.invite_link;
      saveState();
      // Отзываем старую основную ссылку, чтобы нельзя было войти без одобрения
      await tg("exportChatInviteLink", { chat_id: chatId });
    } catch (e) {
      await reply(
        msg,
        "⚠️ Не хватает прав. Дайте боту право <b>«Приглашение пользователей»</b> " +
          "(Invite Users via Link) и повторите /invite.\n" +
          `<i>${escapeHtml(e.message)}</i>`,
      );
      return;
    }
  }

  await reply(
    msg,
    [
      "🔗 <b>Ссылка для приглашения членов союза</b>",
      "",
      cs.inviteLink,
      "",
      "Вступление — только после одобрения администратором.",
      "Заявки будут приходить в группу с кнопками «Принять / Отклонить».",
    ].join("\n"),
  );
}

async function handleJoinRequest(req) {
  const chatId = req.chat.id;
  if (ONLY_CHAT_ID && chatId !== ONLY_CHAT_ID) return;

  const u = req.from;
  const bio = req.bio ? `\n📝 ${escapeHtml(req.bio)}` : "";
  await tg("sendMessage", {
    chat_id: chatId,
    parse_mode: "HTML",
    text:
      `🔔 <b>Заявка на вступление</b>\n` +
      `👤 <a href="tg://user?id=${u.id}">${escapeHtml(userLabel(u))}</a>${bio}`,
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Принять", callback_data: `jr:ok:${u.id}` },
          { text: "❌ Отклонить", callback_data: `jr:no:${u.id}` },
        ],
      ],
    },
  });
}

async function handleCallback(cb) {
  const chatId = cb.message?.chat?.id;
  if (!chatId) return;
  const m = cb.data?.match(/^jr:(ok|no):(\d+)$/);
  if (!m) return;

  if (!(await isAdmin(chatId, cb.from.id))) {
    await tg("answerCallbackQuery", {
      callback_query_id: cb.id,
      text: "Только для администраторов",
      show_alert: true,
    });
    return;
  }

  const [, action, userId] = m;
  let verdict;
  try {
    await tg(action === "ok" ? "approveChatJoinRequest" : "declineChatJoinRequest", {
      chat_id: chatId,
      user_id: Number(userId),
    });
    verdict = action === "ok" ? "✅ Принят" : "❌ Отклонён";
  } catch (e) {
    // Заявку уже обработали вручную или она отозвана
    verdict = `⚠️ ${e.message.includes("HIDE_REQUESTER_MISSING") ? "Заявка уже обработана" : e.message}`;
  }

  await tg("answerCallbackQuery", { callback_query_id: cb.id });
  await tg("editMessageText", {
    chat_id: chatId,
    message_id: cb.message.message_id,
    text: `${cb.message.text}\n\n${verdict} (${userLabel(cb.from)})`,
  });
}

async function cmdHelp(msg) {
  await reply(
    msg,
    [
      "🤖 <b>Команды бота</b> (для админов):",
      "",
      "/setup — создать стартовые темы и закрепить меню",
      "/newtopic 🎯 Название — добавить тему",
      "/menu — обновить/переопубликовать меню",
      "/invite — ссылка-приглашение (вступление по одобрению админа)",
      "",
      "Темы, созданные вручную через интерфейс Telegram, тоже попадают в меню автоматически.",
    ].join("\n"),
  );
}

// ---------- обработка обновлений ----------

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  if (ONLY_CHAT_ID && chatId !== ONLY_CHAT_ID) return;
  if (msg.chat.type !== "supergroup" && msg.chat.type !== "group") {
    if (msg.chat.type === "private" && msg.text?.startsWith("/")) {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Добавьте меня в закрытую группу союза как администратора и отправьте там /setup.",
      });
    }
    return;
  }

  const cs = chatState(chatId);

  // Тема создана вручную через UI Telegram
  if (msg.forum_topic_created) {
    const full = msg.forum_topic_created.name;
    const first = [...full][0];
    const hasEmoji = first && !/[\p{L}\p{N}]/u.test(first);
    const emoji = hasEmoji ? full.split(/\s+/)[0] : "📌";
    const name = hasEmoji ? full.slice(emoji.length).trim() : full;
    if (!cs.topics.some((t) => t.id === msg.message_thread_id)) {
      cs.topics.push({ id: msg.message_thread_id, name, emoji });
      saveState();
      await publishMenu(chatId);
      console.log(`Тема из UI добавлена в меню: ${name}`);
    }
    return;
  }

  // Тема переименована через UI
  if (msg.forum_topic_edited?.name) {
    const t = cs.topics.find((x) => x.id === msg.message_thread_id);
    if (t) {
      const full = msg.forum_topic_edited.name;
      const first = [...full][0];
      const hasEmoji = first && !/[\p{L}\p{N}]/u.test(first);
      t.emoji = hasEmoji ? full.split(/\s+/)[0] : t.emoji;
      t.name = hasEmoji ? full.slice(t.emoji.length).trim() : full;
      saveState();
      await publishMenu(chatId);
    }
    return;
  }

  if (!msg.text?.startsWith("/")) return;

  const [cmdRaw, ...rest] = msg.text.split(/\s+/);
  const cmd = cmdRaw.replace(/@\w+$/, "").toLowerCase();
  const args = rest.join(" ");

  if (!["/setup", "/newtopic", "/menu", "/invite", "/help", "/start"].includes(cmd)) return;

  if (cmd === "/help" || cmd === "/start") {
    await cmdHelp(msg);
    return;
  }

  if (!(await isAdmin(chatId, msg.from.id))) {
    await reply(msg, "⛔ Эта команда доступна только администраторам группы.");
    return;
  }

  if (cmd === "/setup") await cmdSetup(msg);
  else if (cmd === "/newtopic") await cmdNewTopic(msg, args);
  else if (cmd === "/menu") await publishMenu(chatId);
  else if (cmd === "/invite") await cmdInvite(msg);
}

// ---------- long polling ----------

async function main() {
  // Однократное обновление меню во всех известных группах: npm run bot -- --refresh-menu
  if (process.argv.includes("--refresh-menu")) {
    for (const chatId of Object.keys(state.chats)) {
      await publishMenu(Number(chatId));
      console.log(`Меню обновлено в ${chatId}`);
    }
    return;
  }

  const me = await tg("getMe");
  console.log(`Бот @${me.username} запущен. Ожидание сообщений...`);
  if (ONLY_CHAT_ID) console.log(`Работает только в группе ${ONLY_CHAT_ID}`);

  await tg("setMyCommands", {
    commands: [
      { command: "setup", description: "Создать стартовые темы и меню" },
      { command: "newtopic", description: "Добавить тему (админы)" },
      { command: "menu", description: "Обновить меню" },
      { command: "invite", description: "Ссылка-приглашение с заявками (админы)" },
      { command: "help", description: "Справка" },
    ],
  });

  let offset = 0;
  for (;;) {
    let updates;
    try {
      updates = await tg("getUpdates", {
        offset,
        timeout: 50,
        allowed_updates: ["message", "chat_join_request", "callback_query"],
      });
    } catch (e) {
      console.error("getUpdates:", e.message);
      await new Promise((r) => setTimeout(r, 3000));
      continue;
    }

    for (const upd of updates) {
      offset = upd.update_id + 1;
      try {
        if (upd.message) await handleMessage(upd.message);
        else if (upd.chat_join_request) await handleJoinRequest(upd.chat_join_request);
        else if (upd.callback_query) await handleCallback(upd.callback_query);
      } catch (e) {
        console.error("Ошибка обработки:", e.message);
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
