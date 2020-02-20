import React, { PureComponent }      from 'react'
import PropTypes  from 'prop-types'


import './CardInfo.scss'
import {FormattedMessage} from "react-intl";


class CardInfo extends PureComponent {

    static contextTypes = {
        intl: PropTypes.object.isRequired,
    }

    render(){
        const { intl } = this.context
        const { info } = this.props
        return <div className={"card-info"}>
            <div className={"info description"}>
                <span className={"title"}><FormattedMessage id="page.description.text.1.1"/> </span> {intl.formatMessage({id: info.description})}
            </div>
            <div className={"info time"}>
                <span className={"title"}><FormattedMessage id="page.description.text.1.3"/> </span> {intl.formatMessage({id: info.time})}
            </div>
            <div className={"info source"}>
                <span className={"title "}><FormattedMessage id="page.description.text.1.5"/> </span><FormattedMessage id="page.description.text.1.6"/> {info.source}
            </div>
        </div>
    }
}


CardInfo.propTypes = {
  info: PropTypes.object,
}

export default CardInfo
