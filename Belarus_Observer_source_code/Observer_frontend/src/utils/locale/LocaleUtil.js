import { addLocaleData } from 'react-intl'

import en from 'react-intl/locale-data/en'
import ru from 'react-intl/locale-data/ru'

export function initLocale() {
  addLocaleData([...ru, ...en])
}
