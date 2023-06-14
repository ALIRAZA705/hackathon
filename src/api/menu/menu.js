import {
    deleteRequest,
    getRequest, patchRequest,
    postRequest
} from "../methodCalls";
import {getAllMenuItemsURI, editMenuItemURI, deleteMenuItemURI, getMenuItemByRestIdURI, addMenuItemURI} from "../endpoints";

export const getAllMenuItems = (params) => {
    return getRequest(`${getAllMenuItemsURI}/`);
}

export const getMenuItemByRestId = (params) => {
    return getRequest(`${getMenuItemByRestIdURI}/`);
}

export const addNewMenuItem = (payload) => {
    return postRequest(addMenuItemURI, payload);
}

export const editMenuItem = (payload) => {
    return patchRequest(editMenuItemURI, payload);
}

export const deleteMenuItem = (payload) => {
    return deleteRequest(deleteMenuItemURI, payload);
}
