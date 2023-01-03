import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { Activity } from '../models/activity';
import { User, UserFormValues } from '../models/user';
import { router } from '../router/Routes';
import { store } from '../stores/store';

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
    // try {
    //     await sleep(1000);
    //     return response;
    // } catch (error) {
    //     console.log(error);
    //     return await Promise.reject(error);
    // }

    await sleep(1000);
    return response;
//})
}, (axiosError: AxiosError) => {
    //const {data, status} = axiosError.response!; //' x
    const {data, status, config} = axiosError.response as AxiosResponse;

    switch(status) {
        case 400:

            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-faund')
            }

            toast.error('Bad request!');
            if(data.errors) {
                const modalStatErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStatErrors.push(data.errors[key]);
                    }
                }

                throw modalStatErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401: 
            toast.error('Unauthorised!');
            break;
        case 403: 
            toast.error('Forbidden!');
            break;
        case 404: 
            toast.error('Not found!');
            router.navigate('/not-found');
            break;
        case 500: 
            toast.error('Server error!');
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
        // default:
        //     break;
    }

    return Promise.reject(axiosError);
})

axios.interceptors.request.use(config => { //' n  -> to pass token to the request header to getUser 
    const token = store.commonStore.token;
    if(token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
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

let controlerNameActivities = '/activities';
const Activities = {
    //list: () => request.get('/activities')
    list: () => request.get<Activity[]>(controlerNameActivities),
    details: (id: string) => request.get<Activity>(controlerNameActivities + '/' + id),
    create: (activity: Activity) => request.post<void>(controlerNameActivities, activity),
    update: (activity: Activity) => request.put<void>(controlerNameActivities +'/' + activity.id, activity),
    delete: (id: string) => request.del<void>(controlerNameActivities + '/' + id)
}

let controlerNameAccount = '/account'; //.
const Account = { //.
    login: (userFormValues: UserFormValues) => request.post<User>(controlerNameAccount + '/login', userFormValues),
    register: (userFormValues: UserFormValues) => request.post<User>(controlerNameAccount + '/Register', userFormValues),
    //current: () => request.get<User>(controlerNameAccount + '/GetCurrentUser'), //. x
    current: () => request.get<User>(controlerNameAccount), //' k
}

const agent = {
    Activities,
    Account, //.
}

export default agent;

