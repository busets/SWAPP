import React from "react";
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( theme => ({
  // banner: {
  //   minHeight: '90vh',
  //   '@media (min-width:600px)': {
  //     padding: '0 4rem'
  //   },
  // },
  footer: {
    fontSize: '1.2rem',
    height: '60px',
    backgroundColor: '#77818b',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2rem'
  },
  heart: {
    color: 'red',
    marginLeft: '10px'
  }
}));

const Footer = () => {
  const styles = useStyles()
  return (
    <div>
      <Typography component="p" gutterBottom className={styles.footer}>
        From Bandung with <span className={styles.heart}>&hearts;</span>
      </Typography>
      
    </div>
  )
}

export default Footer;