import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/ServerError";

export default class CommonStore {
    //serverError: ServerError | null = null;
    serverError: string = ''; //.

    constructor() {
        makeAutoObservable(this);
    }

    // setServerError(serverError: ServerError) {
    //     this.serverError = serverError
    // }

    setServerError(serverError: string) { //.
        this.serverError = serverError
    }

}