import React, { useState } from "react";
import "./register.css";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
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
import {Spinner, FormGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {postRegisterUser} from "../../api/auth/auth";

const Register = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [businessType, setBusinessType] = useState('None');
  const [cuisineType, setCuisineType] = useState('None');
  const { errors, register, handleSubmit } = useForm();
  const [errorVal, setError] = useState("");

  const handleFormSubmit = async (data) => {
    data['business-type'] = businessType;
    data['cuisine-type'] = cuisineType;
    const payload = {
      first_name: data['first-name'],
      last_name: data['last-name'],
      email: data['email'],
      business_name: data['business-name'],
      business_type: data['business-type'],
      cuisine_types: [data['cuisine-types']],
      location: data['restaurant-address'],
      password: data['passcode'],
      confirm_password: data['passcode'],
      phone: data['contact-number'],
      own_riders: 'no'
    }
    console.log(payload)
    const res = await postRegisterUser(payload);
    setLoading(true);
    console.log("res :: ", res.request.status, res.response)
    if(res.request.status !== 201) {
      let err= res.response.data.error? JSON.stringify(res.response.data.error) : "Error Register with these credentials";
      setError(err);
      setLoading(false);
      setTimeout(()=>{
        setError("")
      },[5000])
    }
    else if(res.request.status === 500) {
      setError("Something went wrong: Internal Server Error");
      setLoading(false);
      setTimeout(()=>{
        setError("")
      },[5000])
    }
    else{
      localStorage.setItem("accessToken", "token");
      history.push(`/auth-login`)
    }
    // setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-success`), 2000);
  };
  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create A New Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Business Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="business-name"
                    name="business-name"
                    placeholder="Enter your Business Name"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Business Type
                </label>
                <div>
                  <UncontrolledDropdown>
                    <div className="btn-group">
                      <DropdownToggle className="dropdown-toggle-split flex-row" color="secondary">
                        {businessType}
                        <Icon name="chevron-down"></Icon>
                      </DropdownToggle>
                    </div>
                    <DropdownMenu>
                      <ul className="link-list-opt">
                        <li>
                          <DropdownItem tag="a" href="#links" onClick={(ev) => {
                            ev.preventDefault()
                            setBusinessType('Restaurant')
                          }}>
                            <span>Restaurant</span>
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem tag="a" href="#links" onClick={(ev) => {
                            ev.preventDefault()
                            setBusinessType('Home Kitchen')
                          }}>
                            <span>Home Kitchen</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  First Name
                </label>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      placeholder="Enter your First Name"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Last Name
                </label>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      placeholder="Enter your  Last Name"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Contact Number
                </label>
                <div className="form-control-wrap">
                  <input
                      type="number"
                      id="contact-number"
                      name="contact-number"
                      placeholder="Enter your Contact Number"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bsSize="lg"
                    id="default-01"
                    name="email"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
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
                      ref={register({ required: "This field is required" })}
                      placeholder="Enter your passcode"
                      className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Restaurant Address
                </label>
                <div className="form-control-wrap">
                  <input
                      type="text"
                      id="restaurant-address"
                      name="restaurant-address"
                      placeholder="Enter your Restaurant Address"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Cuisine Types
                </label>
                <div>
                  <UncontrolledDropdown>
                    <div className="btn-group">
                      <DropdownToggle className="dropdown-toggle-split flex-row" color="secondary">
                          {cuisineType}
                          <Icon name="chevron-down"></Icon>
                       </DropdownToggle>
                    </div>
                    <DropdownMenu>
                      <ul className="link-list-opt">
                        <li>
                          <DropdownItem tag="a" href="#links" onClick={(ev) => {
                            ev.preventDefault()
                            setCuisineType('Veg')
                          }}>
                            <span>Veg</span>
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem tag="a" href="#links" onClick={(ev) => {
                            ev.preventDefault()
                            setCuisineType('Non-Veg')
                          }}>
                            <span>Non-Veg</span>
                          </DropdownItem>
                        </li>
                        <li>
                          <DropdownItem tag="a" href="#links" onClick={(ev) => {
                            ev.preventDefault()
                            setCuisineType('Continental')
                          }}>
                            <span>Continental</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </FormGroup>

            </form>
            {errorVal && (
                <div className="mb-3">
                  <Alert color="danger" className="alert-icon">
                    {" "}
                    <Icon name="alert-circle" /> {errorVal}
                  </Alert>
                </div>
            )}
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-8">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
