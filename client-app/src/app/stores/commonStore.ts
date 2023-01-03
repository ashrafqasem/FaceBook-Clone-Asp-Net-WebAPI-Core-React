import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    serverError: ServerError | null = null;
    //serverError: string = ''; //.

    //token: string | null = null;
    token: string | null = localStorage.getItem('jwtToken'); //' n

    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction( //' n
            () => this.token,
            token_ => {
                if(token_) {
                    localStorage.setItem('jwtToken', token_);
                } else {
                    localStorage.removeItem('jwtToken');
                }
            }
        )  
    }

    setServerError(serverError: ServerError) {
        this.serverError = serverError
    }

    // setServerError(serverError: string) { //.
    //     this.serverError = serverError
    // }

    setToken = (token: string | null) => {
        this.token = token;

        // if(token) { //' nn sice we have reaction to  this.token = token; changes in CommonStore
        //     localStorage.setItem('jwtToken', token);
        // }
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

}