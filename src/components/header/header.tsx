import React from "react";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  // banner: {
  //   minHeight: '90vh',
  //   '@media (min-width:600px)': {
  //     padding: '0 4rem'
  //   },
  // },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#344953',
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  nav: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem'
  },
  logo: {
    color : 'white',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  navList: {
    listStyle: 'none'
  },
  navItem: {
    color: 'white',
    fontSize: '16px',
    display: 'inline-block',
    marginLeft: '15px'
  }
}));

const Header = () => {
  const styles = useStyles()
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a className={styles.logo} href="/">Home</a>
        <ul className={styles.navList}>
          <li className={styles.navItem}>Hello</li>
          <li className={styles.navItem}>World</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;