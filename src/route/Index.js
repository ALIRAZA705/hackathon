import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { RedirectAs404 } from "../utils/Utils";

import Sales from "../pages/Sales";
import MenuList from "../pages/others/MenuList"
import Restaurants from "../pages/others/Restaurants";
import AddMenuPage from "../pages/others/AddMenuPage";
import Orders from "../pages/others/Orders";
import Bookings from "../pages/others/Bookings";
import DeliveredOrders from "../pages/others/DeliveredOrders";
import PreparingOrders from "../pages/others/PreparingOrders";
import RestaurantMenuRedirect from "../pages/others/RestaurantMenuRedirect";
import DispatchedOrders from "../pages/others/DispatchedOrders";
import ReadyOrders from "../pages/others/ReadyOrders";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Sales}></Route>

        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/restaurants`}
          render={() => (
            <UserContextProvider>
              <Restaurants />
              {/*<UserListRegularPage />*/}
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/restaurant/menu`} component={RestaurantMenuRedirect}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/restaurant/:id/menu`} component={MenuList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/restaurant/:id/menu/add`} component={AddMenuPage}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/orders`} component={Orders}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders/preparing`} component={PreparingOrders}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders/ready`} component={ReadyOrders}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders/dispatched`} component={DispatchedOrders}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orders/delivered`} component={DeliveredOrders}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/bookings`} component={Bookings}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Sales}></Route>

        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
