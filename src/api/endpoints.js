export const loginURI = 'auth/login';
export const registerURI = 'register';
export const forgotPasswordURI = 'accountemail';
export const changePasswordReqURI = 'change_password';
export const editUserProfileURI = 'editprofile';

// Menu
export const getAllMenuItemsURI = 'product';
export const addMenuItemURI = 'restaurant_menue';
export const editMenuItemURI = `restaurant_menue/:id`;
export const deleteMenuItemURI = 'restaurant_menue/:id';
export const getMenuItemsByRestIdURI = `domains/list`;

// Restaurant
export const getAllRestaurantsURI = 'restaurant';
export const addRestaurantURI = 'restaurants/add';
export const editRestaurantURI = 'restaurant/:id';
export const deleteRestaurantURI = 'product/delete';
export const getRestaurantByIdURI = `restaurant/:id`;

// Orders
// export const getAllOrdersURI = 'restaurants';
export const getOrdersByRestIdURI = `users?category=all`;
export const addOrderByRestIdURI = 'restaurant/:id/orders';
export const changeOrderStatusURI = 'change_order_status/:id';
export const deleteOrderURI = 'order/:id';

// rider
export const getAllRidersURI = 'rider_list';
export const changeRidersStatusURI = 'change_rider_status/:id';

// MISC
export const getDomains = 'domains/list';
export const addNewDomainURI = 'domains';
export const getCuisineList = 'asdasd';
export const getDomainDataByIdURI = 'domains';

export const addNewUSerURI = 'users';
