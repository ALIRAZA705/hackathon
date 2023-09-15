import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
// import { orderData, filterCoin, filterPaymentmethod, filterStatus, filterType } from "./OrderData";
import Orders from "./Orders";
import {getOrdersByRestId} from "../../api/order/order";



const PreparingOrders = () => {
    const [data, setData] = useState([]);

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
            <Head title="Order Default"></Head>
            <Orders
                name="Preparing"
                tableData={data}/>
        </React.Fragment>
    );
};

export default PreparingOrders;
