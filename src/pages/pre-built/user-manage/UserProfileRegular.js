import React, {useEffect, useMemo, useState} from "react";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import {Modal, ModalBody, FormGroup, Spinner, Alert} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
  RSelect, PreviewCard,
} from "../../../components/Component";
import { countryOptions, userData } from "./UserData";
import { getDateStructured } from "../../../utils/Utils";
import {useDispatch, useSelector} from "react-redux";
import {editRestaurant} from "../../../api/restaurant/restaurant";
import { Stack } from "@mui/material"
import Dropzone from "react-dropzone";
import {postEditUserProfile} from "../../../api/auth/auth";
import {setBusiness, setUser} from "../../../store/state/userInfo";
import {getCuisineList} from "../../../api/misc/misc";


// export const cuisineTypesDD = cuisineDropdown.map(
//     (i)=>{
//       list.push(
//           {value: i.cuisine_name, label: i.cuisine_name, id: i.id}
//       )
//     }
// )

//     [
//   { value: "Veg", label: "Veg" },
//   { value: "Non-Veg", label: "Non-Veg" },
//   { value: "Continental", label: "Continental" },
// ];

export const businessTypeDD = [
  { value: "Restaurant", label: "Restaurant" },
  { value: "Home Kitchen", label: "Home Kitchen" },
  { value: "Take Away", label: "Take Away" },
];

export const businessTypeDD1 = [
  { value: "Customer", label: "customer" },
  { value: "Edge", label: "edge" }
];

export const ordrDeliveryTimeDD = [
  { value: "10-15 min", label: "10-15 min" },
  { value: "15-30 min", label: "15-30 min" },
  { value: "30-45 min", label: "30-45 min" },
];

