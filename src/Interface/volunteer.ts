

interface volunteer {
    _id: string,
    name: string,
    email: string,
    address: string,
    phone: number,
    is_blocked: boolean,
    password: string,
    profileImage: string,
    events: [string],
    bloodGroup: string,
    about:string,
    communities:[string],

}

export default volunteer