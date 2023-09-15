import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import DatePicker from "react-datepicker";
import {Stack, Button, Typography} from "@mui/material";
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
    // Button,
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
    Modal,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { getDateStructured } from "../../utils/Utils";
import {changeOrderStatus, getOrdersByRestId} from "../../api/order/order";

const Bookings = () => {
    const [data, setData] = useState([]);
    const [onSearch, setonSearch] = useState(false);
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
    });
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(7);
    const [sort, setSortState] = useState("");

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

    // fetch data from API
    useEffect(async()=>{
        const res = await getOrdersByRestId();
        console.log("res ordersss : ", res?.data?.records)
        if(res?.status === 200){
            let preparing = res?.data?.records.filter(r=>r.order_status === "Pending")
            setData(preparing)
        }
        else
            setData([])
    },[])

    // Changing state value when searching name
    useEffect(() => {
        if (onSearchText !== "") {
            const filteredObject = data.filter((item) => {
                return item.orderId.includes(onSearchText);
            });
            setData([...filteredObject]);
        } else {
            // setData([...orderData]);
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

    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const { errors, register, handleSubmit } = useForm();

    return (
        <React.Fragment>
            <Head title="Order Default"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Bookings</BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <DataTable className="card-stretch">
                        <div className="card-inner">
                            <div className="card-title-group">
                                <div className="card-title">
                                    <h5 className="title">All Bookings</h5>
                                </div>
                                <div className="card-tools mr-n1">
                                    <ul className="btn-toolbar gx-1">
                                        <li>
                                            {/*<Button*/}
                                            {/*    href="#search"*/}
                                            {/*    onClick={(ev) => {*/}
                                            {/*        ev.preventDefault();*/}
                                            {/*        setonSearch(true);*/}
                                            {/*    }}*/}
                                            {/*    className="btn-icon search-toggle toggle-search"*/}
                                            {/*>*/}
                                            {/*    <Icon name="search"></Icon>*/}
                                            {/*</Button>*/}
                                        </li>
                                        <li className="btn-toolbar-sep"></li>
                                        {/*  removed code */}
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
                        <div style={{marginLeft: "4rem"}}>
                            <DataTableBody>
                                <DataTableHead>
                                    <DataTableRow>
                                        <span>Order</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span >Date</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Customer</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span>Details</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                                        <span className="sub-text">Quantity</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                        <span >Amount</span>
                                    </DataTableRow>

                                    <DataTableRow>
                                        {/*    removed code */}
                                        <span >Order Action</span>
                                    </DataTableRow>
                                </DataTableHead>

                                {currentItems.length > 0
                                    ? currentItems.map((item) => (
                                        <DataTableItem key={item.id}>
                                            {/* removed */}
                                            <DataTableRow>
                                                <a href="#id" onClick={(ev) => ev.preventDefault()}>
                                                    #{item.id}
                                                </a>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <span>{item.created_at.split("T")[0]}</span>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <span>{item.customer_name}</span>
                                            </DataTableRow>
                                            <DataTableRow >
                                                {/*<span className="tb-sub text-primary">{item.purchased}</span>*/}
                                                <span>{item.restaurant_data.restaurant_menue[0].item_name}</span>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <span>$ {item.item_delivered_quantity}</span>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <span>$ {item.amount_captured}</span>
                                            </DataTableRow>
                                            <DataTableRow>
                                                <Stack direction="row" gap={2}>
                                                    <Button
                                                        sx={{
                                                            border: "1px solid #1ee0ac",
                                                            background: "#1ee0ac !important",
                                                            borderRadius: "30px"
                                                        }}
                                                        href="#markasdone"
                                                        onClick={(ev) => {
                                                            ev.preventDefault();
                                                            changeOrderStatus({id: item.id, order_status:"Preparing" })
                                                            deleteOrder(item.id);
                                                        }}
                                                    >
                                                        {/*<Icon name="truck"></Icon>*/}
                                                        <Typography sx={{
                                                            textTransform: "none",
                                                            color: "white",
                                                            fontSize: "13px"
                                                        }}>Approve</Typography>
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            border: "1px solid #f4bd0e",
                                                            background: "#f4bd0e !important",
                                                            borderRadius: "30px"
                                                        }}
                                                        href="#markasdone"
                                                        onClick={(ev) => {
                                                            ev.preventDefault();
                                                            changeOrderStatus({id: item.id, order_status:"Rejected" })
                                                            deleteOrder(item.id);
                                                        }}
                                                    >
                                                        {/*<Icon name="truck"></Icon>*/}
                                                        <Typography sx={{
                                                            textTransform: "none",
                                                            color: "white",
                                                            fontSize: "13px"
                                                        }}>Decline</Typography>
                                                    </Button>
                                                </Stack>
                                                {/*    removed */}
                                            </DataTableRow>
                                        </DataTableItem>
                                    ))
                                    : null}
                            </DataTableBody>
                        </div>

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
                                    <span className="caption-text">{formData.orderId}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Status</span>
                                    <span
                                        className={`dot bg-${formData.status === "Delivered" ? "success" : "warning"} d-mb-none`}
                                    ></span>
                                    <span
                                        className={`badge badge-sm badge-dot has-bg badge-${
                                            formData.status === "Delivered" ? "success" : "warning"
                                        } d-none d-mb-inline-flex`}
                                    >
                    {formData.status}
                  </span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Customer</span>
                                    <span className="caption-text">{formData.customer}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Purchased Product</span>
                                    <span className="caption-text">{formData.purchased}</span>
                                </Col>
                                <Col lg={6}>
                                    <span className="sub-text">Total Price</span>
                                    <span className="caption-text">{formData.total}</span>
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                </Modal>
            </Content>
        </React.Fragment>
    );
};

export default Bookings;
