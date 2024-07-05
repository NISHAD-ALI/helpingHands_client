
interface Comment {
    _id?: string;
    userId: string;
    content: string;
    createdAt?: Date;
}

interface Post {
    _id?: string;
    userId: string;
    title: string;
    image: string;
    likes?: string[];
    comments?: Comment[];
    postedDate?: Date;
}

export default Post;
