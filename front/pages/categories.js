import { useState, useEffect } from "react";
import API from "../API";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles({
  whole: {
    transform: "translateZ(0)",
    padding: 15,
  },

  root: {
    flexGrow: 1,
    marginBottom: 20,
    backgroundColor: "#f1c40f ",
    marginTop:65,
  },

  media: {
    height: 250,
  },
});

export const getServerSideProps = async (req, res) => {
  let id_shop = req.query.id;
  let result = await API.get(`shop`);
  let shops = result.data.data;

  return {
    props: {
      shops,
    },
  };
};

export default function Categories(props) {
  const classes = useStyles();
  const router = useRouter();
  const id_shop = router.query.id;

  let [state, updateState] = useState({
    isFetch: true,
    categories: [],
    products: [],
    category_id: "",
    id_shop: id_shop,
    phone: "",
    facebook: "",
    value: 0,
    photolink: "http://localhost:8000/storage/uploads/",
    wplink: "https://api.whatsapp.com/send/?phone=",
  });

  const setState = (nextState) => {
    updateState((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  };

  // const handleChange = (e) => {
  //   let { name, value } = e.target;
  //   setState({ [name]: value });
  // };

  const handleChange = (event, newValue) => {
    setState({ value: newValue });
  };

  useEffect(() => {
    async function fetchData() {
      if (state.isFetch) {
        await API.get(`shop/${id_shop}`).then((res) => {
          const data = res.data.data;
          setState({
            phone: data[0].phone,
            facebook: data[0].facebook,
          });
        });

        await API.get("category").then(async (res) => {
          const data = res.data.data;
          let arr = [];

          await API.get(`product`).then((res) => {
            const result = res.data.data;

            data.map((d) => {
              let isResult = result.find(
                (r) => r.cat_id == d.id && r.shop_id == state.id_shop
              );
              if (isResult) arr.push({ id: d.id, type: d.type });
            });
            setState({ categories: arr });
          });
        });
        setState({ isFetch: false });
      }

      await API.get(`prod-shop/${state.id_shop}`).then((res) => {
        const data = res.data.data;
        if (state.category_id && state.category_id != "") {
          const result = data.filter((d) => d.cat_id == state.category_id);
          setState({ products: result });
        } else {
          setState({ products: data });
        }
      });
    }
    fetchData();
  }, [state.category_id]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Paper className={classes.root}>
        <Tabs
          value={state.value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {state.categories.map((item) => (
            <Tab
              href="#"
              style={{ color: "black" }}
              key={item.id}
              onClick={() => setState({ category_id: item.id })}
              label={item.type}
            />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3} className={classes.whole}>
        {state.products.map((pro) => (
          <Grid item key={l.id} xs={6} sm={3} key={pro.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={state.photolink + pro.photo}
                  title={pro.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {pro.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {pro.description}
                  </Typography>
                  <a href={
                      state.wplink + state.phone + "&text=" + pro.description
                    } target="_blank">                    <WhatsAppIcon />
</a>
               

                  <a href={state.facebook} target="_blank">
                    <FacebookIcon />
                  </a>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
Categories.layout = "withheaderfooter"