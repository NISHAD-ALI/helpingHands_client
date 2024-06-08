
interface user{
    _id:string,
    name:string,
    email:string,
    address:string,
    phone:number,
    is_blocked: boolean,
    password: string,
    profileImage:string,
    posts:[any],
    donationsFund:number,
    donationsEssentials:number,

}
export default user