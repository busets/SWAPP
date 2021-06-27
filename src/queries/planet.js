
import { gql } from '@apollo/client';

export const  GET_PLANETS = gql`
  query allPlanets($first: Int, $after: String){
    allPlanets(first: $first, after: $after)
    {
      totalCount
      pageInfo{
        hasNextPage
        hasPreviousPage
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
