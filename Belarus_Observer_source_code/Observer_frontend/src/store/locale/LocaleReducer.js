import { ENGLISH_TRANSLATION }        from '../../common/messages/en'
import { RUSSIAN_TRANSLATION }        from '../../common/messages/ru'
import { CHANGE_LOCALE, LOCALE_NAME } from "./LocaleConstants"

const initialState = {
  lang: localStorage.getItem(LOCALE_NAME) || RUSSIAN_TRANSLATION.lang,
  messages: loadMessages(localStorage.getItem(LOCALE_NAME)),
}

export const localeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      switch (action.locale) {
        case ENGLISH_TRANSLATION.lang:
          localStorage.setItem(LOCALE_NAME, ENGLISH_TRANSLATION.lang)
          return {
            ...initialState.locale,
            lang: ENGLISH_TRANSLATION.lang,
            messages: ENGLISH_TRANSLATION.messages,
          }
        case RUSSIAN_TRANSLATION.lang:
          localStorage.setItem(LOCALE_NAME, RUSSIAN_TRANSLATION.lang)
          return {
            ...initialState.locale,
            lang: RUSSIAN_TRANSLATION.lang,
            messages: RUSSIAN_TRANSLATION.messages,
          }

        default:
          localStorage.setItem(LOCALE_NAME, RUSSIAN_TRANSLATION.lang)
          return {
            ...initialState.locale,
            lang: RUSSIAN_TRANSLATION.lang,
            messages: RUSSIAN_TRANSLATION.messages,
          }
      }
    case CHANGE_LOCALE + '_ERROR':
      return {
        ...state,
      }
    default: {
      return state
    }
  }
}

function loadMessages(locale) {
  switch (locale) {
    case ENGLISH_TRANSLATION.lang:
      return ENGLISH_TRANSLATION.messages

    case RUSSIAN_TRANSLATION.lang:
      return RUSSIAN_TRANSLATION.messages

    default:
      return RUSSIAN_TRANSLATION.messages
  }
}
