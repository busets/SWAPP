import React, {  useState, useEffect, useRef } from "react";

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
  }
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

const first = 9;

const Home = (): JSX.Element => {
  const styles = useStyles();
  
  const [planetsData,  setPlanetsdata ] = useState<any | null>(null);
  
  const { error, data, fetchMore, networkStatus } = useQuery(GET_LIST, {
    variables: {first},
    notifyOnNetworkStatusChange: true
  });

  const observerRef = useRef<any | null>(null);
  const [buttonRef, setButtonRef] = useState<any | null>(null);

  useEffect(() => {
    const options = {
      root: document.querySelector("#list"),
      threshold: 0.1,
    };
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        let element: HTMLElement = document.querySelectorAll('#'+entry.target.id)[0] as HTMLElement;
        element.click();
      }
    }, options);
  }, []);

  useEffect(() => {
    if (buttonRef) {
      if(observerRef.current){
        observerRef.current.observe(document.querySelector("#buttonLoadMore"));
      }
    }
  }, [buttonRef]);

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (networkStatus === 1) {
    return <div>Loading...</div>;
  }

  const hasNextPage = planetsData ? planetsData.data.allPlanets.pageInfo.hasNextPage: data.allPlanets.pageInfo.hasNextPage;
  const isRefetching = networkStatus === 3;
  return (
    <>
      <div >
        <Container maxWidth="xl">
          <Grid container xs={12} sm={12} direction="row" spacing={1} alignItems={'center'} justify={'center'} item={true}  id="list" >
            {
              planetsData && planetsData.data.allPlanets && planetsData.data.allPlanets.planets && planetsData.data.allPlanets.planets.length && planetsData.data.allPlanets.planets.map( (planets: IDetail) => 
                <Grid  xs={12} sm={4} item={true} key={planets.id}>
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

        {
          hasNextPage && (
            <div >
              <Button
                ref={setButtonRef}
                id="buttonLoadMore"
                disabled={isRefetching}
                style={{backgroundColor: 'none', color:'none'}}
                onClick={() =>
                  fetchMore({
                    variables: {
                      first,
                      after: planetsData ? planetsData.data.allPlanets.pageInfo.endCursor : data.allPlanets.pageInfo.endCursor
                    },
                    updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                      if(previousResult.allPlanets.pageInfo.hasPreviousPage) return previousResult
                      const newEntries = fetchMoreResult.allPlanets;
                      const prevEntries = planetsData ? planetsData.data.allPlanets.planets : previousResult.allPlanets.planets
                      const newData = {
                        data: {
                          allPlanets: {
                            total : previousResult.allPlanets.totalCount,
                            pageInfo: {
                              hasNextPage: newEntries.pageInfo.hasNextPage,
                              endCursor: newEntries.pageInfo.endCursor
                            },
                            planets: [...prevEntries, ...newEntries.planets],
                          }
                        }
                      };
                      setPlanetsdata(newData);
                      return { newData};
                    },
                  })
                }
              >
                load more
              </Button>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Home;