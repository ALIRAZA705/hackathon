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
    getMenuItemByRestIdURI, changeRidersStatusURI, getAllRidersURI
} from "../endpoints";

export const getAllRiders = () => {
    return getRequest(`${getAllRidersURI}`);
}

export const changeRidersStatus = (params) => {
    const id = params.id;
    const reqURI = changeRidersStatusURI.replace(':id', id);
    return postFormDataRequest(`${reqURI}`, {user_status: params.user_status});
}
