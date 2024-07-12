interface community{
    _id:string,
    email:string,
    name:string,
    phone:number,
    password:string,
    volunteers: { volunteerId: string; is_accepted: boolean }[];
    profileImage:string,
    about:string,
    events:[string],
    is_blocked:boolean,
    defaultConversation:string
    description?:string
}

export default community