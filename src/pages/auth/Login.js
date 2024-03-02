import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import {Link, Redirect} from "react-router-dom";
import {getLoginUser} from "../../api/auth/auth";
import { useHistory } from "react-router-dom";
import EdgeIcon from "../../assets/images/edgeIcon";

let user = {};

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const handleRedirect = (user) => {
    // if(user.user_login_status === "super-admin"){
    //   console.log("super")
      window.location.href = '/admin/dashboard';
    // }
    // else if(user.user_login_status === "admin"){
      // window.location.href = `/admin/restaurant/${user.busines.id}/menu`;
    // }
    // else{
    //   setError("Wrong Email / Not an Admin");
    //   setLoading(false);
    //   setTimeout(()=>{
    //     setError("")
    //   },[5000])
    // }
    // history.push(`/dashboard`);
  }

  const onFormSubmit = async (formData) => {
    const payload = {
      userName: formData.userName,
      password: formData.passcode
    }
    setLoading(true);
    const res = await getLoginUser(payload);
    console.log("res :: ", res.request.status, res)
    if(res.request.status !== 200) {
      let err= res.response.data.error? JSON.stringify(res.response.data.error) : "Cannot login with credentials";
      setError(err);
      setLoading(false);
      setTimeout(()=>{
        setError("")
      },[5000])
    }
    else{
      // user = res.data.records;
      // if(user.userName === "admin@affinity.com" || user.userName === "test2@mail.com"){
      //   user.user_login_status = "super-admin"
      // }
      console.log("ddddddddddddddddddd",res)
        localStorage.setItem("accessToken", res?.data?.credentials?.token);
        localStorage.setItem("user", JSON.stringify( res?.data?.user));
        // setTimeout(()=>{
            handleRedirect(user);
        // },[200000])
    }

  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <EdgeIcon />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Here is login</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {errorVal}{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="userName"
                    ref={register({ required: "This field is required" })}
                    defaultValue="superadmin@gmail.com"
                    // defaultValue=""
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  {/* <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link> */}
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    defaultValue="12345678@w"
                    // defaultValue=""
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </FormGroup>
            </Form>
          </PreviewCard>
        </Block>
        {/* <AuthFooter /> */}
      </PageContainer>
    </React.Fragment>
  );
};
export default withRouter(Login);
