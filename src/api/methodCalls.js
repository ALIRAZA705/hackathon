import axiosClient from "./apiClient";

export function getRequest(URL) {
    return axiosClient.get(`/${URL}`).then(response => response).catch(err => err);
}

export function postRequest(URL, payload) {
    return axiosClient.post(`/${URL}`, payload).then(response => response).catch(err => err);
}

export function patchRequest(URL, payload) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response).catch(err => err);
}

export function deleteRequest(URL) {
    return axiosClient.delete(`/${URL}`).then(response => response).catch(err => err);
}