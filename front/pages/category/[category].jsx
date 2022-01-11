import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import API from "../../API";
import swal from "sweetalert2";
import { getServerSidePropsHandler, usePrivacyChecker } from "../../utils";
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
export const getServerSideProps = async (req, res) => {
  let categoryid = req.query.category;
  let resultcategory = await API.get(`category/${categoryid}`);
  let categoryname = resultcategory.data.data;

  return {
    props: {
      categoryname,
      categoryid,
    },
  };
};
export default function Category(props) {
  usePrivacyChecker();

  const styles = useStyles();
  const [state, updateState] = useState({
    type: props.categoryname.type,
  });

  const handleChangetext = (e) => {
    let { name, value } = e.target;
    setState({ [name]: value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const body = { type: state.type };

    await API.put(`category/${props.categoryid}`, body);
    swal.fire({
      title: "The category has been successfully updated",
      icon: "success",
    });
    router.push('/categorylist')
  };

  const setState = (nextState) => {
    updateState((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  };

  return (
    <div className={styles.newProduct}>
      <h1 className={{ marginLeft: "10%" }}>update Category</h1>
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
          defaultValue={state.type}
          onChange={handleChangetext}
          style={{ marginBottom: "50px" }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handlesubmit}
        >
          update
        </Button>
      </FormControl>
    </div>
  );
}
Category.layout = "default";