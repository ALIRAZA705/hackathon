import React, { useContext, useEffect, useState } from "react";
// import "../../fonts/font.css"
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import "./restaurants.css"
import {
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    UncontrolledDropdown,
    Modal,
    ModalBody,
    DropdownItem,
    Form, Card,
} from "reactstrap";
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
// import { filterRole, filterStatus, userData } from "./UserData";
import { bulkActionOptions, findUpper } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantCardMaterial from "../components/RestaurantCardMaterial";
// import { UserContext } from "./UserContext";

const Restaurants = () => {

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
                        <RestaurantCardMaterial/>
                        <RestaurantCardMaterial/>
                        <RestaurantCardMaterial/>
                        <RestaurantCardMaterial/>
                        <RestaurantCardMaterial/>
                    </Block>
                </div>

            </Content>
        </React.Fragment>
    );
};
export default Restaurants;
