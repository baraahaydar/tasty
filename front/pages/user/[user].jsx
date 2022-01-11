import router, { useRouter } from "next/dist/client/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../../API";
import swal from "sweetalert2";
import Link from "next/link";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { getServerSidePropsHandler, usePrivacyChecker } from "../../utils";

const useStyles = makeStyles({
  user: {
    flex: 4,
    padding: "20px",
  },

  userTitleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  userAddButton: {
    width: "80px",
    border: "none",
    padding: "5px",
    backgroundColor: "teal",
    borderRadius: "5px",
    cursor: "default",
    color: "white",
    fontSize: "16px",
  },

  userContainer: {
    display: "inline-flex",
    marginTop: "20px",
  },

  userUpdate: {
    flex: 2,
    webkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
    boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
    marginLeft: "20px",
    paddingLeft: "10rem",
    paddingRight: "10rem",
    paddingBottom: "2rem",
  },

  userUpdateTitle: {
    fontSize: "24px",
    fontWeight: 600,
  },

  userUpdateForm: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },

  userUpdateItem: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },

  userUpdateItem: {
    "& > label": {
      marginBottom: "5px",
      fontSize: "14px",
    },
  },

  userUpdateInput: {
    border: "none",
    width: "250px",
    height: "30px",
    marginTop: "10%",
  },

  userUpdateRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  userUpdateButton: {
    borderRadius: "5px",
    border: "none",
    padding: "5px",
    cursor: "default",
    backgroundColor: "darkblue",
    color: "white",
    fontWeight: 600,
    marginTop: "10%",
  },
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


export default function User(props) {
  usePrivacyChecker();
  /// la tbayle l data  de8re
  useEffect(() => {
    getdata();
  }, []);

  const styles = useStyles();
  const [state, updateState] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
  });

  const { query } = useRouter();
  let userid = query["user"];

  const handleChangetext = (e) => {
    let { name, value } = e.target;
    setState({ [name]: value });
  };

  ///   la ts7able l data w 3adel 3laya
  const getdata = async () => {
    const data = await API.get(`admin/${userid}`);
    setState(data.data);
    console.log(data.data);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: state.name,
      username: state.username,
      password: state.password,
    };
    if (state.username && state.name && state.password) {
      await API.put(`admin/${userid}`, body);
      state.name = "";
      state.username = "";
      state.password = "";

      swal.fire({
        title: "The Admin has been successfully updated",
        icon: "success",
      });
      router.push('/userlist')
    }
  };
  const setState = (nextState) => {
    updateState((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  };
  return (
    <div className={styles.user}>
      <div className={styles.userTitleContainer}>
        <h1 className={styles.userTitle}>Edit User</h1>
      </div>
      <center>
        <div className={styles.userContainer}>
          <div className={styles.userUpdate}>
            <form className={styles.userUpdateForm}>
              <div style={{ display: "flex", columnGap: "40%" }}>
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={styles.userUpdateLeft}>
                    <div className={styles.userUpdateItem}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoComplete="name"
                        autoFocus
                        name="name"
                        value={state.name}
                        onChange={handleChangetext}
                      />
                    </div>
                    <div className={styles.userUpdateItem}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        name="username"
                        value={state.username}
                        onChange={handleChangetext}
                      />
                    </div>
                    <div className={styles.userUpdateItem}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        label="Password"
                        autoComplete="password"
                        autoFocus
                        name="password"
                        value={state.password}
                        onChange={handleChangetext}
                      />
                    </div>
                  </div>
                  <div className={styles.userUpdateRight}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handlesubmit}
                      className={styles.userUpdateButton}
                    >
                      update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </center>
    </div>
  );
}
User.layout = "default";
