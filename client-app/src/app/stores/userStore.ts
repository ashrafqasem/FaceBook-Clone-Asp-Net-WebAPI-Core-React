import { isThursday } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user; //' to caxt object to boolient
    }
   
    login = async (userFormValues: UserFormValues) => {
        try{
            const userResponce = await agent.Account.login(userFormValues);
            console.log(userResponce);

            store.commonStore.setToken(userResponce.token);

            runInAction(() => { //' -> becouse we used await and we awaited
                this.user = userResponce;
            });

            router.navigate('/activities');

            store.modalStore.closeModal(); //' n
        } catch(error) {
            console.log(error);
            throw error; //' n for Yup
        }
    }

    logout = () => {
        store.commonStore.setToken(null);

        //localStorage.removeItem('jwtToken'); //' nn sice we have reaction to  this.token = token; changes in CommonStore
        
        this.user = null;
        router.navigate('/'); //' -> Homepage
    }

    register = async (userFormValues: UserFormValues) => {
        try{
            const userResponce = await agent.Account.register(userFormValues);
            console.log(userResponce);

            store.commonStore.setToken(userResponce.token); //' n

            runInAction(() => { //' -> becouse we used await and we awaited
                this.user = userResponce;
            });

            router.navigate('./activities'); //'n
            store.modalStore.closeModal(); //' n
        } catch(error) {
            console.log(error);
            throw error; //' n for Yup
        }
    }

    getUser = async () => {
        try {
            const userResponce = await agent.Account.current();
            console.log(userResponce);

            runInAction(() => { //' -> becouse we used await and we awaited
                this.user = userResponce;
            });
        } catch (error) {
            console.log(error);
        }
    }

}