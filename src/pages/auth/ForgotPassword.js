import React, {useState} from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {Alert, FormGroup} from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Link } from "react-router-dom";
import {postForgotPassword} from "../../api/auth/auth";

const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");

  const handleSetEmail = (e) =>{
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const res = await postForgotPassword({email: email})
    console.log("res ::: ",res)
    if(res.request.status === 200){
      setError("Email Sent");
    }
    else{
      let err= res.response.data.message? JSON.stringify(res.response.data.message) : "Something Went Wrong";
      setError(err);
    }
    setLoading(false)
    setTimeout(()=>{
      setError("")
    },[5000])
  }


  return (
    <React.Fragment>
      <Head title="Forgot-Password" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h5">Reset password</BlockTitle>
                <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <input
                  type="text"
                  name="email"
                  className="form-control form-control-lg"
                  id="default-01"
                  placeholder="Enter your email address"
                  onChange={handleSetEmail}
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary" size="lg" className="btn-block" onClick={handleSubmit}>
                  Send Reset Link
                </Button>
              </FormGroup>
            </form>
            {errorVal && (
                <div className="mb-3">
                  <Alert color={errorVal === "Email Sent"? "success" : "danger"} className="alert-icon">
                    {" "}
                    <Icon name="alert-circle" /> {errorVal}{" "}
                  </Alert>
                </div>
            )}
            <div className="form-note-s2 text-center pt-4">
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Return to login</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default ForgotPassword;
