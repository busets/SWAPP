import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
  query GetPlanets{
    allPlanets(first:10)
    {
      totalCount
      pageInfo{
        hasNextPage
        endCursor
      }
      planets {
        id
        name
        diameter
        gravity
        climates
        surfaceWater
        population
        orbitalPeriod
        rotationPeriod
        created
        edited
        residentConnection(first:3){
          totalCount
          residents{
            id
            name
            gender
            birthYear
            hairColor
            eyeColor
            mass
            height
            skinColor
            created
            edited
            species{
              name
              classification
              designation
            }
            
          }
        }
        filmConnection(first:3){
          totalCount
          films{
            episodeID
            title
            releaseDate
            director
            producers
            openingCrawl
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles( theme => ({
  banner: {
    padding: '4rem 2rem'
  },
}));

const Home = (): JSX.Element => {
  const styles = useStyles()
  const { data, loading, error } = useQuery(FEED_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{error.message}</pre>
  console.log(data)
  return (
    <>
      <div className={styles.banner}> home</div>
    </>
  );
};

export default Home;