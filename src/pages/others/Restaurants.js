import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { getCuisineList } from "../../api/misc/misc";


const Restaurants = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userInfo)
    const [restaurants, setRestaurants] = useState([]);
    // const [cuisineDropdown, setCuisineDropdown] = useState([]);
    const [totalrestaurants, setTotalRestaurants] = useState(0);
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
                let err = res.response.data.error ? JSON.stringify(res.response.data.error) : "Error getting Restaurants";
                setLoading(true);
            }
        else {
            const newList = res.data.records.data;
                setRestaurants(newList);
                setTotalRestaurants(res.data.records.total)
                setLoading(false);
            }
        }
    },[user])

const cuisineList = useMemo(()=>{
        if(localStorage.getItem("cuisineList")){
          return JSON.parse(localStorage.getItem("cuisineList")).data;
        }
        else{
          return null;
        }
      },[])

  useEffect(async()=>{
    console.log(cuisineList, !cuisineList)
    if(!cuisineList){
      const res = await getCuisineList()
      if(res.status === 200){
        localStorage.setItem("cuisineList", JSON.stringify(res?.data?.records))
      }
    }
    else{
      console.log("cuisineList:::::::::::: ", cuisineList)
    }
  },[cuisineList])

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
                        Please Wait...&nbsp;&nbsp;&nbsp;
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
                                    <p>You have total {totalrestaurants} restaurants.</p>
                                </BlockDes>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>

                    <div className="div-centered">
                        <Block className="card-row">
                            {
                                restaurants.map((r) => (
                                    // <RestaurantCardMaterial
                                    //     key={r.id}
                                    //     id={r.id}
                                    //     name={r.business_name}
                                    //     restLogo={r.business_image}
                                    //     description={r.business_description}
                                    //     delivery={r.ordr_delivery_time}
                                    //     type={[r.cuisine_type]}
                                    //     location={r.restaurant_address}
                                    //     priceCategory={r.starting_price}
                                    //     rating={r.rating}
                                    // />

                                <RestaurantCard
                                key={r.id}
                                id={r.id}
                                name={r.business_name}
                                restLogo={r.business_image}
                                description={r.business_description}
                                delivery={r.ordr_delivery_time}
                                type={[r.cuisine_id]}
                                location={r.restaurant_address}
                                priceCategory={r.starting_price}
                                startingPrice={r.starting_price}
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
