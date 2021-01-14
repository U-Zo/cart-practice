import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import CartContainer from './containers/cart/CartContainer';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route component={CartContainer} path="/cart" exact />
      </Switch>
    </>
  );
};

export default App;
