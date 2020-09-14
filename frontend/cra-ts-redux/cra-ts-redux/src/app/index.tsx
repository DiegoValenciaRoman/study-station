/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { Login } from './containers/Login/Login';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Perfil } from './containers/Perfil/Perfil';
import { Header } from './containers/Header/Header';
import { Footer } from './containers/Footer/Footer';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Header></Header>
      <div className="body">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/perfil" component={Perfil} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>

      <Footer></Footer>
      <GlobalStyle />
    </BrowserRouter>
  );
}
