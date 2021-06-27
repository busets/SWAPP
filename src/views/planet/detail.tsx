import React from 'react';
import {  match } from 'react-router-dom';
import { GET_PLANET } from "../../queries/planet.js";
import {  useQuery } from '@apollo/client';

interface DetailParams {
  id: string;
}

interface DetailsProps {
  required: string;
  match?: match<DetailParams>;
}

const Details: React.FC<DetailsProps> = (props: DetailsProps): JSX.Element => {
  const id = props.match?.params.id;
  const { error, data, loading } = useQuery(GET_PLANET, {
    variables: {planetId:id}
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  console.log(data)
  return(
    <div>
      hello
    </div>
  )
}

export default Details;