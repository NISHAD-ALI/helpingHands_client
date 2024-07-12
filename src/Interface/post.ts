
interface Comment {
    _id?: string;
    userId: string;
    content: string;
    createdAt?: Date;
}

interface Post {
    _id?: string;
    userId: {
        _id:string;
        name:string;
        profileImage:string
    };
    title: string;
    image: string;
    likes?: string[];
    comments?: Comment[];
    postedDate?: Date | any;
    liked?:boolean;
    totalLiked?: any; 
}

export default Post;
