import React                from 'react'
import PropTypes            from 'prop-types'
import { HashLink as Link } from 'react-router-hash-link'
import { FormattedMessage } from "react-intl"
import _                    from 'lodash'

import './Article.scss'


const Article = props => {
  return <div className="article">
    <div className="image-wrapper">
      <img src={props.image} alt="" align="middle" />
    </div>
    <div className="info-wrapper">
      <h2>
        {!_.isEmpty(props.title) && <FormattedMessage id={props.title} />}
      </h2>
      <div>
        {!_.isEmpty(props.shortText) && <FormattedMessage id={props.shortText} />}
      </div>
      <Link
        to={`${props.link}#page-story`}
        smooth
        onClick={props.onClick}
      ><FormattedMessage id="common.article.text.readMore" /></Link>
    </div>
  </div>
}

Article.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  shortText: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
}

export default Article
