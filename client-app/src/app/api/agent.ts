import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    }) 
}

// axios.interceptors.response.use(response => {
//     return sleep(1000).then(() => {
//         return response;
//     }).catch((error) => {
//         console.log(error);
//         return Promise.reject(error);
//     })
// })

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

axios.defaults.baseURL = 'http://localhost:5000/api';

//const responseBody = (response: AxiosResponse) => response.data;
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    //get: (url: string) => axios.get(url).then(responseBody),
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

let controlerName = '/activities';
const Activities = {
    //List: () => request.get('/activities')
    List: () => request.get<Activity[]>(controlerName),
    details: (id: string) => request.get<Activity>(controlerName + '/' + id),
    create: (activity: Activity) => request.post<void>(controlerName, activity),
    update: (activity: Activity) => request.put<void>(controlerName +'/' + activity.id, activity),
    delete: (id: string) => request.del<void>(controlerName + '/' + id)
}

const agent = {
    Activities
}

export default agent;

