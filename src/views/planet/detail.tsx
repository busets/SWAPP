import React, { useState} from 'react';
import {  match } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { GET_PLANET } from "../../queries/planet.js";
import {  useQuery } from '@apollo/client';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

interface IParam {
  id: string;
}

interface IProps {
  required: string;
  match?: match<IParam>;
}

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
      backgroundImage: `url('../images/starship.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
    '@media (max-width:640px)': {
      backgroundImage: `url('../images/planet-portrait.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
  },
  notFoundDiv:{
    display:'flex',
    alignItems: 'center',
    backgroundColor: '#303030', 
    height: '100vh'
  },
  notFound: {
    alignSelf: 'center',
    '@media (min-width:641px)': {
      width: '30%',
      marginLeft: '35%'
    },
    '@media (max-width:640px)': {
      width: '100%',
    },
  },
  bannerSection: {
    '@media (min-width:641px)': {
      padding: '40% 10% 10% 10%',
    },
    '@media (max-width:640px)': {
      paddingTop:  '80vh',
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
      fontSize: '3rem',
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
    // height: '100vh',
    padding: 0,
    marginTop: 5,
    marginBottom: 5
  },
  divGray: {
    '@media (min-width:641px)': {
      backgroundColor: '#f4f4f4'
    },
    // height: '100vh'
  },
  content: {

    '@media (max-width:641px)': {
      padding: '2rem'
    },
    '@media (min-width:641px)': {
      padding: '4rem',
    },
  },
  buttonFav:{
    border: '1px solid red'
  }
}));


const Details: React.FC<IProps> = (props: IProps): JSX.Element => {
  const id = props.match?.params.id;
  const [watchlist, setWatchlist] = useState<boolean|false>(false);
  const { error, data, loading } = useQuery(GET_PLANET, {
    variables: {planetId:id}
  });
  const styles = useStyles();

  const handleFav = (planetId:string) => {
    var favourites = localStorage.getItem('watchlist');
    if(favourites){
      var check= JSON.parse(favourites).find( (p:string) => p === planetId);
      var temp = JSON.parse(favourites);
      if(!check){
        temp.push(planetId);
        localStorage.setItem('watchlist',JSON.stringify(temp));
        setWatchlist(true);
      }else{
        var update = temp.filter(function(e:string) { return e !== planetId })
        localStorage.setItem('watchlist',JSON.stringify(update));
        setWatchlist(false);
      }
    }else{
      setWatchlist(true);
      localStorage.setItem('watchlist',JSON.stringify([planetId]));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
  }
  return(
    <>
      {
        error ? 
        <div>
          <Container maxWidth="xl" className={styles.banner}>
            <div className={styles.notFoundDiv}>
              <img src="../images/planet-notfound.png"  alt="NotFound" className={styles.notFound}/>
            </div>
          </Container>
        </div>
        :
        <div>
          <Container maxWidth="xl" className={styles.banner}>
            <div className={styles.bannerImage}>
              <Grid xl={6} xs={12} item={true} className={styles.bannerSection}>
                <Typography component="h1" variant="h2" gutterBottom className={styles.bannerTitle}>
                  {data.planet.name}
                </Typography>
              </Grid>
            </div>
          </Container>

          <Container maxWidth="xl" className={styles.section}>
            <Grid container xs={12} sm={12} direction="row" spacing={1} alignItems={'center'} justify={'center'} item={true}>
              <Grid  xs={12} sm={5} item={true} className={styles.divGray}>
                <Container className={styles.content}>
                  <img src="../images/planet.png" alt="Planet"  style={{display:'flex', margin: 'auto', width: '100%'}}/>
                </Container>
              </Grid>
              <Grid  xs={12} sm={7} item={true}>
                <Container className={styles.content}>
                  <Typography component="h1" variant="h2" gutterBottom >
                    {data.planet.name}

                    <Button 
                      size="medium" 
                      color="default" 
                      variant="outlined"  
                      startIcon={
                        watchlist ? <FavoriteIcon /> : <FavoriteBorderIcon />
                      }
                      style={watchlist ? {marginLeft: 20, border: '1px solid #dc3545', color: '#dc3545'} : {marginLeft: 20}}
                      onClick={() => { handleFav(data.planet.id) }}
                    >
                      {watchlist ? 'On Watchlist' : 'Add to Watchlist'}
                    </Button>
                  </Typography>
                  <Typography component="p" variant="h5" gutterBottom >
                    <strong>{data.planet.name}</strong> is 
                    {
                      data.planet.population ? 
                      ' a planet that has a population of '+data.planet.population.toLocaleString('id-ID')+' creatures.'
                      :
                        (data.planet.name.toLowerCase() !== 'unknown') ?
                        ' an uninhabited planet.'
                        : ' a common name for an unknown planet in the starwars universe' 
                    }
                    <br></br>
                    {
                      data.planet.filmConnection.totalCount ? 
                      ' This planet is mentioned in '+data.planet.filmConnection.totalCount+' Star Wars movie series.' 
                      : 
                        (data.planet.name.toLowerCase() !== 'unknown') ?
                        data.planet.residentConnection.totalCount ? 
                          ' Only '+data.planet.residentConnection.totalCount+' resident connected to this planet'
                          : null
                        : null
                    }
                  </Typography>
                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true} style={{marginTop: 20}}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Diameter: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.diameter ?  data.planet.diameter.toLocaleString('id-ID')+' km' : 'Unknown'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Gravity: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.gravity ?  data.planet.gravity : 'Unknown'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Orbital Period: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.orbitalPeriod ?  data.planet.orbitalPeriod.toLocaleString('id-ID') : 'Unknown'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Rotation Period: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.rotationPeriod ?  data.planet.rotationPeriod.toLocaleString('id-ID') : 'Unknown'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Surface Water: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.surfaceWater ?  data.planet.surfaceWater.toLocaleString('id-ID')+' km' : 'Unknown'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Climates: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.climates && data.planet.climates.length ?  
                          (
                            data.planet.climates.map( (climate:string) => 
                              climate+', '
                            )
                          )
                        : 'Unknown'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Terrains: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.terrains && data.planet.terrains.length ?  
                          (
                            data.planet.terrains.map( (terraint:string) => 
                            terraint+', '
                            )
                          )
                        : 'Unknown'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Resident Connections: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {data.planet.residentConnection.totalCount ?  data.planet.residentConnection.totalCount : 0} Residents
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Date Created: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {dayjs.tz(data.planet.created, "DD-MM-YYYY HH:mm", "Asia/Jakarta").format("D MMM YYYY h:mm A")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} sm={12} direction="row" spacing={1} item={true}>
                    <Grid  xs={12} sm={3} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        <strong>Date Updated: </strong>
                      </Typography>
                    </Grid>
                    <Grid  xs={12} sm={9} item={true}>
                      <Typography component="h4" variant="h5" gutterBottom >
                        {dayjs.tz(data.planet.edited, "DD-MM-YYYY HH:mm", "Asia/Jakarta").format("D MMM YYYY h:mm A")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </Container>
        </div>
      }
    </>
  )
}

export default Details;