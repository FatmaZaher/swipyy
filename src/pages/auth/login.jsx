import React from "react";
import "../../assets/scss/index.scss";
import logo from "../../assets/images/logo.svg";
import shap1 from "../../assets/images/shap1.svg";
import shap2 from "../../assets/images/shap2.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
const login = () => {
  return (
    <Box>
      <Box
        className="login-content"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              className="left-side"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={logo} alt="" className="logo" />
              <img src={shap1} alt="" className="shap1" />
              <img src={shap2} alt="" className="shap2" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="right-side">
              <Box className="login-form">
                <h2 className="h2">Sign in</h2>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="email"
                    label="Email address or user name*"
                    variant="standard"
                    type="email"
                    className="field"
                  />
                  <TextField
                    id="password*"
                    label="Enter password*"
                    variant="standard"
                    type="password"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          style={{
                            color: "#8055f0",
                          }}
                        />
                      }
                      label={
                        <Typography
                          style={{ color: "#969BA3", fontSize: "15px"}}
                        >
                          Remeber me
                        </Typography>
                      }
                    />
                    <Link href="#" underline="always" color="#969BA3">
                      {"Forget Password?"}
                    </Link>
                    <a href="#" className="link"></a>
                  </Box>
                </Box>
                {/*<form action="" className="form">
                 <TextField
                      label="Standard warning"
                      variant="standard"
                      focused
                      style={{
                        color: "#8055f0",
                      }}
                    /> */}
                {/* <Box className="feild mb-3">
                    <label for="id_email">Email address or user name*</label>
                    <input
                      id="id_email"
                      type="email"
                      name="email"
                      value=""
                      placeholder="Enter email address or user name"
                    />
                  </Box>
                  <Box className="feild mb-3">
                    <label for="id_password">Enter password*</label>
                    <input
                      id="id_password"
                      type="password"
                      name="password"
                      value=""
                      placeholder="Password"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          style={{
                            color: "#8055f0",
                          }}
                        />
                      }
                      label={
                        <Typography
                          style={{ color: "#bfbfbf", fontSize: "15px" }}
                        >
                          Remeber me
                        </Typography>
                      }
                    />
                    <Link href="#" underline="always" color="#bfbfbf">
                      {"Forget Password?"}
                    </Link>
                    <a href="#" className="link"></a>
                  </Box>

                  <Button variant="contained" className="login-btn mb-3">
                    Log In
                  </Button>

                  <p className="mb-3 text-center">
                    or log in with your Google email
                  </p>

                  <a href="#" className="mb-3 login-link">
                    <img
                      src="https://cdn-f.heylink.me/static/media/ic_google.f9a3cace.svg"
                      alt=""
                    />
                    Log in with <b>Google</b>
                  </a>

                  <a href="#" className="mb-3 login-link">
                    <img
                      src="https://cdn-f.heylink.me/static/media/ic_facebook.9b9eb9fd.svg"
                      alt=""
                    />
                    Log in with <b>Facebook</b>
                  </a>

                  <p className="text-center">
                    Don't have an account yet? <a href="#">Sign Up</a>
                  </p>
                </form> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default login;
