import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
// import { orderData, filterCoin, filterPaymentmethod, filterStatus, filterType } from "./OrderData";
import Orders from "./Orders";
import { FormGroup, Modal, ModalBody } from "reactstrap";
import {getOrdersByRestId} from "../../api/order/order";
import {
    Block,
    BlockHead,
    BlockTitle,
    BlockBetween,
    BlockHeadContent,
    BlockDes,
    Icon,
    Row,
    Col,
    Button,
    DataTableHead,
    DataTableBody,
    DataTableRow,
    DataTableItem,
    PaginationComponent, PreviewCard, RSelect,
  } from "../../components/Component";
import { useSelector } from "react-redux";
import { businessTypeDD } from "../pre-built/user-manage/UserProfileRegular";
import { Stack } from "@mui/material";
import Dropzone from "react-dropzone";


const PreparingOrders = () => {
    const [data, setData] = useState([]);
    const [modalTab, setModalTab] = useState("1");
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.userInfo);
    const [loading, setLoading] = useState(false);
    const [errorVal, setError] = useState("");
    const [files, setFiles] = useState([]);
    const handleAddUser = () => {
        setModal(true);
        // history.push(`${process.env.PUBLIC_URL}/restaurant/${params.id}/menu/add`)
      }

      const [formData, setFormData] = useState({
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

    // fetch data from API
    useEffect(async()=>{
        const res = await getOrdersByRestId();
        console.log("res ordersss : ", res?.data?.records)
        if(res?.status === 200){
            let preparing = res?.data?.records.filter(r=>r.order_status === "Preparing")
            setData(preparing)
        }
        else
            setData([])
    },[])

    return (
        <React.Fragment>
            <Head title="Preparing Order"></Head>
            <BlockHead size="sm">
                <BlockBetween>
                  <BlockHeadContent>
                    {/* <BlockTitle>{`${selectedRestaurant.business_name}'s Menu`}</BlockTitle> */}
                  </BlockHeadContent>
                  <BlockHeadContent>
                    <div className="toggle-wrap nk-block-tools-toggle">
                      <a
                          href="#more"
                          className="btn btn-icon btn-trigger toggle-expand mr-n1"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setSmOption(!smOption);
                          }}
                      >
                        <Icon name="more-v"></Icon>
                      </a>
                      <div className="toggle-expand-content" style={{display:"block"}}>
                        <ul className="nk-block-tools g-3">
                          <li>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-right">
                                <Icon name="search"></Icon>
                              </div>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="default-04"
                                  placeholder="Quick search by SKU"
                                  onChange={(e) => onFilterChange(e)}
                              />
                            </div>
                          </li>
                          {
                            // user.role !== "super-admin" &&
                            <li className="nk-block-tools-opt">
                              <Button
                                  className="toggle btn-icon d-md-none"
                                  color="primary"
                                  onClick={() => {
                                    toggle("add");
                                  }}
                              >
                                <Icon name="plus"></Icon>
                              </Button>
                              <Button
                                  className="toggle d-none d-md-inline-flex"
                                  color="primary"
                                  onClick={handleAddUser}
                              >
                                <Icon name="plus"></Icon>
                                <span>Add Users</span>
                              </Button>
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </BlockHeadContent>
                </BlockBetween>
              </BlockHead>

              
            <Orders
                name="Preparing"
                tableData={data}/>





                
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
            <h5 className="title">Add New User</h5>
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
                  Personal Info
                </a>
              </li>

            </ul>
            <div className="tab-content">
              <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="address">
                <Row className="gy-4">
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
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">Banner Image</label>
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
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="lg" onClick={() => submitUpdateBusinessForm()}>
                          {loading ? <Spinner size="sm" color="light" /> : "Save"}
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


        </React.Fragment>
    );
};

export default PreparingOrders;
