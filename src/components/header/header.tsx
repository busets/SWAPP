import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  header: {
    width: '100%',
    height: 65,
    borderBottom: '1px solid #344953',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000
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
    display: 'inline-block',
    marginLeft: '15px',
    '@media (min-width:641px)': {
      fontSize: '1.2rem'
    },
    '@media (max-width:640px)': {
      fontSize: '1.2rem'
    },
  }
}));

const Header = () => {
  const styles = useStyles()
  const [navbar, setNavbar] = useState<boolean|false>(false)
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  })

  return (
    <header className={styles.header} style={navbar ? {backgroundColor: 'white'}: {backgroundColor: '#34495361'}}>
      <nav className={styles.nav}>
        <a href="/" >
          <img src="/logo.png" alt="StarWars App" className={styles.logo} />
        </a>
        <ul className={styles.navList} style={navbar ? {color: '#344953'}:{color: 'white'}}>
          <li className={styles.navItem}>
            <a href="../watchlist">Watch List</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;