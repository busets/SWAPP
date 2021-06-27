import React, {  useState, useEffect, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_PLANETS } from "../../queries/planet.js";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
      backgroundImage: `url('./images/banner.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
    '@media (max-width:640px)': {
      backgroundImage: `url('./images/banner-portrait.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      minHeight: '100%',
      height: '100vh',
    },
  },
  list: {
    padding: 0
  }
}));
interface IDetail{
  id: string;
  name: string;
}

// interface IPlanets{
//   total: number;
//   info: {
//     hasNextPage : boolean;
//     endCursor: string;
//   };
//   list: IDetail[];
// }


const first = 10;

const Home = (): JSX.Element => {
  const styles = useStyles();
  
  const [planetsData,  setPlanetsdata ] = useState<any | null>(null);
  
  const { error, data, fetchMore, networkStatus } = useQuery(GET_PLANETS, {
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
        <Container maxWidth="xl" className={styles.banner}>
          <div className={styles.bannerImage}>

          </div>
        </Container>
        <Container maxWidth="xl" className={styles.list} id="list">
          {
            planetsData && planetsData.data.allPlanets && planetsData.data.allPlanets.planets && planetsData.data.allPlanets.planets.length && planetsData.data.allPlanets.planets.map( (planets: IDetail) => 
              <Grid container xl={12} xs={12} direction="row" spacing={1} alignItems={'center'} justify={'center' }style={{ width: "100%" }} item={true}  key={planets.id}>
                <Grid xl={12} xs={12} item={true} >
                  <Card style={{
                      margin: '40px', 
                      padding: '30px',
                      minHeight:400,
                      justifyContent: 'center',
                      borderRadius: '20px'
                    }}>
                      <Typography variant="h4" component="p" gutterBottom style={{paddingBottom: '20px', color: '#ec5c25'}}>
                        {planets.id}
                      </Typography>
                      <Typography variant="h4"  component="h4" gutterBottom style={{height: 70, marginBottom: 50}}>
                        <strong>{planets.name} </strong> 
                      </Typography>
                      <Typography component="p" gutterBottom>
                        {planets.id}
                      </Typography>
                    </Card>
                </Grid>
              </Grid>
            )
          }

          {hasNextPage && (
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
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;