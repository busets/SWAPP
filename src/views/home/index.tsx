import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Planets from '../planet/index'

const useStyles = makeStyles( theme => ({
  banner: {
    padding: 0,
    top: 0,
    left:0,
    // backgroundColor: 'red',
    height: '100vh',
  },
  bannerImage: {
    '@media (min-width:641px)': {
      backgroundImage: `url('../images/banner.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
    '@media (max-width:640px)': {
      backgroundImage: `url('../images/banner-portrait.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
  },
  bannerSection: {
    '@media (min-width:641px)': {
      padding: '20% 10%',
    },
    '@media (max-width:640px)': {
      paddingTop:  '70vh',
      paddingLeft: '10%',
      paddingRight: '10%',
    },
  },
  bannerTitle: {
    color: 'white',
    '@media (min-width:641px)': {
      fontSize: '5rem'
    },
    '@media (max-width:640px)': {
      fontSize: '2rem',
      textAlign: 'center'
    },
  },
  bannerText: {
    color: 'white',
    '@media (max-width:641px)': {
      fontSize: '1.25rem',
      textAlign: 'center'
    },
    '@media (min-width:641px)': {
      fontSize: '2rem',
    },
  },
  section: {
    '@media (min-width:641px)': {
      padding: '3rem 2rem'
    },
    '@media (max-width:640px)': {
      padding: '2rem 0'
    },
  },
  sectionBorder: {
    display: 'block',
    width: '200px',
    height: '3px',
    background: '#f1cd8f',
    margin: '20px auto',
    '@media (max-width:600px)': {
      width: '120px',
      margin: '10px auto',
    },
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '2rem',
    '@media (min-width:600px)': {
      fontSize: '5rem'
    },
  },
  sectionText: {
    textAlign: 'center',
    color: 'gray',
    '@media (max-width:640px)': {
      fontSize: '1.25rem',
      textAlign: 'center'
    },
    '@media (min-width:641px)': {
      fontSize: '2rem',
    },
  },
}));

const Home = (): JSX.Element => {
  const styles = useStyles();
  return (
    <>
      <div>
        <Container maxWidth="xl" className={styles.banner}>
          <div className={styles.bannerImage}>
            <Grid xl={6} xs={12} item={true} className={styles.bannerSection}>
              <Typography component="h1" variant="h2" gutterBottom className={styles.bannerTitle}>
                Hello <br /><span>Travellers</span>
              </Typography>
              <Typography component="p" variant="h4" gutterBottom className={styles.bannerText}>
                Welcome to StarWars universe
              </Typography>
            </Grid>
          </div>
        </Container>
        <Grid xl={12} xs={12} className={styles.section} item={true}>
          <Grid xl={12}  xs={12} item={true}>
            <Typography variant="h2" component="h1" gutterBottom className={styles.sectionTitle}>
              PLANETS
            </Typography>
            <Typography component="p" gutterBottom className={styles.sectionText}>
              All the planets on StarWars universe you've ever wanted to know.
            </Typography>
            <div className={styles.sectionBorder}></div>
          </Grid>
          <Planets />
        </Grid>
      </div>
    </>
  );
};

export default Home;