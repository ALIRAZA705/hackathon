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

let restList = [
    {restId: 1, name: "Rest 1", restLogo: null, description: "rest desc 1", delivery:"15", type:["non-veg"], location:"isb", priceCategory: "$$", rating:"4" },
    {restId: 2, name: "Rest 2", restLogo: null, description: "rest desc 2", delivery:"25", type:["non-veg"], location:"f-7, capital", priceCategory: "$$", rating:"4.2" },
    {restId: 3, name: "Rest 3", restLogo: null, description: "rest desc 3", delivery:"15", type:["veg"], location:"isb", priceCategory: "$$", rating:"3.7" },
    {restId: 4, name: "Rest 4", restLogo: null, description: "rest desc 4", delivery:"35", type:["non-veg", "continental"], location:"saddar", priceCategory: "$$$", rating:"4" },
    {restId: 5, name: "Rest 5", restLogo: null, description: "rest desc 5", delivery:"12", type:["veg"], location:"isb", priceCategory: "$$$", rating:"5" },
]

const Restaurants = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userInfo)
    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        if(user.role !== "super-admin"){
            window.location.href="/404"
        }
        else{
            setRestaurants(restList);
        }
    },[])

    return (
        <React.Fragment>
            <Head title="Restaurants"></Head>
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
                        {/*<RestaurantCardMaterial/>*/}
                        {/*<RestaurantCardMaterial/>*/}
                        {/*<RestaurantCardMaterial/>*/}
                        {/*<RestaurantCardMaterial/>*/}
                        {
                            restaurants.map((r)=>(
                                <RestaurantCardMaterial
                                    key={r.restId}
                                    id={r.restId}
                                    name={r.name}
                                    restLogo={r.restLogo}
                                    description={r.description}
                                    delivery={r.delivery}
                                    type={r.type}
                                    location={r.location}
                                    priceCategory={r.priceCategory}
                                    rating={r.rating}
                                />
                            ))
                        }
                    </Block>
                </div>

            </Content>
        </React.Fragment>
    );
};
export default Restaurants;
