
export interface Shift {
    date: string;
    timeSlot: string;
  }
  
  export default interface Event {
    _id?:string
    name: string;
    images: (string | File | null)[];
    video: string | File | null;
    shifts: Shift[] | string |any;
    details: string;
    volunteerCount? : string | number
    city?:string
    is_online?:boolean
    location?: {
      lat: number; 
      lon: number;
    };
    volunteers?:[string];
  
  }
  