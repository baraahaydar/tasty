import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import API from "../API";
import swal from "sweetalert2";
import { getServerSidePropsHandler, usePrivacyChecker } from "../utils";
import router from "next/router";

const useStyles = makeStyles((theme) => ({
  newProduct: {
    flex: 4,
    textAlign: "center",
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

export default function NewCategory() {
  usePrivacyChecker();

  const styles = useStyles();
  const [state, updateState] = useState({
    type: "",
  });
  const handleChangetext = (e) => {
    let { name, value } = e.target;
    setState({ [name]: value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const body = { type: state.type };

   let create= await API.post("category", body);
  if(create.data.success==true){
    swal.fire({
      title: "The category has been successfully Updated",
      icon: "success",
    });
    router.push('/categorylist')
   }
    else{
      swal.fire({
        title: "Error can't create a Category ",
        icon: "error",
      });
    }
  };

  const setState = (nextState) => {
    updateState((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  };

  return (
    <div className={styles.newProduct}>
      <h1 className={{ marginLeft: "10%" }}>New Category</h1>
      <FormControl
        style={{
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        <TextField
          required
          label="name"
          name="type"
          value={state.type}
          onChange={handleChangetext}
          style={{ marginBottom: "50px" }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handlesubmit}
        >
          Create
        </Button>
      </FormControl>
    </div>
  );
}
NewCategory.layout = "default";