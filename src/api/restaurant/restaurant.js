import {
    deleteRequest,
    getRequest, patchRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {
    getAllRestaurantsURI,
    editRestaurantURI,
    deleteRestaurantURI,
    getRestaurantByIdURI,
    addRestaurantURI,
    getMenuItemByRestIdURI
} from "../endpoints";

export const getAllRestaurants = (params) => {
    return getRequest(`${getAllRestaurantsURI}`);
}

export const getRestaurantById = (params) => {
    const id = params.id;
    const reqURI = getRestaurantByIdURI.replace(':id', id);
    return getRequest(`${reqURI}`);
}

export const addRestaurant = (payload) => {
    return postRequest(addRestaurantURI, payload);
}

export const editRestaurant = (payload) => {
    const id = payload.id;
    const reqURI = editRestaurantURI.replace(':id', id);
    return postFormDataRequest(reqURI, payload);
}

export const deleteRestaurant = (payload) => {
    const id = payload.id;
    const reqURI = deleteRestaurantURI.replace(':id', id);
    return deleteRequest(reqURI, payload);
}
