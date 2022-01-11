import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import React from "react";
import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    minHeight: "80vh",
    backgroundImage: `url('about.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width:"100%",
  },
  paperContainerCrazyCrep: {
    minHeight: "100vh",
    backgroundImage: `url('hi.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  crazytext: {
    padding: theme.spacing(4),
  },
  paperContainerSourani: {
    minHeight: "100vh",
    backgroundImage: `url('hello.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  souranitext: {
    paddingRight: theme.spacing(4),
  },
  boo:{
    padding: theme.spacing(8, 0, 6),
  }
}));

export default function AboutUs() {
  const classes = useStyles();

  const [state, setState] = useState([]);

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.boo}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom 
          style={{color:"#212121"}}
        >
          About Us
        </Typography>

        <Paper className={classes.paperContainer} variant="outlined"></Paper>
        <Box m={10} />
        <Grid container className={classes.con}>
          <Grid item xs={12} lg={6} md={6} sm={6}>
            <Paper
              className={classes.paperContainerCrazyCrep}
              variant="outlined"
            ></Paper>
          </Grid>

          <Grid item xs={12} lg={6} md={6} sm={6}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.crazytext}
              align="justify"
           
            >
              <h1 style={{color:"#e74c3c"}}>Crazy crepe</h1>
              <span    style={{color:"#7f8c8d"}}>
              Our Store Crazy Crep created by raed sourani have a well known
              popularity of having the best taste in the area with amazing crep
              taste also light so you will not feel heavy afterwards of course
              in addition a crazy flavor of awesome chocolate with fresh fruits...
              </span>
            </Typography>
            
          </Grid>

          <Grid item xs={12} lg={6} md={6} sm={6}>
            <Box m={5} />
            <Typography
              variant="h5"
              component="h5"
              className={classes.souranitext}
              align="justify"
            >
          <h1 style={{color:"#ED9521"}}>Sourani Corner</h1>
          <span  style={{color:"#7f8c8d"}}>
              Sourani corner have a well known reputation of having the best mix
              corn with delecious flavor of cheese and barbecue in addition to
              the corn we have amazing pasta that melt in your mouth and always
              triying to serve people on time because waiting for food is the
              worst feeling...
              </span>
            </Typography>
          </Grid>

          <Grid item xs={12} lg={6} md={6} sm={6}>
            <Box m={5} />
            <Paper
              className={classes.paperContainerSourani}
              variant="outlined"
            ></Paper>
          </Grid>
        </Grid>
      </Container>

    </React.Fragment>
  );
}

AboutUs.layout = "withheaderfooter";
