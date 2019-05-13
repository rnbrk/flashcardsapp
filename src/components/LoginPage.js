import React from 'react';
import { connect } from 'react-redux';
import { startLogin as startLoginAction } from '../actions/auth';
import Logo from './Logo';

export const LoginPage = ({ startLogin }) => (
  <main className="login-page">
    <div className="card-collection">
      <div className="card material">
        <div className="card--top" />

        <div className="card--content">
          <div className="card--content-textfront">
            <div className="login-logo">
              <i className="material-icons md-48">ballot</i>
              <Logo />
              <div>Memorization made simple.</div>
            </div>
          </div>

          <div className="card--content-textback">
            <button className="button button" onClick={startLogin} type="button">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLoginAction())
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
