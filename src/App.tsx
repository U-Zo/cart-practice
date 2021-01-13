import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CartContainer from './containers/cart/CartContainer';

const App = () => {
  return (
    <>
      <Switch>
        <Route component={CartContainer} path="/cart" exact />
      </Switch>
    </>
  );
};

export default App;
