import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './views/home/index';
import Planet from './views/planet/detail';
import NotFound from './views/notfound';
import WatchList from './views/watchlist/index';

const useStyles = makeStyles( theme => ({
  base: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  footer: {
    width: '100%',
    // position: 'fixed',
    bottom: 0
  }
}));

const App = () => {
  const styles = useStyles()
  useEffect(() => {
    document.title = "StarWars Universe";   
  }, []);
  
  return (
    <div className={styles.base}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/planet" component={Home} />
            <Route exact path="/watchlist" component={WatchList} />
            <Route exact path="/planet/:id" component={Planet} />
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </BrowserRouter>
        <div className={styles.footer}>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
