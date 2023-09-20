import {
    deleteRequest,
    getRequest, patchRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {getAllMenuItemsURI, editMenuItemURI, deleteMenuItemURI, getMenuItemByRestIdURI, addMenuItemURI} from "../endpoints";

export const getAllMenuItems = (params) => {
    return getRequest(`${getAllMenuItemsURI}/`);
}

export const getMenuItemByRestId = (params) => {
    const id = params.id;
    const reqURI = getMenuItemByRestIdURI.replace(':id', id);
    return getRequest(`${reqURI}`);
}

export const addNewMenuItem = (payload) => {
    return postFormDataRequest(addMenuItemURI, payload);
}

export const editMenuItem = (payload) => {
    const id = payload.id;
    const reqURI = getMenuItemByRestIdURI.replace(':id', id);
    return patchRequest(reqURI, payload);
}

export const deleteMenuItem = (payload) => {
    const id = payload.id;
    const reqURI = getMenuItemByRestIdURI.replace(':id', id);
    return deleteRequest(reqURI, payload);
}
