import {
    deleteRequest,
    getRequest, patchRequest,
    postRequest
} from "../methodCalls";
import {getOrdersByRestIdURI, addOrderByRestIdURI, editOrderURI, deleteOrderURI} from "../endpoints";


export const getOrdersByRestId = (params) => {
    const id = params.id;
    const reqURI = getOrdersByRestIdURI.replace(':id', id);
    return getRequest(`${reqURI}`);
}

export const addOrderByRestId = (payload) => {
    const id = payload.id;
    const reqURI = addOrderByRestIdURI.replace(':id', id);
    return postRequest(`${reqURI}`, payload);
}

export const editOrder = (payload) => {
    const id = payload.id;
    const reqURI = editOrderURI.replace(':id', id);
    return patchRequest(reqURI, payload);
}

export const deleteOrder = (payload) => {
    const id = payload.id;
    const reqURI = deleteOrderURI.replace(':id', id);
    return deleteRequest(reqURI, payload);
}

