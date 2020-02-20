import React                from 'react'
import PropTypes            from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { RUSSIAN_TRANSLATION as langRU } from '../../common/messages/ru'
import { ENGLISH_TRANSLATION as langEN } from '../../common/messages/en'

import DropdownMenu from '../dropdown/Dropdown'

import './CopyrightFooter.scss'


class CopyrightFooter extends React.Component {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  static propTypes = {
    onChangeLocale: PropTypes.func.isRequired,
    appLang: PropTypes.string.isRequired,
  }

  render() {
    const { props, context } = this
    const { intl } = context

    const OPTIONS = [
      { value: langEN.lang, label: intl.formatMessage({ id: 'common.language.english.label' }) },
      { value: langRU.lang, label: intl.formatMessage({ id: 'common.language.russian.label' }) },
    ]

    const selectedOption = OPTIONS.find(item => item.value === props.appLang)
    const handleSelect = option => {
      this.props.onChangeLocale(option.value)
    }

    return <div className="CopyrightFooter">
      <div className="container d-flex">
        <div className="footer-info">
          <span>{new Date().getFullYear()} <FormattedMessage id="common.footer.info.tov" /></span><br />
          <span><FormattedMessage id="common.footer.info.label" /> <a href="http://www.icetrade.by/">www.icetrade.by </a></span>
        </div>
        <div className="lang-selector">
          <DropdownMenu
            type="text"
            menuDirection="top"
            selectedOption={selectedOption}
            onSelect={handleSelect}
            options={OPTIONS}
          />
        </div>
      </div>
    </div>
  }
}

export default CopyrightFooter
