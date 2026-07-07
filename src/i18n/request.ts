import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

type Messages = Record<string, unknown>;

/** Deep-merges locale messages over the default (ru) messages so that
 * keys missing in en/zh gracefully fall back to Russian instead of erroring. */
function mergeMessages(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key];
    if (
      value &&
      baseValue &&
      typeof value === "object" &&
      typeof baseValue === "object" &&
      !Array.isArray(value) &&
      !Array.isArray(baseValue)
    ) {
      result[key] = mergeMessages(baseValue as Messages, value as Messages);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const defaultMessages = (await import(`@/messages/ru.json`)).default as Messages;
  const messages =
    locale === routing.defaultLocale
      ? defaultMessages
      : mergeMessages(
          defaultMessages,
          (await import(`@/messages/${locale}.json`)).default as Messages
        );

  return { locale, messages };
});
