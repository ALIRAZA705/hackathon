import React, { useContext, useEffect, useState } from "react";
// import "../../fonts/font.css"
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import "./restaurants.css"
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
    UserAvatar,
    PaginationComponent,
    Button,
    DataTable,
    DataTableBody,
    DataTableHead,
    DataTableRow,
    DataTableItem,
    TooltipComponent,
    RSelect,
} from "../../components/Component";
import RestaurantCardMaterial from "../components/RestaurantCardMaterial";
import {useDispatch, useSelector} from "react-redux";
import Error404Modern from "../error/404-modern";
import {Box} from "@mui/material";
import {Spinner} from "reactstrap";
import {setBusiness, setUser} from "../../store/state/userInfo";
import {getAllRestaurants} from "../../api/restaurant/restaurant";
import {getLoginUser} from "../../api/auth/auth";
import RestaurantCard from "../components/RestaurantCard";
import {getAllRiders} from "../../api/rider/rider";
import RiderCategoryCard from "../components/RiderCategoryCard";


const Riders = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userInfo)
    const [riders, setRiders] = useState([]);
    const [totalRiders, setTotalRiders] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(async()=>{
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        dispatch(setUser(user));
        if(user.role !== "super-admin" && user.user_login_status  !== "super-admin"){
            window.location.href="/404"
        }
        else{
            const res = await getAllRiders();
            console.log("readcasca ", res)
            if(res.request.status !== 200) {
                let err = res.response.data.error ? JSON.stringify(res.response.data.error) : "Error getting Restaurants";
                setLoading(true);
            }
        else {
            const newList = res.data.records.data;
                setRiders(newList);
                setTotalRiders(res.data.records.total)
                setLoading(false);
            }
        }
    },[user])


    return (
        <React.Fragment>
            <Head title="Riders"></Head>
            {
                loading ? <Box sx={{
                    width: "100vw",
                    height: "100vh",
                    margin: "auto",
                    paddingTop: "25%",
                    paddingLeft: "50%"
                    // textAlign: "center"
                    }}>
                        Please Wait...&nbsp;&nbsp;&nbsp;
                        <Spinner size="sm" color="dark"/>
                    </Box> :
                <Content>
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h3" page>
                                    Riders
                                </BlockTitle>
                                {/*<BlockDes className="text-soft">*/}
                                {/*    <p>You have total {totalrestaurants} restaurants.</p>*/}
                                {/*</BlockDes>*/}
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>

                    <div className="div-centered">
                        <Block className="card-row">
                                <RiderCategoryCard
                                    approved={true}
                                    tableData={riders}
                                />
                                <RiderCategoryCard
                                    approved={false}
                                    tableData={riders}
                                />


                        </Block>

                    </div>

                </Content>
            }
        </React.Fragment>
    );
};
export default Riders;
