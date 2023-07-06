import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import UserProfileRegularPage from "./UserProfileRegular";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import { Route, Switch, Link } from "react-router-dom";
import {Col, Icon, UserAvatar} from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {setBusiness, setUser} from "../../../store/state/userInfo";
import {Box, Stack} from "@mui/material";
import Dropzone from "react-dropzone";
import {IMG_STORAGE_BASE_URL} from "../../../config";

const UserProfileLayout = () => {
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const user = useSelector(state => state.userInfo)
  const [profileName, setProfileName] = useState(user.name);
  const [changePhotoModal, setChangePhotoModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    dispatch(setUser(user));
    if(user.busines){
      dispatch(setBusiness(user.busines));
    }
  },[user])


  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  const handleChangePhotoModal = (val) =>{
    setChangePhotoModal(val);
  }

  return (
    <React.Fragment>
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <div className="card-inner-group">
                <div className="card-inner">
                  <div className="user-card">
                    {/*<UserAvatar text={findUpper(profileName)} theme="primary" />*/}
                    <Box component="img"
                         src={user.profile_picture}
                         sx={{
                           borderRadius: "50%",
                           marginRight: "1rem",
                           width: "50px",
                           height: "50px"
                         }}
                    ></Box>
                    <div className="user-info">
                      <span className="lead-text">{user.busines_business_name? user.busines_business_name : profileName}</span>
                      <span className="sub-text">{user.email}</span>
                    </div>
                    <div className="user-action">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon btn-trigger mr-n2">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  setChangePhotoModal(true)
                                }}
                              >
                                <Icon name="camera-fill"></Icon>
                                <span>Change Photo</span>
                              </DropdownItem>
                            </li>
                            {/*<li>*/}
                            {/*  <DropdownItem*/}
                            {/*    tag="a"*/}
                            {/*    href="#dropdownitem"*/}
                            {/*    onClick={(ev) => {*/}
                            {/*      ev.preventDefault();*/}
                            {/*    }}*/}
                            {/*  >*/}
                            {/*    <Icon name="edit-fill"></Icon>*/}
                            {/*    <span>Update Profile</span>*/}
                            {/*  </DropdownItem>*/}
                            {/*</li>*/}
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
                {/*<div className="card-inner">*/}
                {/*  <div className="user-account-info py-0">*/}
                {/*    <h6 className="overline-title-alt">Nio Wallet Account</h6>*/}
                {/*    <div className="user-balance">*/}
                {/*      12.395769 <small className="currency currency-btc">BTC</small>*/}
                {/*    </div>*/}
                {/*    <div className="user-balance-sub">*/}
                {/*      Locked{" "}*/}
                {/*      <span>*/}
                {/*        0.344939 <span className="currency currency-btc">BTC</span>*/}
                {/*      </span>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="card-inner p-0">
                  <ul className="link-list-menu">
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-regular`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-regular` ? "active" : ""
                        }
                      >
                        <Icon name="user-fill-c"></Icon>
                        <span>Personal Information</span>
                      </Link>
                    </li>
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-setting`}
                        className={
                          window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-setting` ? "active" : ""
                        }
                      >
                        <Icon name="lock-alt-fill"></Icon>
                        <span>Security Setting</span>
                      </Link>
                    </li>
                    {
                      user.role === "admin" &&
                      <li>
                        <Link
                            to={"#"}
                            className={
                              window.location.pathname === `${process.env.PUBLIC_URL}/business-image` ? "active" : ""
                            }
                        >
                          <Icon name="card-view"></Icon>
                          <span>Business Image</span>
                        </Link>
                      </li>
                    }
                    {
                      user.role === "admin" &&
                      <Stack sx={{
                        width: "100%",
                        margin: "auto",
                        textAlign: "center",
                        justifyContent: "center"
                      }}>
                        <Box component="img" src={IMG_STORAGE_BASE_URL + user.busines_business_image}
                             sx={{
                               border: "1px solid none",
                               borderRadius: "10px",
                               width: "70%",
                               height: "200px",
                               margin: "auto",
                             }}>
                        </Box>

                      </Stack>
                    }





                  </ul>
                </div>
              </div>
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-regular`}
                  render={() => <UserProfileRegularPage changePhotoModal={changePhotoModal} handleChangePhotoModal={handleChangePhotoModal} updateSm={updateSm} sm={sm} setProfileName={setProfileName} />}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-notification`}
                  render={() => <UserProfileNotificationPage updateSm={updateSm} sm={sm} />}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-activity`}
                  render={() => <UserProfileActivityPage updateSm={updateSm} sm={sm} />}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-setting`}
                  render={() => <UserProfileSettingPage updateSm={updateSm} sm={sm} />}
                ></Route>
              </Switch>
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default UserProfileLayout;