const UserProfileRegularPage = ({ changePhotoModal, handleChangePhotoModal, sm, updateSm, setProfileName }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalTab, setModalTab] = useState("1");
  const [userInfo, setUserInfo] = useState(userData[0]);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [cuisineDropdown, setCuisineDropdown] = useState([]);
  const [files, setFiles] = useState([]);
  const [apiStatus, setApiStatus] = useState('success');
  const [multipartData, setMultipartData] = useState(null);
  const [multipartUserProfileData, setMultipartUserProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");
  const user = useSelector(state => state.userInfo);

// console.log("useuseruseruserr", user)
  const [formData, setFormData] = useState({
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    domainName: user.domainName,
    name: user.name,
    business_name: user.busines_business_name,
    business_description: user.busines_business_description,
    phone_number: user.phone,
    address: user.address,
    business_type: user.busines_business_type,
    cuisine_type: user.busines_cuisine_types,
    starting_price: user.busines_starting_price,
    ordr_delivery_time: user.busines_ordr_delivery_time,
  });

  useEffect(() => {
    setProfileName(formData.name);
  }, [formData, setProfileName]);

  const localStorageUser = useMemo(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    return user;
  },[dispatch])


  useEffect(()=>{
    let user = localStorageUser;
    dispatch(setUser(user));
    if(user.busines){
      dispatch(setBusiness(user.busines));
      const entries = Object.entries(user.busines);
      for (const [key, value] of entries) {
        user[key] = value;
      }
    }
    delete user.busines
    setFormData(user)
  },[updatedUser])

  const cuisineList = useMemo(()=>{
    if(localStorage.getItem("cuisineList")){
      console.log("asddddddddddd", localStorage.getItem("cuisineList"))
      return JSON.parse(localStorage.getItem("cuisineList")).data;
    }
    else{
      return null;
    }
  },[])


  useEffect(async()=>{
    console.log("asdddddddddddddvsdasv", cuisineList, !cuisineList)
    if(!cuisineList){
      const res = await getCuisineList()
      if(res.status === 200){
        localStorage.setItem("cuisineList", JSON.stringify(res.data.records))
        setCuisineDropdown(res.data.records.data);
      }
      else  setCuisineDropdown([])
    }
    else{
      setCuisineDropdown(cuisineList)
    }
  },[cuisineList])

  const onInputChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitUserProfileForm = async () => {
    setLoading(true);
    let submitData = {
      firstName : formData.firstName,
      userName : formData.userName,
      lastName : formData.lastName,
      email : user.email,
      phone_number: formData.phone_number,
      profile_image : multipartUserProfileData,
    };
    Object.keys(submitData).forEach(
        (key) => (submitData[key] === null) && delete submitData[key]);
    const res = await postEditUserProfile(submitData);
    setError(res.response?.data?.message? res.response.data.message : res.data.message)
    setLoading(false);
    if(res.status === 200){
      setApiStatus('success')
      let loggedInUser = localStorage.getItem('user');
      loggedInUser = JSON.parse(loggedInUser);
      loggedInUser = Object.assign(loggedInUser, submitData)
      if(submitData.profile_image){
        loggedInUser.profile_image = submitData.profile_image.preview;
      }
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      // setUpdatedUser(loggedInUser)
      setTimeout(()=>{
        setModal(false);
        setError("")
        window.location.reload(true);
      },[5000])
    }
    else{
      setApiStatus('danger')
      setTimeout(()=>{
        setError("")
        setApiStatus('success')
      },[2000])
    }

  }

  const submitUpdateBusinessForm = async () => {
    setLoading(true);
    let submitData = {
      business_name: formData.business_name,
      business_type: formData.business_type,
      cuisine_id: function(){
        return cuisineDropdown.filter((i)=>{
              if(i.cuisine_name === formData.cuisine_type){
                return i.id;
              }
            }
        )
      }()[0].id,
      cuisine_type: formData.cuisine_type,
      ordr_delivery_time: formData.ordr_delivery_time,
      restaurant_address: formData.restaurant_address,
      starting_price: formData.starting_price,
      user_id: user.user_id,
      business_description : formData.business_description,
      id : user.busines_id,
      business_image : multipartData,
    };
    Object.keys(submitData).forEach(
        (key) => (submitData[key] === null) && delete submitData[key]);
    const res = await editRestaurant(submitData);
    setError(res.response?.data?.message? res.response.data.message : res.data.message)
    setLoading(false);
    console.log(res)
    if(res.status === 200 && res.data.success == true){
      setApiStatus('success')
      let loggedInUser = localStorage.getItem('user');
      loggedInUser = JSON.parse(loggedInUser);
      let buz = Object.assign(loggedInUser.busines, submitData);
      delete loggedInUser.busines;
      loggedInUser.busines = buz;
      if(submitData.business_image){
        loggedInUser.busines.business_image = submitData.business_image.preview;
      }
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUpdatedUser(loggedInUser)
      setTimeout(()=>{
        setModal(false);
        setError("")
      },[5000])
    }
    else {
      setApiStatus('danger')
      setTimeout(() => {
        setError("")
        setApiStatus('success')
      }, [2000])

    }
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    setFiles(
        acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
        )
    );
    setMultipartData(acceptedFiles[0])
  };

  const handleProfilePicChange = (acceptedProfilePic) => {
    setFiles(
        acceptedProfilePic.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
        )
    );
    setMultipartUserProfileData(acceptedProfilePic[0])
  };

  const submitForm = () => {
    let submitData = {
      ...formData,
    };
    setUserInfo(submitData);
    setModal(false);
  };

  const cuisineTypesDD = useMemo(()=>{
    console.log(cuisineDropdown)
    let list = [];
    cuisineDropdown.map(
        (i)=>{
          list.push(
              {value: i.cuisine_name, label: i.cuisine_name, id: i.id}
          )
        }
    )
    return list;
  },[cuisineDropdown])


  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">
              {
                user.role === "super-admin" ? "Admin Information" : "Restaurant Information"
              }
            </BlockTitle>
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
          { (user.role == "admin") &&
              <div className="nk-data data-list">
                  <div className="data-head">
                      <h6 className="overline-title">Business Info</h6>
                  </div>
                  <div className="data-item" onClick={() => {
                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Business Name</span>
                          <span className="data-value">{user.busines_business_name}</span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item">
                      <div className="data-col">
                          <span className="data-label">Email</span>
                          <span className="data-value">{user.email}</span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more disable">
                <Icon name="lock-alt"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item" onClick={() => {

                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Phone Number</span>
                          <span className="data-value text-soft">{user.phone}</span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item" onClick={() => {
                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Business Description</span>
                          <span className="data-value">
                {user.busines_business_description}
              </span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item" onClick={() => {
                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Business Type</span>
                          <span className="data-value">
                {user.busines_business_type}
              </span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item" onClick={() => {
                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Cuisine Types</span>
                          <span className="data-value">
                {user.busines_cuisine_types}
              </span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item" onClick={() => {
                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Starting Price</span>
                          <span className="data-value">
                {user.busines_starting_price}
              </span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item" onClick={() => {
                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Order Delivery Time</span>
                          <span className="data-value">
                {user.busines_ordr_delivery_time}
              </span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
                  <div className="data-item" onClick={() => {
                    setModal(true)
                    setModalTab("2")
                  }}>
                      <div className="data-col">
                          <span className="data-label">Restaurant Address</span>
                          <span className="data-value">
                {user.busines_restaurant_address}
              </span>
                      </div>
                      <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
                      </div>
                  </div>
              </div>
          }

        <div className="nk-data data-list">
          <div className="data-head">
            <h6 className="overline-title">{user.role === "admin"? "Ower Details" : "Personal Details"}</h6>
          </div>
          <div className="data-item" onClick={() => {
            setModal(true)
            setModalTab("1")
          }}>
            <div className="data-col">
              <span className="data-label">{user.role === "admin"? "Owner Name" : "Full Name"}</span>
              <span className="data-value">{user.name}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item">
            <div className="data-col">
              <span className="data-label">Email</span>
              <span className="data-value">{user.email}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more disable">
                <Icon name="lock-alt"></Icon>
              </span>
            </div>
          </div>
        </div>
      </Block>

      <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update Information</h5>
            <ul className="nk-nav nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${modalTab === "1" && "active"}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModalTab("1");
                  }}
                  href="#personal"
                >
                  Personal
                </a>
              </li>
              {/* {user.role !== "super-admin" &&
                <li className="nav-item">
                <a
                    className={`nav-link ${modalTab === "2" && "active"}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      setModalTab("2");
                    }}
                    href="#address"
                >
                  Business
                </a>
              </li>} */}
            </ul>
            <div className="tab-content">
              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="address">
                <Row className="gy-4">
                <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                      User Name
                      </label>
                      <input
                        type="text"
                        id="first_name_profile"
                        className="form-control"
                        name="userName"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.userName}
                        placeholder="Enter Full name"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name_profile"
                        className="form-control"
                        name="firstName"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.firstName}
                        placeholder="Enter Full name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="first_name_profile"
                        className="form-control"
                        name="lastName"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.lastName}
                        placeholder="Enter Full name"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="phone-no">
                      Email
                      </label>
                      <input
                        type="number"
                        id="phone-no"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="phone-no">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone-no"
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Domain Name
                      </label>
                      <RSelect
                          options={businessTypeDD}
                          placeholder="Select Business Type"
                          defaultValue={[
                            {
                              value: formData.domainName,
                              label: formData.domainName,
                            },
                          ]}
                          onChange={(e) => setFormData({ ...formData, business_type: e.value })}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                   Type
                      </label>
                      <RSelect
                          options={businessTypeDD1}
                          placeholder="Select Business Type"
                          defaultValue={[
                            {
                              value: formData.domainName,
                              label: formData.domainName,
                            },
                          ]}
                          onChange={(e) => setFormData({ ...formData, business_type: e.value })}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-county">
                        Cuisine Types
                      </label>
                      <RSelect
                        options={cuisineTypesDD}
                        placeholder="Select Cuisine Types"
                        defaultValue={[
                          {
                            value: formData.cuisine_type,
                            label: formData.cuisine_type,
                          },
                        ]}
                        onChange={(e) => setFormData({ ...formData, cuisine_type: e.value })}
                      />
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Starting Price
                      </label>
                      <input
                          type="text"
                          id="address-st"
                          name="starting_price"
                          onChange={(e) => onInputChange(e)}
                          defaultValue={formData.starting_price}
                          className="form-control"
                      />
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Order Delivery Time
                      </label>
                      <RSelect
                          options={ordrDeliveryTimeDD}
                          placeholder="Select Delivery Time"
                          defaultValue={[
                            {
                              value: formData.ordr_delivery_time,
                              label: formData.ordr_delivery_time,
                            },
                          ]}
                          onChange={(e) => setFormData({ ...formData, ordr_delivery_time: e.value })}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                       Address
                      </label>
                      <input
                          type="text"
                          id="address-st"
                          name="restaurant_address"
                          onChange={(e) => onInputChange(e)}
                          defaultValue={formData?.address}
                          className="form-control"
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="lg" onClick={() => submitUpdateBusinessForm()}>
                          {loading ? <Spinner size="sm" color="light" /> : "Update"}
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                    {errorVal && (
                        <div className="mb-3">
                          <Alert color={apiStatus} className="alert-icon">
                            {" "}
                            <Icon name="alert-circle" /> {errorVal}{" "}
                          </Alert>
                        </div>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>


      <Modal isOpen={changePhotoModal} className="modal-dialog-centered" size="lg" toggle={() => {
        handleChangePhotoModal(false)
        setModal(false)
      }}>
        <ModalBody>
          <a
              href="#dropdownitem"
              onClick={(ev) => {
                ev.preventDefault();
                handleChangePhotoModal(false)
                setModal(false);
              }}
              className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update User Profile</h5>

            <div className="tab-content">
              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                {/*<Row className="gy-4">*/}
                {/*  <Col md="6">*/}
                {/*    <FormGroup>*/}
                {/*      <label className="form-label" htmlFor="full-name">*/}
                {/*        First Name*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*          type="text"*/}
                {/*          id="full-name"*/}
                {/*          className="form-control"*/}
                {/*          name="name"*/}
                {/*          onChange={(e) => onInputChange(e)}*/}
                {/*          defaultValue={formData.firstName}*/}
                {/*          placeholder="Enter Full name"*/}
                {/*      />*/}
                {/*    </FormGroup>*/}
                {/*  </Col>*/}
                {/*  <Col md="6">*/}
                {/*    <FormGroup>*/}
                {/*      <label className="form-label" htmlFor="display-name">*/}
                {/*        Last Name*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*          type="text"*/}
                {/*          id="display-name"*/}
                {/*          className="form-control"*/}
                {/*          name="displayName"*/}
                {/*          onChange={(e) => onInputChange(e)}*/}
                {/*          defaultValue={formData.last_name}*/}
                {/*          placeholder="Enter display name"*/}
                {/*      />*/}
                {/*    </FormGroup>*/}
                {/*  </Col>*/}
                {/*  <Col md="6">*/}
                {/*    <FormGroup>*/}
                {/*      <label className="form-label" htmlFor="phone-no">*/}
                {/*        Phone Number*/}
                {/*      </label>*/}
                {/*      <input*/}
                {/*          type="number"*/}
                {/*          id="phone-no"*/}
                {/*          className="form-control"*/}
                {/*          name="phone"*/}
                {/*          onChange={(e) => onInputChange(e)}*/}
                {/*          defaultValue={formData.phone_number}*/}
                {/*          placeholder="Phone Number"*/}
                {/*      />*/}
                {/*    </FormGroup>*/}
                {/*  </Col>*/}
                {/*  /!*<Col md="6">*!/*/}
                {/*  /!*  <FormGroup>*!/*/}
                {/*  /!*    <label className="form-label" htmlFor="birth-day">*!/*/}
                {/*  /!*      Date of Birth*!/*/}
                {/*  /!*    </label>*!/*/}
                {/*  /!*    <DatePicker*!/*/}
                {/*  /!*      selected={new Date(formData.dob)}*!/*/}
                {/*  /!*      className="form-control"*!/*/}
                {/*  /!*      onChange={(date) => setFormData({ ...formData, dob: getDateStructured(date) })}*!/*/}
                {/*  /!*      maxDate={new Date()}*!/*/}
                {/*  /!*    />*!/*/}
                {/*  /!*  </FormGroup>*!/*/}
                {/*  /!*</Col>*!/*/}
                {/*  /!*<Col size="12">*!/*/}
                {/*  /!*  <div className="custom-control custom-switch">*!/*/}
                {/*  /!*    <input type="checkbox" className="custom-control-input form-control" id="latest-sale" />*!/*/}
                {/*  /!*    <label className="custom-control-label" htmlFor="latest-sale">*!/*/}
                {/*  /!*      Use full name to display{" "}*!/*/}
                {/*  /!*    </label>*!/*/}
                {/*  /!*  </div>*!/*/}
                {/*  /!*</Col>*!/*/}
                {/*  <Col size="12">*/}
                {/*    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">*/}
                {/*      <li>*/}
                {/*        <Button*/}
                {/*            color="primary"*/}
                {/*            size="lg"*/}
                {/*            onClick={(ev) => {*/}
                {/*              ev.preventDefault();*/}
                {/*              submitForm();*/}
                {/*            }}*/}
                {/*        >*/}
                {/*          Update*/}
                {/*        </Button>*/}
                {/*      </li>*/}
                {/*      <li>*/}
                {/*        <a*/}
                {/*            href="#dropdownitem"*/}
                {/*            onClick={(ev) => {*/}
                {/*              ev.preventDefault();*/}
                {/*              setModal(false);*/}
                {/*            }}*/}
                {/*            className="link link-light"*/}
                {/*        >*/}
                {/*          Cancel*/}
                {/*        </a>*/}
                {/*      </li>*/}
                {/*    </ul>*/}
                {/*  </Col>*/}
                {/*</Row>*/}
                <Stack direction="row" sx={{
                  overflowX: "auto",
                  flexShrink: "0"
                }}>
                  <Dropzone
                      multiple={false}
                      onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                          >
                            <input {...getInputProps()} />
                            {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                            {files.map((file) => (
                                <div
                                    key={file.name}
                                    className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <Stack direction="row">
                                    {/*<div className="dz-image">*/}
                                    <img height="100px" src={file.preview} alt="preview" />
                                    {/*</div>*/}
                                  </Stack>

                                </div>
                            ))}
                          </div>
                        </section>
                    )}
                  </Dropzone>
                </Stack>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default UserProfileRegularPage;
