import React, { Component } from 'react'

import { BaseRoutes }         from '../../routes'
import BarNavigation          from '../../components/barNavigation/BarNavigation'
import CopyrightFooter        from '../../components/footer/CopyrightFooter'

import './BaseContainer.scss'
import { connect }            from "react-redux"
import { withRouter }         from "react-router-dom"
import { bindActionCreators } from "redux"
import { changeLocale }       from "../../store/locale/LocaleActions"
import * as numeral           from "numeral"


numeral.register('locale', 'byn', {
  delimiters: {
    thousands: ' ',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'тыс.',
    million: 'млн',
    billion: 'млрд',
    trillion: 'трлн',
  },
})

class BaseContainer extends Component {

  constructor(props) {
    super(props)
    this.props.lang === 'ru' ? numeral.locale('byn') : numeral.locale('en')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  render() {
    return (
      <div className="BaseContainer">
        <BarNavigation
          onChangeLocale={this.props.changeLocale}
          appLang={this.props.lang}
        />
        <BaseRoutes />
        <CopyrightFooter
          onChangeLocale={this.props.changeLocale}
          appLang={this.props.lang}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ locale }) => ({
  lang: locale.lang,
})

const mapDispatchToProps = dispatch => ({
  changeLocale: bindActionCreators(changeLocale, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer))
