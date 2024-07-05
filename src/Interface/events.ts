
interface Shift {
    date: string;
    timeSlot: string;
  }
  
export default interface event {
    name: string;
    images: string[];
    video: string;
    shifts: Shift[];
    details: string;
  }