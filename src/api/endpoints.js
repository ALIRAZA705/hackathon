export const loginURI = 'login';
export const registerURI = 'register';
export const forgotPasswordURI = 'accountemail';
export const changePasswordReqURI = 'change_password';
export const editUserProfileURI = 'editprofile';

// Menu
export const getAllMenuItemsURI = 'product';
export const addMenuItemURI = 'restaurant_menue';
export const editMenuItemURI = `restaurant_menue/:id`;
export const deleteMenuItemURI = 'restaurant_menue/:id';
export const getMenuItemsByRestIdURI = `restaurant?business_id=:id`;

// Restaurant
export const getAllRestaurantsURI = 'restaurant';
export const addRestaurantURI = 'restaurants/add';
export const editRestaurantURI = 'restaurant/:id';
export const deleteRestaurantURI = 'product/delete';
export const getRestaurantByIdURI = `restaurant/:id`;

// Orders
// export const getAllOrdersURI = 'restaurants';
export const getOrdersByRestIdURI = `restaurant/:id/orders`;
export const addOrderByRestIdURI = 'restaurant/:id/orders';
export const editOrderURI = 'order/:id';
export const deleteOrderURI = 'order/:id';
