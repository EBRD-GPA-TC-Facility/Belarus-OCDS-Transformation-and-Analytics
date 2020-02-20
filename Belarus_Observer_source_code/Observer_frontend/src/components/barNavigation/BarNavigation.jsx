import React, { PureComponent } from 'react'
import { connect }                        from 'react-redux'
import { bindActionCreators }             from 'redux'
import _                                  from 'lodash'
import * as classnames                    from 'classnames'

import {
  changeLocation,
  setCurrentLocation,
}                             from '../../store/navigation/NavActions'
import { convertToKebabKase } from '../../utils/stringUtils'

import IconHome                          from '../icons/IconHome'
import NavItem                           from '../navItem/NavItem'
import IconStatistic                     from '../icons/IconStatistic'

import './BarNavigation.scss'
import PropTypes                         from "prop-types"
import { ENGLISH_TRANSLATION as langEN } from "../../common/messages/en"
import { RUSSIAN_TRANSLATION as langRU } from "../../common/messages/ru"
import DropdownMenu                      from "../dropdown/Dropdown"
import IceTradeIcon                      from "../icons/IceTradeIcon"
import LanguageSelector from "../languageSelector/LanguageSelector";


const BAR_NAV_CONFIG = [
  {
    label: 'page.dashboard.text.1.1',
    key: 'dashboard',
    icon: <IceTradeIcon />,
  },
  {
    label: 'page.dashboard.text.1.2',
    key: 'statistic/procedures',
    icon: <IconStatistic />,
  },
]

class BarNavigation extends PureComponent {

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  static propTypes = {
    onChangeLocale: PropTypes.func.isRequired,
    appLang: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    const loc = window.location.pathname
    props.setCurrentLocation(loc)
    props.changeLocation(loc, loc)
    this.state = {
      navBarClassName: '',
      active: '',
    }
  }

  componentDidMount() {
    const h1 = parseInt(this.refs.header.offsetHeight)
    window.addEventListener('scroll', this._calcScroll.bind(this, h1))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._calcScroll)
  }

  _calcScroll = (h1) => {
    const _window = window
    const heightDiff = parseInt(h1)
    let scrollPos = _window.scrollY
    if (scrollPos > heightDiff) {
      this.setState({
        navBarClassName: 'nav-on-top',
      })
    } else {
      this.setState({
        navBarClassName: 'nav-scrolled',
      })
    }
  }

  isItemActive = currentLocation => {
    const { location } = this.props
    this.setState({
      active: location,
    })
    return !location || location === '/' ? false : location === currentLocation || _.includes(location, currentLocation)
  }

  renderSubMenu = () => {
    const subObject = this.state.active === window.location.pathname
      ? _.find(BAR_NAV_CONFIG, { key: this.state.active.substr(1) })
      : null
    if (_.isEmpty(subObject)) return

    const loc = item => convertToKebabKase(item.key)
    return <div className="sub-bar-menu d-flex container">
      {
        _.map(subObject.sub, item => {
          return <NavItem
            key={loc(item)}
            active={this.isItemActive(`/${loc(item)}`)}
            to={`/${loc(item)}`}
            onItemClick={changeLocation}
            label={item.label}
          />
        })
      }
    </div>
  }

  render() {
    const { props, context } = this
    const { intl } = context

    const OPTIONS = [
      { value: langRU.lang, label: intl.formatMessage({ id: 'common.language.russian.label' }) },
      { value: langEN.lang, label: intl.formatMessage({ id: 'common.language.english.label' }) },
    ]
    const selectedOption = OPTIONS.find(item => item.value === props.appLang)
    const handleSelect = option => {
      this.props.onChangeLocale(option.value)
    }

    const { changeLocation } = this.props
    const loc = item => convertToKebabKase(item.key)
    return (
      <div className={classnames('BarNav fixed-top', this.state.navBarClassName)} ref="header">
        <div className="container header-wrapper">
          <div className="ice-trade-link">
            <a href="http://www.icetrade.by/">
              <IconHome />
            </a>
          </div>
          {
            BAR_NAV_CONFIG.map(item => <NavItem
              icon={item.icon}
              key={loc(item)}
              active={this.isItemActive(`/${loc(item)}`)}
              to={`/${loc(item)}`}
              onItemClick={changeLocation}
              label={item.label}
              location={this.props.location}
            />)
          }
          <div className="lang-selector">
            <LanguageSelector
            selectedOption={selectedOption}
            onSelect={handleSelect}
            options={OPTIONS}
            />
          </div>
        </div>
        {this.renderSubMenu()}
      </div>
    )
  }
}

const mapStateToProps = ({
                           navigation,
                         }) => {
  return {
    location: navigation.location,
    current: navigation.current,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeLocation: bindActionCreators(changeLocation, dispatch),
    setCurrentLocation: bindActionCreators(setCurrentLocation, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BarNavigation)
