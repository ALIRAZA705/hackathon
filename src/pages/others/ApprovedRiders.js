import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import { getDateStructured } from "../../utils/Utils";
import Orders from "./Orders";
import {getOrdersByRestId} from "../../api/order/order";
import RidersList from "./RidersList";
import {useLocation} from "react-router";

const orders = [
    {
        id: 2,
        orderId: "95961",
        date: "Jun 3, 2020",
        status: "Delivered",
        customer: "Jean Douglas",
        purchased: "Fitness Tracker",
        total: "99.49",
        check: false,
    },
    {
        id: 3,
        orderId: "95963",
        date: "May 29, 2020",
        status: "Delivered",
        customer: "Ashley Lawson",
        purchased: "Pink Fitness Tracker",
        total: "148.75",
        check: false,
    },
    {
        id: 4,
        orderId: "95933",
        date: "May 29, 2020",
        status: "Delivered",
        customer: "Joe Larson",
        purchased: "2 items",
        total: "199.75",
        check: false,
    },
    {
        id: 6,
        orderId: "95909",
        date: "May 26, 2020",
        status: "Delivered",
        customer: "Victoria Lynch",
        purchased: "Waterproof Speakers",
        total: "89.99",
        check: false,
    },
    {
        id: 9,
        orderId: "95982",
        date: "May 23, 2020",
        status: "Delivered",
        customer: "Jane Montegomery",
        purchased: "Smart Watch",
        total: "249.75",
        check: false,
    },
    {
        id: 10,
        orderId: "95959",
        date: "May 23, 2020",
        status: "Delivered",
        customer: "Jane Harris",
        purchased: "Waterproof Speaker",
        total: "19.99",
        check: false,
    },
    {
        id: 12,
        orderId: "95820",
        date: "Jul 3, 2020",
        status: "Delivered",
        customer: "Katherine Moss",
        purchased: "Fitness Tracker",
        total: "99.49",
        check: false,
    },
    {
        id: 13,
        orderId: "95830",
        date: "May 29, 2020",
        status: "Delivered",
        customer: "Rachel Leonard",
        purchased: "Pink Fitness Tracker",
        total: "148.75",
        check: false,
    },
    {
        id: 14,
        orderId: "95850",
        date: "May 29, 2020",
        status: "Delivered",
        customer: "Ada Laine",
        purchased: "2 items",
        total: "199.75",
        check: false,
    },
    {
        id: 16,
        orderId: "95870",
        date: "May 26, 2020",
        status: "Delivered",
        customer: "Hector Lovett",
        purchased: "Waterproof Speakers",
        total: "89.99",
        check: false,
    },
    {
        id: 19,
        orderId: "95890",
        date: "May 23, 2020",
        status: "Delivered",
        customer: "Kendal Gray",
        purchased: "Smart Watch",
        total: "249.75",
        check: false,
    },
    {
        id: 20,
        orderId: "95899",
        date: "May 23, 2020",
        status: "Delivered",
        customer: "Kelis Ford",
        purchased: "Waterproof Speaker",
        total: "19.99",
        check: false,
    },
];

const ApprovedRiders = (state) => {

    const [data, setData] = useState([]);
    const location = useLocation();

    console.log("state::::::::: ", location.state.tableData)

    // fetch data from API
    useEffect(async()=>{
        // const res = await getOrdersByRestId();
        // console.log("res ordersss : ", res)
        // setData(res.data)
        setData(orders)
    },[])

    return (
        <React.Fragment>
            <Head title="Order Default"></Head>
            <RidersList
                name="Approved"
                tableData={location.state.tableData}/>
        </React.Fragment>
    );
};

export default ApprovedRiders;
