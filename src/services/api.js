import axios from 'axios';

const baseUrl = "https://lendingpageapi.azurewebsites.net/";

export const apiCall = (endPoint,data,headers,method) => axios({
    method,
    data,
    headers,
    url: baseUrl+endPoint
});



