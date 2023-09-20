import {
    deleteRequest,
    getRequest, patchRequest,
    postRequest
} from "../methodCalls";
import {getAllRestaurantsURI, editRestaurantURI, deleteRestaurantURI, getRestaurantByIdURI, addRestaurantURI} from "../endpoints";

export const getAllRestaurants = (params) => {
    return getRequest(`${getAllRestaurantsURI}/`);
}

export const getRestaurantById = (params) => {
    const id = params.id;
    return getRequest(`${getRestaurantByIdURI}/`);
}

export const addRestaurant = (payload) => {
    return postRequest(addRestaurantURI, payload);
}

export const editRestaurant = (payload) => {
    const id = payload.id;
    return patchRequest(editRestaurantURI, payload);
}

export const deleteRestaurant = (payload) => {
    const id = payload.id;
    return deleteRequest(deleteRestaurantURI, payload);
}
