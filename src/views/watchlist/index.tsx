import React, {  useState, useEffect, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { GET_WATCHLIST } from "../../queries/planet.js";

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
  const containID = ["cGxhbmV0czo2","cGxhbmV0czoz"]
  
  const { error, data, networkStatus } = useQuery(GET_WATCHLIST, {
    variables: { containID},
    notifyOnNetworkStatusChange: true
  });


  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  if (networkStatus === 1) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div >
      </div>
    </>
  );
};

export default Home;