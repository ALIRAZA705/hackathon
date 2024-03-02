import React, {useEffect, useState} from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import {useDispatch, useSelector} from "react-redux";
import {setBusiness, setUser} from "../../../../store/state/userInfo";
import {Box} from "@mui/material";

const User = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const user = useSelector(state => state.userInfo)



  useEffect(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    dispatch(setUser(user));
    if(user.busines){
      dispatch(setBusiness(user.busines));
    }
  },[user])

  const handleSignout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
          <Box component="img"
               src={user.profile_picture}
               sx={{
                   borderRadius: "50%",
                   // marginRight: "1rem",
                   width: "40px",
                   height: "40px"
               }}
          ></Box>
        {/*<UserAvatar icon="user-alt" className="sm" />*/}

      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            {/*<div className="user-avatar">*/}
              {/*<span>AB</span>*/}
                <Box component="img"
                     src={user.profile_picture}
                     sx={{
                       borderRadius: "50%",
                       marginRight: "1rem",
                       width: "50px",
                         height: "50px"
                     }}
                ></Box>
            {/*</div>*/}
            <div className="user-info">
              <span className="lead-text">{user?.firstName}</span>
              <span className="sub-text">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            {/*<LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>*/}
            {/*  Login Activity*/}
            {/*</LinkItem>*/}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
