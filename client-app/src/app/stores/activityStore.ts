import { throws } from "assert";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';
import { Console } from "console";
import {format} from 'date-fns'

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

            const activities = await agent.Activities.List().then();

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

    createActivity = async (activity: Activity) => {
        this.loading = true;
        //activity.id = uuid(); //.

        // agent.Activities.create(activity).then(() => {
        //     setActivities([...activities, activity ]);
        //     setSelectedActivity(activity);
        //     setEditMode(false);
        //     setSubmitting(false);
        //   });

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities = [...this.activities, activity]; //.
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.loading= false
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading= false;
            });
        }

    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // //this.activities = this.activities.filter(x => x.id !== activity.id); //.
                // this.activities.filter(x => x.id !== activity.id); //'
                // this.activities.push(activity); //'
                //this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.loading= false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading= false;
            });
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

}

