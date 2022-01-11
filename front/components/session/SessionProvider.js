import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { setCookie, getCookie, removeCookie } from "./Cookies";
import Swal from "sweetalert2";

export default function SessionProvider({ children }) {
  const [session, setValue] = useState({
    user: {
      access_token: getCookie("access_token"),
    },
  });

  useEffect(() => {
    function initializeSession() {
      let id = getCookie("id");
      let access_token = getCookie("access_token");
      if (access_token)
        fetch(`http://127.0.0.1:8000/api/admin/${id}`, {
          headers: {
            access_token: access_token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            let user = { ...res.data, access_token };
            updateSession({ user });
          });
    }
    initializeSession();
  }, []);

  function updateSession(nextSession) {
    let value =
      typeof nextSession === "function"
        ? nextSession
        : (prevSession) => ({ ...prevSession, ...nextSession });
    setValue(value);
  }

  async function login({ username, password }) {
    // try to login
    let { error, data, token } = await fetch(
      "http://127.0.0.1:8000/api/login",
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    ).then((res) => res.json());

    // return from the function if you have an error
    if (error || !token) return Swal.fire(error);

    // get the data of the loggedin user
    let result = await fetch(`http://127.0.0.1:8000/api/admin/${data.id}`, {
      headers: {
        token: token,
      },
    }).then((res) => res.json());

    let user = { ...result.data, token };

    setCookie("id", data.id);
    setCookie("token", token);
    updateSession({ user });
    Swal.fire(`Welcome ${data.name}!`);
  }

  function logout() {
    updateSession({});
    removeCookie("id");
    removeCookie("token");
  }

  const context = {
    session,
    actions: {
      login,
      logout,
    },
  };

  console.log({ context });

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
