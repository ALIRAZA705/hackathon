import React, {useEffect, useMemo, useState} from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import DatePicker from "react-datepicker";
import {Stack, Box} from "@mui/material";
import { orderData, filterCoin, filterPaymentmethod, filterStatus, filterType } from "./OrderData";
import {
    Block,
    BlockHeadContent,
    BlockTitle,
    BlockBetween,
    BlockHead,
    DataTableHead,
    DataTableItem,
    DataTableRow,
    Icon,
    TooltipComponent,
    PaginationComponent,
    PreviewAltCard,
    DataTableBody,
    DataTable,
    RSelect,
    Button,
    Row,
    Col,
} from "../../components/Component";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    FormGroup,
    ModalBody,
    Modal, Spinner, Alert,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { getDateStructured } from "../../utils/Utils";
import {changeOrderStatus} from "../../api/order/order";
import {ordrDeliveryTimeDD} from "../pre-built/user-manage/UserProfileRegular";
import {getAllRiders} from "../../api/rider/rider";

const Orders = (props) => {
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(7);
    const [sort, setSortState] = useState("");
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const [data, setData] = useState([]);
    const [isSuperAdmin, setIsSuperAdmin] = useState(true)
    const [onSearch, setonSearch] = useState(false);
    const [riders, setRiders] = useState([]);
    const [riderErr, setRiderErr] = useState(null);
    // TODO()
    const [currentItems, setCurrentItems] = useState(data.slice(indexOfFirstItem, indexOfLastItem));
    // const [currentItems, setCurrentItems] = useState([{
    //     "id": 1,
    //     "username": "edge",
    //     "email": "edge@email.com",
    //     "phone": "+990000000",
    //     "first_name": "edge",
    //     "last_name": "user",
    //     "address": "street a",
    //     "country": "Pakistan",
    //     "city": "Islamabad",
    //     "zip": null,
    //     "locale": "enGB",
    //     "is_active": 1,
    //     "email_verified": 1,
    //     "last_login": null,
    //     "status": 1,
    //     "type": "Edge",
    //     "domain": "root",
    //     "role": "ReadWrite"
    // }]);
    const [formData, setFormData] = useState({
        id: null,
        orderId: "",
        date: new Date(),
        status: "",
        customer: "",
        purchased: "",
        total: "",
        check: false,
    });
    const [view, setView] = useState({
        add: false,
        details: false,
        rider: false
    });


    const tableData = useMemo(()=>{
        if(props.tableData)
        {
            setData(props.tableData);
        }
        else{
            // const res = await getOrdersByRestId();
            // console.log("res ordersss : ", res)
            // setData(res.data)
            setData(orderData)
        }
        return data;
    },[props])



    useEffect(()=>{
        // if(data.length>0){
            // TODO()
            setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem))
            // setCurrentItems([{
            //     "id": 1,
            //     "username": "edge",
            //     "email": "edge@email.com",
            //     "phone": "+990000000",
            //     "first_name": "edge",
            //     "last_name": "user",
            //     "address": "street a",
            //     "country": "Pakistan",
            //     "city": "Islamabad",
            //     "zip": null,
            //     "locale": "enGB",
            //     "is_active": 1,
            //     "email_verified": 1,
            //     "last_login": null,
            //     "status": 1,
            //     "type": "Edge",
            //     "domain": "root",
            //     "role": "ReadWrite"
            // }])
        // }
    },[data])

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem("user")).user_login_status === "super-admin"){
            setIsSuperAdmin(true);
        }
        else{
            setIsSuperAdmin(false);
        }
    },[])


    // Sorting data
    const sortFunc = (params) => {
        let defaultData = data;
        if (params === "asc") {
            let sortedData = defaultData.sort((a, b) => a.ref.localeCompare(b.ref));
            setData([...sortedData]);
        } else if (params === "dsc") {
            let sortedData = defaultData.sort((a, b) => b.ref.localeCompare(a.ref));
            setData([...sortedData]);
        }
    };

    // Changing state value when searching name
    useEffect(() => {
        if (onSearchText !== "") {
            const filteredObject = data.filter((item) => {
                return item.orderId.includes(onSearchText);
            });
            setData([...filteredObject]);
        } else {
            setData([...data]);
        }
    }, [onSearchText]);

    // toggle function to view order details
    const toggle = (type) => {
        setView({
            add: type === "add" ? true : false,
            details: type === "details" ? true : false,
        });
    };

    // selects all the orders
    const selectorCheck = (e) => {
        let newData;
        newData = data.map((item) => {
            item.check = e.currentTarget.checked;
            return item;
        });
        setData([...newData]);
    };

    // resets forms
    const resetForm = () => {
        setFormData({
            id: null,
            orderId: "",
            date: new Date(),
            status: "",
            customer: "",
            purchased: "",
            total: "",
            check: false,
        });
    };

    // Submits form data
    const onFormSubmit = (form) => {
        const { customer, purchased, total } = form;
        let submittedData = {
            id: data.length + 1,
            orderId: "95981",
            date: getDateStructured(formData.date),
            status: formData.status,
            customer: customer,
            purchased: purchased,
            total: total,
            check: false,
        };
        setData([submittedData, ...data]);
        setView({ add: false, details: false });
        resetForm();
    };

    // function to load detail data
    const loadDetail = (id) => {
        let index = data.findIndex((item) => item.id === id);
        setFormData(data[index]);
    };

    // OnChange function to get the input data
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // selects one product
    const onSelectChange = (e, id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].check = e.currentTarget.checked;
        setData([...newData]);
    };

    // onChange function for searching name
    const onFilterChange = (e) => {
        setSearchText(e.target.value);
    };

    // function to close the form modal
    const onFormCancel = () => {
        setView({ add: false, details: false });
        resetForm();
    };

    // function to change to approve property for an item
    const markAsDelivered = (id) => {
        let newData = data;
        let index = newData.findIndex((item) => item.id === id);
        newData[index].status = "Delivered";
        setData([...newData]);
    };

    // function to delete a Order
    const deleteOrder = (id) => {
        let defaultData = data;
        defaultData = defaultData.filter((item) => item.id !== id);
        setData([...defaultData]);
    };

    // function to delete the seletected item
    const selectorDeleteOrder = () => {
        let newData;
        newData = data.filter((item) => item.check !== true);
        setData([...newData]);
    };

    // function to change the complete property of an item
    const selectorMarkAsDelivered = () => {
        let newData;
        newData = data.map((item) => {
            if (item.check === true) item.status = "Delivered";
            return item;
        });
        setData([...newData]);
    };

    const getRidersList = async () => {
        const res = await getAllRiders();
        // console.log("res for riders list::: ", res)
        if(res.status == 200){
            let riderDD = [];
            const data = res.data.records.data;
            data.forEach((r)=>{
                riderDD.push({
                    value: r.id,
                    label: r.first_name + " " + r.last_name
                })
            })
            setRiders(riderDD);
        }

    }


    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const { errors, register, handleSubmit } = useForm();

    return (
        <React.Fragment>
            <Head title="Users"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>{`${props.name} Users`}</BlockTitle>
                        </BlockHeadContent>
                        { !props.name &&
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button
                                        className="toggle btn-icon d-md-none"
                                        color="primary"
                                        onClick={() => {
                                            toggle("add");
                                        }}
                                    >
                                        <Icon name="plus"></Icon>
                                    </Button>
                                    {/* <Button
                                        className="toggle d-none d-md-inline-flex"
                                        color="primary"
                                        onClick={() => {
                                            toggle("add");
                                        }}
                                    >
                                        <Icon name="plus"></Icon>
                                        <span>Add User</span>
                                    </Button> */}
                                </div>
                            </BlockHeadContent>
                        }
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <DataTable className="card-stretch">
                        <div className="card-inner">
                            <div className="card-title-group">
                                    <Box  sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        px: "30px",
                                        py: "3px",
                                        background: `${props.name === "Delivered" ? "#D7F5F0" : "#F7F0D8"}`,
                                        border: `1px solid ${props.name === "Delivered" ? "#1EE0AC" : "#F4BD0E"}`,
                                        borderRadius: "30px"
                                    }}>
                                        <div className="card-title">
                                    <h5 className="title">{`${props.name} User List`}</h5>
                                        </div>
                                    </Box>

                                <div className="card-tools mr-n1">
                                    <ul className="btn-toolbar gx-1">
                                        <li>
                                            <Button
                                                href="#search"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    setonSearch(true);
                                                }}
                                                className="btn-icon search-toggle toggle-search"
                                            >
                                                <Icon name="search"></Icon>
                                            </Button>
                                        </li>
                                        <li className="btn-toolbar-sep"></li>
                                        {/*<li>*/}
                                        {/*    <UncontrolledDropdown>*/}
                                        {/*        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">*/}
                                        {/*            <div className="dot dot-primary"></div>*/}
                                        {/*            <Icon name="filter-alt"></Icon>*/}
                                        {/*        </DropdownToggle>*/}
                                        {/*        <DropdownMenu right className="filter-wg dropdown-menu-xl">*/}
                                        {/*            <div className="dropdown-head">*/}
                                        {/*                <span className="sub-title dropdown-title">Advanced Filter</span>*/}
                                        {/*                <div className="dropdown">*/}
                                        {/*                    <Button size="sm" className="btn-icon">*/}
                                        {/*                        <Icon name="more-h"></Icon>*/}
                                        {/*                    </Button>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*            <div className="dropdown-body dropdown-body-rg">*/}
                                        {/*                <Row className="gx-6 gy-4">*/}
                                        {/*                    <Col size="6">*/}
                                        {/*                        <FormGroup>*/}
                                        {/*                            <label className="overline-title overline-title-alt">Type</label>*/}
                                        {/*                            <RSelect options={filterType} placeholder="Any Type" />*/}
                                        {/*                        </FormGroup>*/}
                                        {/*                    </Col>*/}
                                        {/*                    <Col size="6">*/}
                                        {/*                        <FormGroup>*/}
                                        {/*                            <label className="overline-title overline-title-alt">Status</label>*/}
                                        {/*                            <RSelect options={filterStatus} placeholder="Any Status" />*/}
                                        {/*                        </FormGroup>*/}
                                        {/*                    </Col>*/}
                                        {/*                    <Col size="6">*/}
                                        {/*                        <FormGroup className="form-group">*/}
                                        {/*                            <label className="overline-title overline-title-alt">Pay Currency</label>*/}
                                        {/*                            <RSelect options={filterCoin} placeholder="Any coin" />*/}
                                        {/*                        </FormGroup>*/}
                                        {/*                    </Col>*/}
                                        {/*                    <Col size="6">*/}
                                        {/*                        <FormGroup className="form-group">*/}
                                        {/*                            <label className="overline-title overline-title-alt">Method</label>*/}
                                        {/*                            <RSelect options={filterPaymentmethod} placeholder="Any Method" />*/}
                                        {/*                        </FormGroup>*/}
                                        {/*                    </Col>*/}

                                        {/*                    <Col size="6">*/}
                                        {/*                        <FormGroup>*/}
                                        {/*                            <div className="custom-control custom-control-sm custom-checkbox">*/}
                                        {/*                                <input type="checkbox" className="custom-control-input" id="includeDel" />*/}
                                        {/*                                <label className="custom-control-label" htmlFor="includeDel">*/}
                                        {/*                                    {" "}*/}
                                        {/*                                    Including Deleted*/}
                                        {/*                                </label>*/}
                                        {/*                            </div>*/}
                                        {/*                        </FormGroup>*/}
                                        {/*                    </Col>*/}

                                        {/*                    <Col size="12">*/}
                                        {/*                        <FormGroup className="form-group">*/}
                                        {/*                            <Button type="button" className="btn btn-secondary">*/}
                                        {/*                                Filter*/}
                                        {/*                            </Button>*/}
                                        {/*                        </FormGroup>*/}
                                        {/*                    </Col>*/}
                                        {/*                </Row>*/}
                                        {/*            </div>*/}
                                        {/*            <div className="dropdown-foot between">*/}
                                        {/*                <a*/}
                                        {/*                    href="#reset"*/}
                                        {/*                    onClick={(ev) => {*/}
                                        {/*                        ev.preventDefault();*/}
                                        {/*                    }}*/}
                                        {/*                    className="clickable"*/}
                                        {/*                >*/}
                                        {/*                    Reset Filter*/}
                                        {/*                </a>*/}
                                        {/*                <a*/}
                                        {/*                    href="#save"*/}
                                        {/*                    onClick={(ev) => {*/}
                                        {/*                        ev.preventDefault();*/}
                                        {/*                    }}*/}
                                        {/*                >*/}
                                        {/*                    Save Filter*/}
                                        {/*                </a>*/}
                                        {/*            </div>*/}
                                        {/*        </DropdownMenu>*/}
                                        {/*    </UncontrolledDropdown>*/}
                                        {/*</li>*/}
                                        <li>
                                            <UncontrolledDropdown>
                                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                                    <Icon name="setting"></Icon>
                                                </DropdownToggle>
                                                <DropdownMenu right className="dropdown-menu-xs">
                                                    <ul className="link-check">
                                                        <li>
                                                            <span>Show</span>
                                                        </li>
                                                        <li className={itemPerPage === 10 ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setItemPerPage(10);
                                                                }}
                                                            >
                                                                10
                                                            </DropdownItem>
                                                        </li>
                                                        <li className={itemPerPage === 15 ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setItemPerPage(15);
                                                                }}
                                                            >
                                                                15
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                    <ul className="link-check">
                                                        <li>
                                                            <span>Order</span>
                                                        </li>
                                                        <li className={sort === "dsc" ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setSortState("dsc");
                                                                    sortFunc("dsc");
                                                                }}
                                                            >
                                                                DESC
                                                            </DropdownItem>
                                                        </li>
                                                        <li className={sort === "asc" ? "active" : ""}>
                                                            <DropdownItem
                                                                tag="a"
                                                                href="#dropdownitem"
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    setSortState("asc");
                                                                    sortFunc("asc");
                                                                }}
                                                            >
                                                                ASC
                                                            </DropdownItem>
                                                        </li>
                                                    </ul>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </li>
                                    </ul>
                                </div>
                                <div className={`card-search search-wrap ${onSearch && "active"}`}>
                                    <div className="search-content">
                                        <Button
                                            onClick={() => {
                                                setSearchText("");
                                                setonSearch(false);
                                            }}
                                            className="search-back btn-icon toggle-search"
                                        >
                                            <Icon name="arrow-left"></Icon>
                                        </Button>
                                        <input
                                            type="text"
                                            className="border-transparent form-focus-none form-control"
                                            placeholder="Search by Order Id"
                                            value={onSearchText}
                                            onChange={(e) => onFilterChange(e)}
                                        />
                                        <Button className="search-submit btn-icon">
                                            <Icon name="search"></Icon>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DataTableBody bodyclass="nk-tb-tnx">
                            <DataTableHead className="nk-tb-item">
                                <DataTableRow className="nk-tb-col-check">
                                    <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input form-control"
                                            id="pid-all"
                                            onChange={(e) => selectorCheck(e)}
                                        />
                                        <label className="custom-control-label" htmlFor="pid-all"></label>
                                    </div>
                                </DataTableRow>
                                <DataTableRow>
                                    <span className="sub-text">ID</span>
                                </DataTableRow>
                                <DataTableRow size="md">
                                    <span className="sub-text">Username</span>
                                </DataTableRow>
                                {/*<DataTableRow>*/}
                                {/*    <span className="sub-text">Status</span>*/}
                                {/*</DataTableRow>*/}
                                <DataTableRow size="sm">
                                    <span className="sub-text">Email</span>
                                </DataTableRow>
                                <DataTableRow size="md">
                                    <span className="sub-text">Phone</span>
                                </DataTableRow>
                                <DataTableRow size="md">
                                    <span className="sub-text">Address</span>
                                </DataTableRow>
                                <DataTableRow>
                                    <span className="sub-text">Country</span>
                                </DataTableRow>
                                <DataTableRow>
                                    <span className="sub-text">Role</span>
                                </DataTableRow>

                                <DataTableRow className="nk-tb-col-tools">
                                    <ul className="nk-tb-actions gx-1 my-n1">
                                        <li>
                                        </li>
                                    </ul>
                                </DataTableRow>
                            </DataTableHead>

                            {currentItems.length > 0
                                ? currentItems.map((item) => (
                                    <DataTableItem key={item.id}>
                                        <DataTableRow className="nk-tb-col-check">
                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input form-control"
                                                    defaultChecked={item.check}
                                                    id={item.id + "pid-all"}
                                                    key={Math.random()}
                                                    onChange={(e) => onSelectChange(e, item.id)}
                                                />
                                                <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                                            </div>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <a href="#id" onClick={(ev) => ev.preventDefault()}>
                                                #{item.id}
                                            </a>
                                        </DataTableRow>
                                        <DataTableRow size="md">
                                            {/* <span>{item.created_at.split("T")[0]}</span> */}
                                            <span>{item.username}</span>
                                        </DataTableRow>
                                        {/*<DataTableRow>*/}
                                        {/*    <Stack direction="row" gap={1} sx={{*/}
                                        {/*        justifyContent: "center",*/}
                                        {/*        alignItems: "center",*/}
                                        {/*        width: "80px",*/}
                                        {/*        background: `${item.status === "Delivered" ? "#D7F5F0" : "#F7F0D8"}`,*/}
                                        {/*        border: `1px solid ${item.status === "Delivered" ? "#1EE0AC" : "#F4BD0E"}`,*/}
                                        {/*        borderRadius: "30px"*/}
                                        {/*    }}>*/}
                                        {/*        <span*/}
                                        {/*            className={`dot bg-${item.status === "Delivered" ? "success" : "warning"} d-mb-none`}*/}

                                                {/*></span>*/}
                                                {/*<span>*/}
                                                {/*    {item.status}*/}
                                                {/*</span>*/}
                                              {/*  <span*/}
                                              {/*      className={`badge badge-sm badge-dot has-bg badge-${*/}
                                              {/*          item.status === "Delivered" ? "success" : "warning"*/}
                                              {/*      } d-none d-mb-inline-flex`}*/}
                                              {/*  >*/}
                                              {/*{item.status}*/}
                                              {/*   </span>*/}
                                            {/*</Stack>*/}
                                        {/*</DataTableRow>*/}
                                        <DataTableRow size="sm">
                                            <span className="tb-sub">{item.email}</span>
                                        </DataTableRow>
                                        <DataTableRow size="md">
                                            <span className="tb-sub text-primary">{item.phone}</span>
                                        </DataTableRow>
                                        <DataTableRow size="md">
                                            <span className="tb-sub text-primary">{item.address}</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span className="tb-lead">{item.country}</span>
                                        </DataTableRow>
                                        <DataTableRow>
                                            <span className="tb-lead">{item.role}</span>
                                        </DataTableRow>

                                    </DataTableItem>
                                ))
                                : null}
                        </DataTableBody>
                        <PreviewAltCard>
                            {data.length > 0 ? (
                                <PaginationComponent
                                    itemPerPage={itemPerPage}
                                    totalItems={data.length}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                />
                            ) : (
                                <div className="text-center">
                                    <span className="text-silent">No orders found</span>
                                </div>
                            )}
                        </PreviewAltCard>
                    </DataTable>
                </Block>

                <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
                    <ModalBody>
                        <a href="#cancel" className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    onFormCancel();
                                }}
                            ></Icon>
                        </a>
                        <div className="p-2">
                            <h5 className="title">Add Order</h5>
                            <div className="mt-4">
                                <form onSubmit={handleSubmit(onFormSubmit)}>
                                    <Row className="g-3">
                                        <Col md="12">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="customer">
                                                    Customer Name
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="customer"
                                                        onChange={(e) => onInputChange(e)}
                                                        ref={register({
                                                            required: "This field is required",
                                                        })}
                                                        defaultValue={formData.customer}
                                                    />
                                                    {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="date">
                                                    Date of order
                                                </label>
                                                <div className="form-control-wrap">
                                                    <DatePicker
                                                        selected={formData.date}
                                                        className="form-control"
                                                        onChange={(date) => setFormData({ ...formData, date: date })}
                                                    />
                                                    {errors.date && <span className="invalid">{errors.date.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="purchased">
                                                    Purchased Product
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="purchased"
                                                        ref={register({ required: "This is required" })}
                                                        defaultValue={formData.purchased}
                                                    />
                                                    {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="total">
                                                    Total Price
                                                </label>
                                                <div className="form-control-wrap">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="total"
                                                        ref={register({ required: "This is required" })}
                                                        defaultValue={formData.total}
                                                    />
                                                    {errors.total && <span className="invalid">{errors.total.message}</span>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="status">
                                                    Status
                                                </label>
                                                <div className="form-control-wrap">
                                                    <RSelect
                                                        name="status"
                                                        options={[
                                                            { value: "On Hold", label: "On Hold" },
                                                            { value: "Delivered", label: "Delivered" },
                                                        ]}
                                                        onChange={(e) => setFormData({ ...formData, status: e.value })}
                                                        defaultValue={formData.status}
                                                    />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col size="12">
                                            <Button color="primary" type="submit">
                                                <Icon className="plus"></Icon>
                                                <span>Add Order</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
                    <ModalBody>
                        <a href="#cancel" className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    onFormCancel();
                                }}
                            ></Icon>
                        </a>
                        <div className="nk-tnx-details mt-sm-3">
                            <div className="nk-modal-head mb-3">
                                <h5 className="title">Order Details</h5>
                            </div>
                            <Row className="gy-3">
                                <Col lg={6}>
                                    <span className="sub-text">Order Id</span>
                                    <span className="caption-text">{formData.id}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Status</span>
                                    <span
                                        className={`dot bg-${formData.order_status === "Delivered" ? "success" : "warning"} d-mb-none`}
                                    ></span>
                                    <span
                                        className={`badge badge-sm badge-dot has-bg badge-${
                                            formData.status === "Delivered" ? "success" : "warning"
                                        } d-none d-mb-inline-flex`}
                                    >
                    {formData.order_status}
                  </span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Customer</span>
                                    <span className="caption-text">{formData.customer_name}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Purchased Product</span>
                                    <span className="caption-text">{formData.restaurant_data?.restaurant_menue[0]?.item_name}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Total Price</span>
                                    <span className="caption-text">$ {formData.amount_captured}</span>
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={view.rider} toggle={() => onFormCancel()} className="modal-dialog-centered" size="sm">
                    <ModalBody>
                        <a href="#cancel" className="close">
                            {" "}
                            <Icon
                                name="cross-sm"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    onFormCancel();
                                }}
                            ></Icon>
                        </a>
                        <div className="nk-tnx-details mt-sm-3">
                            <div className="nk-modal-head mb-3">
                                <h5 className="title">Assign a Rider</h5>
                            </div>
                            <Row className="gy-3">
                                <Col lg={2}>
                                </Col>
                                <Col lg={8}>
                                    <span className="sub-text">Available Riders</span>
                                    <RSelect
                                        options={riders}
                                        placeholder="Select Delivery Time"
                                        defaultValue={[
                                            {
                                                value: formData.ordr_delivery_time,
                                                label: formData.ordr_delivery_time,
                                            },
                                        ]}
                                        onChange={(e) => setFormData({ ...formData, ordr_delivery_time: e.value })}
                                    />
                                </Col>
                                <Col lg={2}>
                                </Col>
                                <Col lg={2}>
                                </Col>
                                <Col lg={8}>
                                    <Button color="primary" size="lg" onClick={async () => {
                                        // setRiderErr("Err rider")
                                        await changeOrderStatus({id: formData.id, order_status:"InProgress" })
                                        deleteOrder(formData.id);
                                    }}>
                                        {false ? <Spinner size="sm" color="light" /> : "Assign & Dispatch"}
                                    </Button>
                                </Col>
                                <Col lg={2}>
                                </Col>

                                <Col lg={2}></Col>
                                <Col lg={8}>
                                    {riderErr && (
                                        <div className="mb-3">
                                            <Alert color='danger' className="alert-icon">
                                                {" "}
                                                <Icon name="alert-circle" /> {riderErr}{" "}
                                            </Alert>
                                        </div>
                                    )}
                                </Col>
                                <Col lg={2}></Col>

                            </Row>
                        </div>
                    </ModalBody>
                </Modal>
            </Content>
        </React.Fragment>
    );
};

export default Orders;
