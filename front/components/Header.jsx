import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
   
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      background: "#ED9521" ,
      color:"white"
     
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    
    cardHeader: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[700],
    },
    navs:{
        display:"flex",
       columnGap:40,
       color:"#2c3e50",
   fontSize:"20px"
       

    },
   
  
 
  }));

export default function Header() {
  const classes = useStyles();
    
    return(
     
<AppBar
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h4"
            noWrap
            className={classes.toolbarTitle}
            style={{color:"#ffe4c4 ",fontStyle:"italic",fontWeight:"bold"}}
          >
         <Link href="/">Tasty Website</Link>   
          </Typography>
          <nav className={classes.navs}>
            <Link
              variant="button"
              color="textPrimary"
              href="/aboutus"
              className={classes.link}
             
            >
              AboutUS
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/contactUs"
              className={classes.link}
            >
              ContactUS
            </Link>
          </nav>
          <Button
            href="http://localhost:3000/login"
            style = {{color:"white",backgroundColor:"#f1c40f"}}
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
 
    );
};