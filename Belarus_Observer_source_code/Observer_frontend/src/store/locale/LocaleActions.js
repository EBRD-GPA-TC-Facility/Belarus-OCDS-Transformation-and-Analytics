import { CHANGE_LOCALE } from "./LocaleConstants"

export const changeLocale = locale => ({
  type: CHANGE_LOCALE,
  locale,
})
