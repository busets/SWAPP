import React from "react";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  header: {
    width: '100%',
    height: 65,
    backgroundColor: '#34495361',
    borderBottom: '1px solid #344953',
    position: 'fixed',
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
    height:  '40px'
  },
  navList: {
    listStyle: 'none'
  },
  navItem: {
    color: '#344953',
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
        <a href="/" >
          <img src="/logo.png" alt="StarWars App" className={styles.logo} />
        </a>
        <ul className={styles.navList}>
          <li className={styles.navItem}>Hello</li>
          <li className={styles.navItem}>World</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;