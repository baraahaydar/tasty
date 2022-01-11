import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useState, useEffect } from "react";
import API from "../API";
import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
    margin: "auto",
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  icons: {
    transform: "scale(2 )",
    marginTop: "3%",
  },
  boxshadow:{
    marginBottom:15,
  },
  shadoow:{
    boxShadow:"1px 3px 3px grey"
  }
}));

export default function ContactUs() {
  const classes = useStyles();

  const [state, setState] = useState([]);

  async function getData() {
    await API.get("shop").then((res) => {
      const data = res.data.data;
      setState(data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          ContactUs
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Here You Can Find All The Informations That You Need For Each Shop
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={4}className={classes.boxshadow}>
            <Card style={{ height: 300 }}className={classes.shadoow}> 
              <CardHeader
                title={<LocationOnIcon className={classes.icons} />}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <ul>
                  {state.map((l) => (
                    <Typography
                      key={l.id}
                      component="li"
                      variant="subtitle1"
                      align="center"
                    >
                      {l.name}:{l.location}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
          {/* ///////////////////Phone///////////////////////////// */}
          <Grid item xs={12} sm={6} md={4} className={classes.boxshadow}>
            <Card style={{ height: 300 }} className={classes.shadoow}>
              <CardHeader
                title={<PhoneIcon className={classes.icons} />}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <ul>
                  {state.map((l) => (
                    <Typography
                      key={l.id}
                      component="li"
                      variant="subtitle1"
                      align="center"
                    >
                      {l.name}:{l.phone}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
          {/* /////////////////////////////Facebook///////////////////////////////// */}
          <Grid item xs={12} sm={6} md={4}className={classes.boxshadow}>
            <Card style={{ height: 300 }}className={classes.shadoow}>
              <CardHeader
                title={<FacebookIcon className={classes.icons} />}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <ul>
                  {state.map((l) => (
                    <Typography
                      key={l.id}
                      component="li"
                      variant="subtitle1"
                      align="center"
                    >
                      {l.name} :
                      <Link
                        href={`${l.facebook}`}
                        style={({ cursor: "pointer" }, { color: "#0984e3" })}
                      >
                        Facebook Link{" "}
                      </Link>
                    </Typography>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

ContactUs.layout = "withheaderfooter";
