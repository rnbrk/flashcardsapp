import React from 'react';
import { connect } from 'react-redux';

import { filterCardsDue, getNumOfCardsStudied, getNumOfCardsRepeated } from '../selectors/cards';
import WrapperPageContent from '../layout/WrapperPageContent';

const Dashboard = props => (
  <WrapperPageContent>
    <article className="card card--standard-size">
      <div className="card__top">Dashboard</div>

      <div className="card__content-text">
        <p>Welcome back. </p>

        <p>
          You have studied {props.numOfCardsStudied}
          {props.numOfCardsStudied === 1 ? ' card' : ' cards'} today from all your collections. And
          you have {props.numOfCardsDue} {props.numOfCardsDue === 1 ? ' card' : ' cards'} due.
        </p>
      </div>
    </article>
  </WrapperPageContent>
);

const mapStateToProps = state => ({
  numOfCardsTotal: state.cards,
  numOfCardsDue: filterCardsDue(state.cards).length,
  numOfCardsStudied: getNumOfCardsStudied(state.cards),
  numOfCardsRepeated: getNumOfCardsRepeated(state.cards),
  numOfCollections: state.collections.length
});

export default connect(mapStateToProps)(Dashboard);
