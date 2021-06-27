
import { gql } from '@apollo/client';

const GET_PLANET = gql`
  query getPlanet($planetId: ID) {
    planet(id: $planetId) {
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
      terrains
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
`;

const GET_LIST = gql`
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
        population
        residentConnection(first:3){
          totalCount
        }
        filmConnection(first:3){
          totalCount
        }
      }
    }
  }
`;

export { GET_LIST, GET_PLANET }