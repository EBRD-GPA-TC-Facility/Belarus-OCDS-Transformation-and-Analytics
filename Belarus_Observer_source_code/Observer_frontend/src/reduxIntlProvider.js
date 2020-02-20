import { connect }       from 'react-redux'
import { IntlProvider }  from 'react-intl'

const mapStateToProps = state => {
  const { lang, messages } = state.locale
  return {
    locale: lang,
    key: lang,
    messages: messages,
  }
}

export default connect(mapStateToProps)(IntlProvider)
