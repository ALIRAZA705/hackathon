import React, { useState, useEffect } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
} from "../../components/Component";
import {Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge, Spinner} from "reactstrap";
import { productData, categoryOptions } from "../pre-built/products/ProductData";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../components/Component";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBusiness, setUser} from "../../store/state/userInfo";
import {Box} from "@mui/material";

const RestaurantMenuRedirect = (props) => {
  const history = useHistory();
  const { search } = useLocation();
  console.log(" ::::::::::::::::: params" , search)
  const dispatch = useDispatch()
;
  const [businessId, setBusinessId] = useState(null)


  useEffect(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    // dispatch(setUser(user));
    if(user.busines){
      // dispatch(setBusiness(user.busines));
      setBusinessId(user.busines.id)
    }
    else window.location.href = "/404"
  },[])


  useEffect(()=>{
    if(businessId){
      console.log("here i am 111 1")
      window.location.href = `/restaurant/${businessId}/menu`
    }
    else if((window.location.search).length != 0){
      console.log("here i am 2")
      const id = (window.location.search).split("=")[1]
      window.location.href = `/restaurant/${id}/menu`
    }
    console.log("here i am 22222")
  },[businessId])




  return (
      <Box sx={{
        width: "100vw",
        height: "100vh",
        margin: "auto",
        paddingTop: "25%",
        paddingLeft: "50%"
        // textAlign: "center"
      }}>
        Please Wait...&nbsp;&nbsp;&nbsp;
        <Spinner size="sm" color="dark"/>
      </Box>
  );
};

export default RestaurantMenuRedirect;
