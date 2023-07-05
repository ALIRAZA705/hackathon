import React, {useState} from "react";
import Head from "../../../layout/head/Head";
import {Alert, Card, Form, FormGroup, Modal, ModalBody, Spinner} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  InputSwitch,
  Button, PreviewCard,
} from "../../../components/Component";
import {Stack} from "@mui/material";
import Dropzone from "react-dropzone";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {getLoginUser, postChangePasswordReq} from "../../../api/auth/auth";

const UserProfileSettingPage = ({ sm, updateSm }) => {
  const { errors, register, handleSubmit } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [passState1, setPassState1] = useState(false);
  const [passState2, setPassState2] = useState(false);
  const [passState3, setPassState3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = async (formData) => {
    setLoading(true);
    const payload = {
      email: JSON.parse(localStorage.getItem("user")).email,
      old_password: formData.old_password,
      new_password: formData.new_password,
      confirm_password: formData.confirm_password
    }
    const res = await postChangePasswordReq(payload)
    console.log("res ::: ",res)
    if(res.request.status === 200){
      setError(res.data.message);
    }
    else{
      let err= res.response.data.message? JSON.stringify(res.response.data.message) : "Something Went Wrong";
      setError(err);
    }
    setLoading(false)
    setTimeout(()=>{
      setError("")
    },[5000])
  };



  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>

      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Security Settings</BlockTitle>
            <BlockDes>
              <p>These settings will help you to keep your account secure.</p>
            </BlockDes>
          </BlockHeadContent>
          <BlockHeadContent className="align-self-start d-lg-none">
            <Button
              className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
              onClick={() => updateSm(!sm)}
            >
              <Icon name="menu-alt-r"></Icon>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <Block>
        <Card className="card-bordered">
          <div className="card-inner-group">

            <div className="card-inner">
              <div className="between-center flex-wrap g-3">
                <div className="nk-block-text">
                  <h6>Change Password</h6>
                  <p>Set a unique password to protect your account.</p>
                </div>
                <div className="nk-block-actions flex-shrink-sm-0">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                    <li className="order-md-last">
                      <Button color="primary"
                      onClick={(e)=> {
                        e.preventDefault();
                        setModalOpen(true)
                      }}
                      >Change Password</Button>
                    </li>
                    <li>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </Card>
      </Block>

      <Modal isOpen={modalOpen} className="modal-dialog-centered" size="lg" toggle={() => {
        setModalOpen(false)
      }}>
        <ModalBody>
          <a
              href="#dropdownitem"
              onClick={(ev) => {
                ev.preventDefault();
                setModalOpen(false);
              }}
              className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Change Password</h5>

            <div className="tab-content">
              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="password">
                      Old Password
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <a
                        href="#password"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setPassState1(!passState1);
                        }}
                        className={`form-icon lg form-icon-right passcode-switch ${passState1 ? "is-hidden" : "is-shown"}`}
                    >
                      <Icon name="eye" className="passcode-icon icon-show"></Icon>

                      <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                    </a>
                    <input
                        type={passState1 ? "text" : "password"}
                        id="old-password"
                        name="old_password"
                        defaultValue=""
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter your old passcode"
                        className={`form-control-lg form-control ${passState1 ? "is-hidden" : "is-shown"}`}
                    />
                    {errors.old_password && <span className="invalid">{errors.old_password.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="password">
                      New Password
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <a
                        href="#password"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setPassState2(!passState2);
                        }}
                        className={`form-icon lg form-icon-right passcode-switch ${passState2 ? "is-hidden" : "is-shown"}`}
                    >
                      <Icon name="eye" className="passcode-icon icon-show"></Icon>

                      <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                    </a>
                    <input
                        type={passState2 ? "text" : "password"}
                        id="new-password"
                        name="new_password"
                        defaultValue=""
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter your new passcode"
                        className={`form-control-lg form-control ${passState2 ? "is-hidden" : "is-shown"}`}
                    />
                    {errors.new_password && <span className="invalid">{errors.new_password.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="password">
                      Confirm Password
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <a
                        href="#password"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setPassState3(!passState3);
                        }}
                        className={`form-icon lg form-icon-right passcode-switch ${passState3 ? "is-hidden" : "is-shown"}`}
                    >
                      <Icon name="eye" className="passcode-icon icon-show"></Icon>

                      <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                    </a>
                    <input
                        type={passState3 ? "text" : "password"}
                        id="confirm-password"
                        name="confirm_password"
                        defaultValue=""
                        ref={register({ required: "This field is required" })}
                        placeholder="Confirm your new passcode"
                        className={`form-control-lg form-control ${passState3 ? "is-hidden" : "is-shown"}`}
                    />
                    {errors.confirm_password && <span className="invalid">{errors.confirm_password.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button size="lg" className="btn-block" type="submit" color="primary">
                    {loading ? <Spinner size="sm" color="light" /> : "Update"}
                  </Button>
                </FormGroup>
              </Form>
              {errorVal && (
                  <div className="mb-3">
                    <Alert color={errorVal === "Your password has been updated."? "success" : "danger"} className="alert-icon">
                      {" "}
                      <Icon name="alert-circle" /> {errorVal}{" "}
                    </Alert>
                  </div>
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default UserProfileSettingPage;
