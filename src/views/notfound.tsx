import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'

const useStyles = makeStyles( theme => ({
  banner: {
    padding: 0,
    top: 0,
    left:0,
    height: '100vh',
  },
  bannerImage: {
    '@media (min-width:641px)': {
      backgroundImage: `url('../images/404-banner.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
    '@media (max-width:640px)': {
      backgroundImage: `url('../images/404-portrait.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
  },
}));


const NotFound = (): JSX.Element => {
  const styles = useStyles();
  return(
    <>
      <div>
        <Container maxWidth="xl" className={styles.banner}>
          <div className={styles.bannerImage}>
          </div>
        </Container>
      </div>
    </>
  )
}

export default NotFound;