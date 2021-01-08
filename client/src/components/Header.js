import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <li>
            <a href='/auth/google'>Login with Google</a>
          </li>
        )
      default:
        return [
          <li key='1'>
            <Payments />
          </li>,
          <li key='3' style={{ margin: '2 12 px' }}>
            Credits : {this.props.auth.credits}
          </li>,
          <li key='2'>
            <a href='/api/logout'>Logout</a>
          </li>
        ]
    }
  }
  render() {
    // console.log(this.props);
    return (
      <nav>
        <div className='nav-wrapper orange lighten-1'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            SurveyMonkey
          </Link>
          <ul className='right'>{this.renderContent()}</ul>
        </div>
      </nav>
    )
  }
}

function mapStateProps({ auth }) {
  return { auth }
}

export default connect(mapStateProps)(Header)
