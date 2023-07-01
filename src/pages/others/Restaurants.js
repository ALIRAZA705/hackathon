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

let restList = [
    {id: 1, business_name: "Rest 1", business_image: null, business_description: "rest desc 1", ordr_delivery_time:"15", cuisine_type:["non-veg"], restaurant_address:"isb", starting_price: "$$", rating:"4" },
    // {restId: 2, name: "Rest 2", restLogo: null, description: "rest desc 2", delivery:"25", type:["non-veg"], location:"f-7, capital", priceCategory: "$$", rating:"4.2" },
    // {restId: 3, name: "Rest 3", restLogo: null, description: "rest desc 3", delivery:"15", type:["veg"], location:"isb", priceCategory: "$$", rating:"3.7" },
    // {restId: 4, name: "Rest 4", restLogo: null, description: "rest desc 4", delivery:"35", type:["non-veg", "continental"], location:"saddar", priceCategory: "$$$", rating:"4" },
    // {restId: 5, name: "Rest 5", restLogo: null, description: "rest desc 5", delivery:"12", type:["veg"], location:"isb", priceCategory: "$$$", rating:"5" },
]

const Restaurants = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userInfo)
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(async()=>{
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        dispatch(setUser(user));
        if(user.role !== "super-admin" && user.user_login_status  !== "super-admin"){
            window.location.href="/404"
        }
        else{
            const res = await getAllRestaurants();
            if(res.request.status !== 200) {
                let err = res.response.data.error ? JSON.stringify(res.response.data.error) : "Cannot login with credentials";
                setLoading(true);
            }
        else {
            const newList = res.data.records.data;
                console.log("resList :: ", newList)
                setRestaurants(newList);
                setLoading(false);
            }
        }
    },[user])


    return (
        <React.Fragment>
            <Head title="Restaurants"></Head>
            {
                loading ? <Box sx={{
                    width: "100vw",
                    height: "100vh",
                    margin: "auto",
                    paddingTop: "25%",
                    paddingLeft: "50%"
                    // textAlign: "center"
                    }}>
                        <Spinner size="sm" color="dark"/>
                    </Box> :
                <Content>
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h3" page>
                                    Restaurants
                                </BlockTitle>
                                <BlockDes className="text-soft">
                                    <p>You have total {2595} restaurants.</p>
                                </BlockDes>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>

                    <div className="div-centered">
                        <Block className="card-row">
                            {
                                restaurants.map((r) => (
                                    <RestaurantCardMaterial
                                        key={r.id}
                                        id={r.id}
                                        name={r.business_name}
                                        restLogo={r.business_image}
                                        description={r.business_description}
                                        delivery={r.ordr_delivery_time}
                                        type={[r.cuisine_type]}
                                        location={r.restaurant_address}
                                        priceCategory={r.starting_price}
                                        rating={r.rating}
                                    />
                                ))
                            }
                        </Block>
                    </div>

                </Content>
            }
        </React.Fragment>
    );
};
export default Restaurants;
