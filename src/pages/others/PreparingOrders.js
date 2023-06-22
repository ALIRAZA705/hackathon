import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
// import { orderData, filterCoin, filterPaymentmethod, filterStatus, filterType } from "./OrderData";
import Orders from "./Orders";
import {getOrdersByRestId} from "../../api/order/order";

export const orderData = [
    {
        id: 1,
        orderId: "95954",
        date: "Jun 4, 2020",
        status: "Preparing",
        customer: "Arnold Armstrong",
        purchased: "3 items",
        total: "249.75",
        check: false,
    },
    {
        id: 5,
        orderId: "95947",
        date: "May 28, 2020",
        status: "Preparing",
        customer: "Frances Burns",
        purchased: "6 items",
        total: "496.75",
        check: false,
    },
    {
        id: 7,
        orderId: "95902",
        date: "May 25, 2020",
        status: "Preparing",
        customer: "Patrick Newman",
        purchased: "4 items",
        total: "349.75",
        check: false,
    },
    {
        id: 8,
        orderId: "95996",
        date: "May 24, 2020",
        status: "Preparing",
        customer: "Emma Walker",
        purchased: "Smart Watch",
        total: "129.99",
        check: false,
    },
    {
        id: 11,
        orderId: "95810",
        date: "Jul 4, 2020",
        status: "Preparing",
        customer: "Jakoby Roman",
        purchased: "3 items",
        total: "249.75",
        check: false,
    },
    {
        id: 15,
        orderId: "95860",
        date: "May 28, 2020",
        status: "Preparing",
        customer: "Arden Dean",
        purchased: "6 items",
        total: "496.75",
        check: false,
    },
    {
        id: 17,
        orderId: "95880",
        date: "May 25, 2020",
        status: "Preparing",
        customer: "Tianna Fuller",
        purchased: "4 items",
        total: "349.75",
        check: false,
    },
    {
        id: 18,
        orderId: "95880",
        date: "May 24, 2020",
        status: "Preparing",
        customer: "Aliah Pulis",
        purchased: "Smart Watch",
        total: "129.99",
        check: false,
    },
];


const PreparingOrders = () => {
    const [data, setData] = useState([]);


    // fetch data from API
    useEffect(async()=>{
        // const res = await getOrdersByRestId();
        // console.log("res ordersss : ", res)
        // setData(res.data)
        setData(orderData)
    },[])


    return (
        <React.Fragment>
            <Head title="Order Default"></Head>
            <Orders
                name="Preparing"
                tableData={data}/>
        </React.Fragment>
    );
};

export default PreparingOrders;
