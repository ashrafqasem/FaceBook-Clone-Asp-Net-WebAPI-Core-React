import { throws } from "assert";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import {v4 as uuid} from 'uuid';
import { Console } from "console";
import {format} from 'date-fns'
import { store } from "./store";
import { Profile } from "../models/profile";
import { getWeekYearWithOptions } from "date-fns/fp";
import { router } from "../router/Routes";

export default class ActivityStore {
    title = 'Hello from MobX!'; //. test nn
    //activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();

    //selectedActivity: Activity | null = null; //'
    selectedActivity: Activity | undefined = undefined; //'
    //selectedActivity: Activity = undefined; //'

    editMode = false;
    loading = false;

    //loadingInitial = false;
    //loadingInitial = true;
    loadingInitial = false;

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     // setTitle: action.bound
        //     setTitle: action
        // })
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => 
            //Date.parse(a.date) - Date.parse(b.date)
            a.date!.getTime() - b.date!.getTime()
        );
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                //const date = activity.date;
                // const date = activity.date!.toISOString().split('T')[0];
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    // setTitle() {
    //     this.title = this.title + '!';
    // }

    setTitle = () => { //. test nn
        this.title = this.title + '!';
    }

    loadActivities = async () => {
        //this.loadingInitial = true;
        //this.setLoadingInitial(true);
        this.setLoadingInitial(true);

        try {

            // agent.Activities.List().then(response => {
            // //Fix for Date
            // let activities: Activity[] = [];
            // response.forEach(activity => {
            //     activity.date = activity.date.split('T')[0];
            //     activities.push(activity);
            // });

            const activities = await agent.Activities.list().then();

            //console.log(activities); //.

            // //Fix for Date
            // activities.forEach(activity => {
            //     activity.date = activity.date.split('T')[0];
            //     this.activities.push(activity);
            // });
            // this.loadingInitial = false;
            
            // runInAction(() => { //. https://mobx.js.org/actions.html#asynchronous-actions
            //     //Fix for Date
            //     activities.forEach(activity => {
            //         activity.date = activity.date.split('T')[0];
            //         this.activities.push(activity);
            //     });
            //     this.loadingInitial = false;
            // });

            //Fix for Date
            activities.forEach(activity => {
                // activity.date = activity.date.split('T')[0];
                // //this.activities.push(activity);
                // this.activityRegistry.set(activity.id, activity);
                this.setActivity(activity);
            });
            
            //this.loadingInitial = false;
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            
            //this.loadingInitial = false;

            // runInAction(() => { //. https://mobx.js.org/actions.html#asynchronous-actions
            //     this.loadingInitial = false;
            // });

            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        // if (id) { //.
        //     try {
        //         this.selectedActivity =  this.activityRegistry.get(id);

        //         if (!this.selectedActivity) {
        //             this.selectedActivity = await agent.Activities.details(id);
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);

                runInAction(() => {
                    this.selectedActivity = activity; //. //'
                })
               
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        //activity.date = activity.date.split('T')[0];
        activity.date = new Date(activity.date!);

        //'n
        const user = store.userStore.user; 
        if(user) {
            activity.isGoing = activity.activityAppUsers!.some(x => x.userName === user.userName);
            activity.isHost = activity.hostUserName === user.userName;
            activity.host = activity.activityAppUsers?.find(x => x.userName === activity.hostUserName)
        }
        //'n

        //this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // // function handleSelectActivity(id: string) {
    // //     setSelectedActivity(activities.find(x => x.id === id));
    // // }
    // selectActivity = (id: string) => {
    //    //this.selectedActivity = this.activities.find(x => x.id === id);
    //    this.selectedActivity = this.activityRegistry.get(id);
    // }

    // // function handleCancelSelectActivity() {
    // //     setSelectedActivity(undefined);
    // // }
    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // // function handleFormOpen(id?: string) {
    // //     id ? handleSelectActivity(id) : handleCancelSelectActivity();
    // //     setEditMode(true);
    // //     //setSelectedActivity(undefined);
    // // }
    // formOpen = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // // function handleFormClose() {
    // //     setEditMode(false);
    // // }
    // formClose = () => {
    //     this.editMode = false;
    // }

    // function handleCearteOrEditeActivity(activity: Activity) {
    //   // activity.id 
    //   //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    //   //   : setActivities([...activities, {...activity, id: uuid()} ]);
        
    //  setSubmitting(true);

    //   if (activity.id) {
    //     agent.Activities.update(activity).then(() => {
    //       setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    //       setSelectedActivity(activity);
    //       setEditMode(false);
    //       setSubmitting(false);
    //     });
    //   } else {
    //     activity.id = uuid();
    //     agent.Activities.create(activity).then(() => {
    //       setActivities([...activities, activity ]);
    //       setSelectedActivity(activity);
    //       setEditMode(false);
    //       setSubmitting(false);
    //     });
    //   }
    // }

    //createActivity = async (activity: Activity) => { 
    createActivity = async (activity: ActivityFormValues) => { //'n
        //this.loading = true; // nn, use isSubmitting flag from Formik
        //activity.id = uuid(); //.

        // agent.Activities.create(activity).then(() => {
        //     setActivities([...activities, activity ]);
        //     setSelectedActivity(activity);
        //     setEditMode(false);
        //     setSubmitting(false);
        //   });

        const user = store.userStore.user; //'n
        const attendee = new Profile(user!); //'n
        
        try {
            await agent.Activities.create(activity);

            //'n
            const newActivity = new Activity(activity);
            newActivity.hostUserName = user!.userName;
            newActivity.activityAppUsers = [attendee];

            this.setActivity(newActivity);
            //'n

            runInAction(() => {
                //this.activities = [...this.activities, activity]; //.
                //this.activities.push(activity);

                //this.activityRegistry.set(activity.id, activity); //' nn >> since we used this.setActivity(newActivity);

                //this.selectedActivity = activity;
                this.selectedActivity = newActivity; //'n

                // this.editMode = false; //' nn
                // this.loading= false //' nn
            });

        } catch (error) {
            console.log(error);

            // runInAction(() => { // No need, use isSubmitting flag from Formik
            //     this.loading= false;
            // });
        }

    }

    //updateActivity = async (activity: Activity) => {
    updateActivity = async (activity: ActivityFormValues) => { //'n
        //this.loading = true; // nn, use isSubmitting flag from Formik

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id) {
                    // //this.activities = this.activities.filter(x => x.id !== activity.id); //.
                    // this.activities.filter(x => x.id !== activity.id); //'
                    // this.activities.push(activity); //'
                    //this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];

                    let updatedActivity = {...this.getActivity(activity.id), ...activity} //'n

                    //this.activityRegistry.set(activity.id, activity);
                    this.activityRegistry.set(activity.id, updatedActivity as Activity); //'n
                   
                    //this.selectedActivity = activity;
                    this.selectedActivity = updatedActivity as Activity; //'n

                    // this.editMode = false; //' nn
                    // this.loading= false //' nn
                }
            })
        } catch (error) {
            console.log(error);

            // runInAction(() => { // nn, use isSubmitting flag from Formik
            //     this.loading= false;
            // });
        }
    }

    // function handleDeleteActivity(id: string) {
    //     setSubmitting(true);
    
    //     //setActivities([...activities.filter(x => x.id !== id)]);
    //     if (id) {
    //       agent.Activities.delete(id).then(() => {
    //         setActivities([...activities.filter(x => x.id !== id)]);
    //         setSubmitting(false);
    //       })
    //     }
    // }

    deleteActivity = async (id: string) => {
        this.loading = true;

        if (id) {
            try {
                await agent.Activities.delete(id);

                runInAction(() => {
                    //his.activities = [...this.activities.filter(x => x.id !== id)];
                    this.activityRegistry.delete(id);

                    // if (this.selectedActivity?.id === id) { 
                    //     this.cancelSelectedActivity(); 
                    // }

                    this.loading = false;
                });
            } catch (error) {
                console.log(error);
                runInAction(() => {
                    this.loading= false;
                });
            }
        }
    }

    updateAttendanceToggle = async () => {
        this.loading = true;
        const user = store.userStore.user;

        try {
            await agent.Activities.attend(this.selectedActivity!.id);

            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.activityAppUsers = this.selectedActivity.activityAppUsers?.filter(x => x.userName !== user?.userName);
                    this.selectedActivity.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.activityAppUsers?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }

                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);

            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
                //router.navigate(`/activities/${this.selectedActivity!.id}`); // not working
                window.location.reload(); // it works
            })
        }
    }

    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction (() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}

