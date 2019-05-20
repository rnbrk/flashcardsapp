import React from 'react';
import { Redirect } from 'react-router-dom';

export default class NotFoundPage extends React.Component {
  state = { redirect: false, WAIT_IN_MS: 4000 };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, this.state.WAIT_IN_MS);
  }

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/" />
        ) : (
          <div>Page is not found. You will be redirected to the dashboard</div>
        )}
      </div>
    );
  }
}
