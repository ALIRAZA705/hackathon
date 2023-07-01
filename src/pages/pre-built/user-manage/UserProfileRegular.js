import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import { Modal, ModalBody, FormGroup } from "reactstrap";
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
  RSelect,
} from "../../../components/Component";
import { countryOptions, userData } from "./UserData";
import { getDateStructured } from "../../../utils/Utils";
import {useDispatch, useSelector} from "react-redux";
import {editRestaurant} from "../../../api/restaurant/restaurant";
import { Stack } from "@mui/material"
import Dropzone from "react-dropzone";


export const cuisineTypesDD = [
  { value: "Veg", label: "Veg" },
  { value: "Non-Veg", label: "Non-Veg" },
  { value: "Continental", label: "Continental" },
];

export const businessTypeDD = [
  { value: "Restaurant", label: "Restaurant" },
  { value: "Home Kitchen", label: "Home Kitchen" },
  { value: "Take Away", label: "Take Away" },
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
  const [files, setFiles] = useState([]);
  const [multipartData, setMultipartData] = useState(null);
  const user = useSelector(state => state.userInfo);

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    name: user.name,
    business_name: user.busines_business_name,
    business_description: user.busines_business_description,
    phone_number: user.phone,
    restaurant_address: user.busines_restaurant_address,
    business_type: user.busines_business_type,
    cuisine_type: user.busines_cuisine_types,
    starting_price: user.busines_starting_price,
    ordr_delivery_time: user.busines_ordr_delivery_time,
  });

  useEffect(() => {
    setProfileName(formData.name);
  }, [formData, setProfileName]);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitUpdateBusinessForm = async () => {
    let submitData = formData;
    submitData.id = user.busines_id;
    submitData.business_image = multipartData
    // const data = multipartData
    // Object.keys(submitData).forEach(i=>{
    //   data.append(i, submitData[i])
    // })
    console.log(submitData)
    const res = await editRestaurant(submitData);
    setUserInfo(submitData);
    setModal(false);
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
    // acceptedFiles.map(f=>{
    //   let data = new FormData();
    //   data.append('business_image', f)
    //   console.log(data)
    // })
    // console.log("data :::: ", data);
    setMultipartData(acceptedFiles[0])
    // extractBase64Images(acceptedFiles);
  };

  const submitForm = () => {
    let submitData = {
      ...formData,
    };
    setUserInfo(submitData);
    setModal(false);
  };

  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Restaurant Information</BlockTitle>
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
        <div className="nk-data data-list">
          <div className="data-head">
            <h6 className="overline-title">Business Info</h6>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
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
          <div className="data-item" onClick={() => setModal(true)}>
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
          <div className="data-item" onClick={() => setModal(true)}>
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
          <div className="data-item" onClick={() => setModal(true)}>
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
          <div className="data-item" onClick={() => setModal(true)}>
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
          <div className="data-item" onClick={() => setModal(true)}>
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
          <div className="data-item" onClick={() => setModal(true)}>
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
          <div className="data-item" onClick={() => setModal(true)}>
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
        <div className="nk-data data-list">
          <div className="data-head">
            <h6 className="overline-title">Ower Details</h6>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Owner Name</span>
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
              </li>
            </ul>
            <div className="tab-content">
              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                <Row className="gy-4">
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        className="form-control"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.first_name}
                        placeholder="Enter Full name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="display-name">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="display-name"
                        className="form-control"
                        name="displayName"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.last_name}
                        placeholder="Enter display name"
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
                        name="phone"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.phone_number}
                        placeholder="Phone Number"
                      />
                    </FormGroup>
                  </Col>
                  {/*<Col md="6">*/}
                  {/*  <FormGroup>*/}
                  {/*    <label className="form-label" htmlFor="birth-day">*/}
                  {/*      Date of Birth*/}
                  {/*    </label>*/}
                  {/*    <DatePicker*/}
                  {/*      selected={new Date(formData.dob)}*/}
                  {/*      className="form-control"*/}
                  {/*      onChange={(date) => setFormData({ ...formData, dob: getDateStructured(date) })}*/}
                  {/*      maxDate={new Date()}*/}
                  {/*    />*/}
                  {/*  </FormGroup>*/}
                  {/*</Col>*/}
                  {/*<Col size="12">*/}
                  {/*  <div className="custom-control custom-switch">*/}
                  {/*    <input type="checkbox" className="custom-control-input form-control" id="latest-sale" />*/}
                  {/*    <label className="custom-control-label" htmlFor="latest-sale">*/}
                  {/*      Use full name to display{" "}*/}
                  {/*    </label>*/}
                  {/*  </div>*/}
                  {/*</Col>*/}
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="lg"
                          onClick={(ev) => {
                            ev.preventDefault();
                            submitForm();
                          }}
                        >
                          Update
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
                  </Col>
                </Row>
              </div>
              <div className={`tab-pane ${modalTab === "2" ? "active" : ""}`} id="address">
                <Row className="gy-4">
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-l1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="address-l1"
                        name="address"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.business_name}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-l2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="address-l2"
                        name="address2"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.phone_number}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-l1">
                        Business Description
                      </label>
                      <input
                          type="text"
                          id="address-l1"
                          name="address"
                          onChange={(e) => onInputChange(e)}
                          defaultValue={formData.business_description}
                          className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Business Type
                      </label>
                      <RSelect
                          options={businessTypeDD}
                          placeholder="Select Business Type"
                          defaultValue={[
                            {
                              value: formData.country,
                              label: formData.country,
                            },
                          ]}
                          onChange={(e) => setFormData({ ...formData, business_type: e.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-county">
                        Cuisine Types
                      </label>
                      <RSelect
                        options={cuisineTypesDD}
                        placeholder="Select Cuisine Types"
                        defaultValue={[
                          {
                            value: formData.country,
                            label: formData.country,
                          },
                        ]}
                        onChange={(e) => setFormData({ ...formData, cuisine_type: e.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Starting Price
                      </label>
                      <input
                          type="text"
                          id="address-st"
                          name="state"
                          onChange={(e) => onInputChange(e)}
                          defaultValue={formData.starting_price}
                          className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Order Delivery Time
                      </label>
                      <RSelect
                          options={ordrDeliveryTimeDD}
                          placeholder="Select Delivery Time"
                          defaultValue={[
                            {
                              value: formData.country,
                              label: formData.country,
                            },
                          ]}
                          onChange={(e) => setFormData({ ...formData, ordr_delivery_time: e.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        Restaurant Address
                      </label>
                      <input
                          type="text"
                          id="address-st"
                          name="state"
                          onChange={(e) => onInputChange(e)}
                          defaultValue={formData.restaurant_address}
                          className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="lg" onClick={() => submitUpdateBusinessForm()}>
                          Update
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
            <h5 className="title">Update Picture</h5>

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
                {/*          defaultValue={formData.first_name}*/}
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
