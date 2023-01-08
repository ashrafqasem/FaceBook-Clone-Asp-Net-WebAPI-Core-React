import { Profile } from "./profile";

export interface Activity {
    id: string;
    title: string;
    //date: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;

    // //'n
    // hostUserName?: string;
    // isCancelled?: boolean;
    // isGoing?: boolean;
    // isHost?: boolean;
    // host?: Profile;
    // activityAppUsers?: Profile[];

    //'n
    hostUserName: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    activityAppUsers: Profile[];
  }
  
  export class Activity implements Activity {
    constructor(activityFormValues?: ActivityFormValues) {
      Object.assign(this, activityFormValues);
    }
  }

  export class ActivityFormValues { //'n
    id?: string = undefined;
    title: string = '';
    date: Date | null = null;
    description: string = '';
    category: string = '';
    city: string = '';
    venue: string = '';

    constructor(activityFormValues?: ActivityFormValues) {
      if(activityFormValues) {
        this.id = activityFormValues.id;
        this.title = activityFormValues.title;
        this.date = activityFormValues.date;
        this.description = activityFormValues.description;
        this.category = activityFormValues.category;
        this.city = activityFormValues.city;
        this.venue = activityFormValues.venue;
      }
    }
  }