export const loginURI = 'login';
export const registerURI = 'register';

// Menu
export const getAllMenuItemsURI = 'product';
export const addMenuItemURI = 'product/create';
export const editMenuItemURI = `product/:id/edit`;
export const deleteMenuItemURI = 'product/delete';
export const getMenuItemByRestIdURI = `restaurant/:id/product`;

// Restaurant
export const getAllRestaurantsURI = 'restaurants';
export const addRestaurantURI = 'restaurants/add';
export const editRestaurantURI = 'restaurant/edit';
export const deleteRestaurantURI = 'product/delete';
export const getRestaurantByIdURI = `restaurant/:id`;

// Orders
// export const getAllOrdersURI = 'restaurants';
export const getOrdersByRestIdURI = `restaurant/:id/orders`;
export const addOrderByRestIdURI = 'restaurant/:id/orders';
export const editOrderURI = 'order/:id';
export const deleteOrderURI = 'order/:id';
