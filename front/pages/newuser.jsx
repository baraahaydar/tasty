import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {useState } from "react";
import TextField from "@material-ui/core/TextField";
import API from "../API";
import { getServerSidePropsHandler, usePrivacyChecker } from "../utils";
import router from 'next/router';
import swal from "sweetalert2";



const useStyles = makeStyles({
  newUser: {
    flex: 4
  },
  newUserForm: {
    display: 'inline-block',
    flexWrap: 'wrap'
  },

  newUserItem: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    marginRight: '20px'
  },




  newUserSelect: {
    height: '40px',
    borderRadius: '5px'
  },

  newUserButton: {
    width: '220px',
    border: 'none',
    backgroundColor: 'darkblue',
    color: 'white',
    padding: '15px 1px',
    fontWeight: 600,
    borderRadius: '10px',
    marginTop: '30px',
    cursor: 'default'
  }


});


export const getServerSideProps = getServerSidePropsHandler(async (ctx) => {
  let result = await API.get("admin");
  let admins = result.data.data;

  return {
    props: {
      admins,
    },
  };
});



export default function NewUser(props) {
  usePrivacyChecker();
  const styles = useStyles();
  const [state, setState] = useState({
    Admins: [],
    newAdminsData: {
      name: "",
      username: "",
      password: "",
    },
    isLoading: false,
    status: "",
    newAdminModal: false,

  });


  const onChangeAddAdminHandler = (e) => {
    let newAdminsData = state.newAdminsData;
    newAdminsData[e.target.name] = e.target.value;
    setState((prevState) => ({
      ...prevState,
      ...newAdminsData
    }))


  };




  const add = () => {
    const formData = new FormData();
    formData.append("name", state.newAdminsData.name);
    formData.append("username", state.newAdminsData.username);
    formData.append("password", state.newAdminsData.password);

    axios
      .post("http://localhost:8000/api/admin", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        
      })
      .then((res) => {if(res.data.success==true){
        swal.fire({
          title: "The Admin has been successfully Added",
          icon: "success",
        });
      router.push('/userlist')
  
      }else {
        swal.fire({
          title: "Error can't Add an Admin ",
          icon: "error",
        });}
      });
    };
  return (
    <div className={styles.newUser}>
      <center>
        <h1 className={styles.newUserTitle}>New User</h1>
        <form className={styles.newUserForm}>

          <div className={styles.newUserItem}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              type="text"
              autoComplete="name"
              autoFocus
              name="name"
              value={state.newAdminsData.name}
              onChange={onChangeAddAdminHandler}
            />
          </div>

          <div className={styles.newUserItem}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              type="text"
              autoComplete="username"
              autoFocus
              name="username"
              value={state.newAdminsData.username}
              onChange={onChangeAddAdminHandler}
            />
          </div>

          <div className={styles.newUserItem}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              autoComplete="password"
              autoFocus
              name="password"
              value={state.newAdminsData.password}
              onChange={onChangeAddAdminHandler}
            />
          </div>



          <button className={styles.newUserButton}
            onClick={add}
          >Create</button>
        </form>
      </center>
    </div>
  );
}
NewUser.layout = "default"