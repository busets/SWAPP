import React, {  useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_LIST } from "../../queries/planet.js";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( theme => ({
  banner: {
    padding: 0,
    top: 0,
    left:0,
    // backgroundColor: 'red',
    height: '100vh',
  },
  list: {
    padding: 0
  },
  card: {
    margin: 20,
    minHeight: 380
  },
  content: {
    minHeight: 180
  },
  media:{
    height: 150,
  },
  info:{
    '@media (min-width:641px)': {
      fontSize: '1.2rem'
    },
    '@media (max-width:640px)': {
      fontSize: '1.05rem'
    },
  },
  section: {
    height: '80vh'
  },
  headline:{
    backgroundColor: '#303030', 
    height: '20vh'
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
  headlineText: {
    color: 'white',
    '@media (min-width:641px)': {
      padding: '5rem 2rem',
    },
    '@media (max-width:640px)': {
      padding: '2rem'
    },
  },
}));

interface IFilm{
  totalCount: number;
}
interface IResidents{
  totalCount: number;
}
interface IDetail{
  id: string;
  name: string;
  population: number;
  filmConnection: IFilm;
  residentConnection: IResidents;
}

const Watchlist = (): JSX.Element => {
  const styles = useStyles();
  const [watchlist, setWatchlist] = useState<any>([]);
  const planets:any = window.localStorage.getItem('watchlist');
  const { error, loading, data} = useQuery(GET_LIST, {
    variables: { },
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    let temp = JSON.parse(planets);
    if(temp && temp.length){
      if(data){
        const dataPlanet = data.allPlanets.planets;
        let datas = []
        for(let i = 0; i < temp.length ;  i++){
          const checkData = dataPlanet.find((p:any) => (p.id) === temp[i])
          if(checkData){
            datas.push(checkData)
          }
          if(datas && datas.length){
            setWatchlist(datas)
          } 
        }
      }
    }
  }, [setWatchlist, data, planets]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return (
    <>
      <div >
        { (watchlist && watchlist.length) ? 
          <div>
            <Container maxWidth="xl" className={styles.headline}>
              <Grid container xs={12} sm={12} spacing={1} item={true} >
                <Typography gutterBottom variant="h3" component="h2" className={styles.headlineText}>
                  Watchlist
                </Typography>
              </Grid>
            </Container>
            <Container maxWidth="xl" className={styles.section}>
              <Grid container xs={12} sm={12} spacing={1} item={true} >
                {
                  watchlist && watchlist.length && watchlist.map( (planets: IDetail) => 
                    <Grid  xs={12} sm={3} item={true} key={planets.id}>
                      <Card className={styles.card}>
                          <CardActionArea>
                            <CardMedia
                              className={styles.media}
                              image="../images/default.jpg"
                              title={planets.name}
                            />
                            <CardContent className={styles.content}>
                              <Typography gutterBottom variant="h5" component="h2">
                                {planets.name}
                              </Typography>
                              <Typography color="textSecondary" component="p" className={styles.info}>
                                <strong>{planets.name}</strong> is 
                                {
                                  planets.population ? 
                                  ' a planet that has a population of '+planets.population.toLocaleString('id-ID')+' creatures.'
                                  :
                                    (planets.name.toLowerCase() !== 'unknown') ?
                                    ' an uninhabited planet.'
                                    : ' a common name for an unknown planet in the starwars universe' 
                                }
                                {
                                  planets.filmConnection.totalCount ? 
                                  ' This planet is mentioned in '+planets.filmConnection.totalCount+' Star Wars movie series.' 
                                  : 
                                    (planets.name.toLowerCase() !== 'unknown') ?
                                      planets.residentConnection.totalCount ? ' Only '+planets.residentConnection.totalCount+' resident connected to this planet'
                                      : null
                                    : null
                                }
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary" href={'/planet/'+planets.id}>
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                    </Grid>
                  )
                }
              </Grid>
            </Container>
          </div>
          :
          <Container maxWidth="xl" className={styles.banner}>
            <div className={styles.notFoundDiv}>
              <img src="../images/planet-notfound.png"  alt="NotFound" className={styles.notFound}/>
            </div>
          </Container>
        }
      </div>
    </>
  );
};

export default Watchlist;