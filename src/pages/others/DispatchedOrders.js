import React, { useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import { getDateStructured } from "../../utils/Utils";
import Orders from "./Orders";
import {getOrdersByRestId} from "../../api/order/order";


const DispatchedOrders = () => {

    const [data, setData] = useState([]);



    // fetch data from API
    useEffect(async()=>{
        const res = await getOrdersByRestId();
        console.log("res ordersss : ", res?.data?.records)
        if(res?.status === 200){
            let dispatched = res?.data?.records.filter(r=>r.order_status === "Ready To Deliver")
            setData(dispatched)
        }
        else
            setData([])
    },[])

    return (
        <React.Fragment>
            <Head title="Order Default"></Head>
            <Orders
                name="Dispatched"
                tableData={data}/>
        </React.Fragment>
    );
};

export default DispatchedOrders;
