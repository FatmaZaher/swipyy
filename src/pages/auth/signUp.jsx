import Reac, { useEffect } from "react";
import "../../assets/scss/index.scss";
import logo from "../../assets/images/logo.svg";
import shap1 from "../../assets/images/shap1.svg";
import shap2 from "../../assets/images/shap2.svg";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";

const SignUp = (props) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin); //get user info from store

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Enter Your Email*"),
    password: Yup.string().required("Enter Your password*"),
    name: Yup.string().required("Enter Your Name*"),
  });
  const onSubmit = (values) => {
    console.log(values);
    dispatch(register(values.name, values.email, values.password));
  };

  if (userSignin.userInfo) return <Redirect to="/" />;

  const checkboxOptions = [
    {
      key: "check1",
      value: "agreePolicy",
    },
  ];
  return (
    <div className="login-page">
      <div className="left-login-side">
        <img src={logo} alt="" className="logo" />
        <img src={shap1} alt="" className="shap1" />
        <img src={shap2} alt="" className="shap2" />
      </div>
      <div className="right-login-side">
        <div>
          <div className="logo-mobile">
            <img src={logo} alt="" className="logo" />
          </div>
          <div className="login-section">
            <h2 className="login-head">Sign up</h2>
            { error && <span>{error}</span>}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="login-form">
                  <FormikControl
                    control="input"
                    type="text"
                    name="name"
                    label="User Name*"
                    placeholder="user name"
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    label="Email address or user name**"
                    placeholder="Enter email address or user name"
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    label="Create password*"
                    placeholder="Password"
                    error="true"
                  />

                  <div className="remmeber-forget">
                    <FormikControl
                      control="checkbox"
                      label="I agree to the Terms of Service and Privacy Policy"
                      name="checkboxOption"
                      options={checkboxOptions}
                    />
                  </div>
                  <div className="login-btn my-3">
                    <button type="submit" disabled={!formik.isValid}>
                      Sign up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="other-login text-center">
              <p>or</p>
              <Link to="/" className="link other-link mb-3">
                <div className="img-link">
                  <img src={google} alt="" />
                </div>
                <span> Sign in with Google</span>
              </Link>
              <Link to="/" className="link other-link mb-3">
                <div className="img-link">
                  <img src={facebook} alt="" />
                </div>
                <span>Sign in with Facebook</span>
              </Link>
            </div>
            <div className="not-member text-center my-3">
              <p>
                Not a member?{" "}
                <Link to="/login" className="link sign-login">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
