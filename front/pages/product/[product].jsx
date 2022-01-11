import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import API from "../../API";
import FolderIcon from "@material-ui/icons/Folder";
import swal from "sweetalert2";
import { getServerSidePropsHandler, usePrivacyChecker } from "../../utils";
import router from "next/router";


const useStyles = makeStyles((theme) => ({
  newProduct: {
    flex: 4,
    
  },

  addProductForm: {
    marginTop: "10px",
  },

  addProductItem: {
    width: "250px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },

  addProductItem: {
    "& > label": {
      color: "gray",
      fontWeight: 600,
      marginBottom: "10px",
    },
  },
  addProductItem: {
    "& > input": {
      padding: "10px",
    },
  },

  addProductItem: {
    "& > select": {
      padding: "10px",
    },
  },

  addProductButton: {
    marginTop: "10px",
    padding: "7px 10px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "darkblue",
    color: "white",
    fontWeight: 600,
    cursor: "default",
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));
export const getServerSideProps = async (req, res) => {
  let productsid = req.query.product;
  let resultcategory = await API.get("category");
  let resultshop = await API.get("shop");
  let resultproduct = await API.get(`product/${productsid}`);
  let categories = resultcategory.data.data;
  let shops = resultshop.data.data;
  let product = resultproduct.data.data;

  return {
    props: {
      categories,
      shops,
      product,
      productsid,
    },
  };
};
export default function Product(props) {
  usePrivacyChecker();

  const styles = useStyles();
  const [state, updateState] = useState({
    name: props.product.name,
    description: props.product.description,
    quantity: props.product.quantity,
    categoryid: props.product.cat_id,
    shopid: props.product.shop_id,
    fileUrl: `http://localhost:8000/storage/uploads/${props.product.photo}`,
    fileFolder: null,
  });

  let productid = props.productsid;

  let categoriesbyid = props.categories.filter(
    (item) => item.id == props.product.cat_id
  );
  let shopid = props.shops.filter((item) => item.id == props.product.shop_id);

  const handleChangetext = (e) => {
    let { name, value } = e.target;
    setState({ [name]: value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("quantity", state.quantity);
    formData.append("photo", state.fileFolder);
    formData.append("cat_id", state.categoryid);
    formData.append("shop_id", state.shopid);

    API.post(`product/${productid}`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      swal.fire({
        title: "The Product has been successfully updated",
        icon: "success",
      });
    });
    router.push('/productlist')
  };

  const setState = (nextState) => {
    updateState((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  };

  const handleChangefile = (e) => {
    setState({
      fileUrl: URL.createObjectURL(e.target.files[0]),
      fileFolder: e.target.files[0],
    });
  };
  return (
    <div className={styles.newProduct}>
      <h1 className={{ marginLeft: "10%" }}>Edit product</h1>
      <FormControl>
        <div style={{ display: "flex", columnGap: "40%" }}>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              marginLeft: "10%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              label="name"
              name="name"
              defaultValue={props.product.name}
              onChange={handleChangetext}
            />
            <TextField
              required
              label="description"
              name="description"
              onChange={handleChangetext}
              defaultValue={props.product.description}
            />
            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              defaultValue={props.product.quantity}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangetext}
            />
            <Autocomplete
              id="combo-box-demo"
              options={props.categories}
              getOptionLabel={(option) => option.type}
              defaultValue={{ type: categoriesbyid[0].type }}
              style={{ width: 300 }}
              onChange={(event, value) => setState({ categoryid: value.id })}
              renderInput={(params) => (
                <TextField {...params} label="category" variant="outlined" />
              )}
            />
            <Autocomplete
              id="combo-box-demo"
              options={props.shops}
              getOptionLabel={(option) => option.name}
              defaultValue={{ name: shopid[0].name }}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="shop" variant="outlined" />
              )}
              onChange={(event, value) => setState({ shopid: value.id })}
            />
          </div>
          <div>
            <Avatar alt="" src={state.fileUrl} className={styles.large}>
              <FolderIcon className={styles.large} />
            </Avatar>
            <div style={{ textAlign: "center" }}>
              <Button variant="contained" component="label">
                Upload File
                <input
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  onChange={handleChangefile}
                  hidden
                />
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handlesubmit}
              >
                update
              </Button>
            </div>
          </div>
        </div>
      </FormControl>
    </div>
  );
}
Product.layout = "default";