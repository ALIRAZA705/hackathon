import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
// import { orderData, filterCoin, filterPaymentmethod, filterStatus, filterType } from "./OrderData";
import Orders from "./Orders";
import { Alert, FormGroup, Modal, ModalBody, Spinner } from "reactstrap";
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
import {  Stack } from "@mui/material";
import Dropzone from "react-dropzone";
import { addNewUSer, getDomainName } from "../../api/misc/misc";
import { ConstructionOutlined } from "@mui/icons-material";

export const businessTypeDD1 = [
  { value: "Customer", label: "Customer" },
  { value: "Edge", label: "Edge" },
  { value: "Employee", label: "Employee" }
];


export const businessTypeDD22 = [
  { value: "Read", label: "Read" },
  { value: "ReadWrite", label: "ReadWrite" }
];




const PreparingOrders = () => {
    const [data, setData] = useState([]);
    console.log("99999999999",data)
    const [modalTab, setModalTab] = useState("1");
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.userInfo);
    const [categoryOptions2, setCategoryOptions2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorVal, setError] = useState("");
    console.log("gggggggggggggggg",errorVal)
    const [files, setFiles] = useState([]);
    const handleAddUser = () => {
        setModal(true);
        // history.push(`${process.env.PUBLIC_URL}/restaurant/${params.id}/menu/add`)
      }

      const [formData, setFormData] = useState({
        userName:user?.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        domainName: user.domainName,
        business_name: user.busines_business_name,
        business_description: user.busines_business_description,
        phone_number: user.phone,
        address: user.address,
        type: user.type,
        domainName: user.domainName,
        cuisine_type: user.busines_cuisine_types,
        starting_price: user.busines_starting_price,
        ordr_delivery_time: user.busines_ordr_delivery_time,
      });

      const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    // fetch data from API
    useEffect(async()=>{
        const res = await getOrdersByRestId();
        console.log("res ordersss : ", res)
        if(res?.status === 200){
            let preparing = res?.data?.users
            setData(preparing)
        }
        else
            setData([])
    },[])


    const submitAddUser = async() => {
try {
  let data = await addNewUSer(formData);
  console.log("ffffff",data?.response?.status)
  if(!data?.response?.status)
  {
    setModal(false)
    // reset();
    window.location.reload();
    setError(null)
  }

  else {
    setError("something went wrong pls try again")
  }

  
} catch (error) {
  setError("something went wrong pls try again")
}

      // console.log( "here is form data", data?.response?.status,data?.response,     data?.response?.data?.message, data?.response?.data?.message?.message)
//       if(data?.response?.status !== 200)
//       {
// // setError(data?.response?.data?.message?.message)
// setError("something went wrong pls try again")
//       }
//       else {
//         setModal(false)
//       }
    }

    const getDomains = async () => {
      let data = await getDomainName();
      console.log("dddddddd",data)

      setCategoryOptions2(data?.data)
  };

  useEffect(()=>{
      getDomains();
  },[])

    return (
        <React.Fragment>
            <Head title="Users List"></Head>
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
                      <div className="toggle-expand-content" style={{display:"block",marginTop:"25px"}}>
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
                            // user.roleName !== "super-admin" &&
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
                name=""
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
                      <label className="form-label" htmlFor="full-name">
                        Email
                      </label>
                      <input
                        type="text"
                        id="first_name_profile"
                        className="form-control"
                        name="email"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.email}
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
                          options={categoryOptions2}
                          placeholder="Select Business Type"
                          // defaultValue={[
                          //   {
                          //     value: formData.domainName,
                          //     label: formData.domainName,
                          //   },
                          // ]}
                          onChange={(e) => setFormData({ ...formData, domainName: e.value })}
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
                          name="address"
                          onChange={(e) => onInputChange(e)}
                          defaultValue={formData?.address}
                          className="form-control"
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
                          onChange={(e) => setFormData({ ...formData, type: e.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                      Role
                      </label>
                      <RSelect
                          options={businessTypeDD22}
                          placeholder="Select Business Type"
                          defaultValue={[
                            {
                              value: formData.roleName,
                              label: formData.roleName,
                            },
                          ]}
                          onChange={(e) => setFormData({ ...formData, roleName: e.value })}
                      />
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="lg" onClick={() => submitAddUser()}>
                          {loading ? <Spinner size="sm" /> : "Save"}
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
                        <div className="mb-3" style={{marginTop:"8px"}}>
                          <Alert color="danger" className="alert-icon">
  
                     {errorVal}
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
