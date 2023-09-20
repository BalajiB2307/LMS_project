import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Add from '../page/AddRecord/Add';
// import Temp from '../page/AddRecord/temp'
import DisplayRecords from '../page/DisplayRecord/DisplayRecords'

// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const RouterPage = (props) => {
    return (
      <Router basename={props.pageInfo.basePath}>
        <Switch>
          <Route path='/home'>
            <DisplayRecords {...props} />
          </Route>
          <Route path='/add'>
            <Add {...props} />
          </Route>
          <Route path='/edit/:_id'>
            <Add {...props} />
          </Route>
          <Route path='*'>Page does not exist</Route>
        </Switch>
      </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;
