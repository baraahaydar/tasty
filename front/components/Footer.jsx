import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import { useState, useEffect } from "react";
import API from "../API";
import FacebookIcon from "@material-ui/icons/Facebook";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  b1: {
background: 'linear-gradient(0.25turn,#e74c3c, #f1c40f)' ,
marginTop:2
 },

});



export default function Footer() {
  const classes=useStyles();

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
    
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        className={classes.b1}
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box color={"#2d3436"} 
              fontFamily={"Lucida Console"}
              fontSize={30}
              marginBottom={4}>Help</Box>

              <Box marginBottom={2}>
                <Link href="/aboutus" color="inherit">
                  AboutUs
                </Link>
              </Box>

              <Box marginBottom={2}>
                <Link href="/contactUs">ContactUs</Link>
              </Box> 
             
            </Grid>
            {state.map((l) => (
              <Grid item key={l.id} xs={12} sm={4}>
                <Box 
              fontSize={30}
              fontFamily={"Lucida Console"}
                color={"#2d3436"} 
                 marginBottom={4}
                 >{l.name
                 }</Box>
                <Box marginBottom={2}>{l.phone}</Box>
                <Box marginBottom={2}>
                  {l.location}
                </Box>
                <Box marginBottom={2}>
                  <Link href={`${l.facebook}`} color="inherit">
                  <FacebookIcon />
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Tasty Website &reg;
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
