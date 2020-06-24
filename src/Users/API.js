import axios from "axios";

export const login = user => {
  return axios
    .post("https://esm-api.herokuapp.com/api/signin", {
      //.post("http://localhost:5000/api/signin", {
      username: user.username,
      password: user.password
    })
    .then(response => {
      const now = new Date();
      const expiry = now.getTime() + 20 * 60 * 60 * 1000; //20 hours
      localStorage.setItem("expiry", expiry);
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const signup = newUser => {
  return axios
    .post("https://esm-api.herokuapp.com/api/signup", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("res", response);
      return response;
    })
    .catch(err => {
      console.log("err", err);
      return err.response;
    });
};

export const signupClient = newUser => {
  return axios
    .post(
      "https://esm-api.herokuapp.com/api/client/signup",
      {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
      },
      {
        headers: { Authorization: "Bearer " + localStorage.usertoken }
      }
    )
    .then(response => {
      return response;
    })
    .catch(err => {
      err.status = err.response.status;
      return err;
    });
};
