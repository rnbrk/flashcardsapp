import React from 'react';
import { Link } from 'react-router-dom';

const ScreenTitle = ({ title, subtitle }) => (
  <div>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
    <Link to="/">Home</Link>
    <Link to="/studycollection1">Study</Link>
  </div>
);

export default ScreenTitle;
