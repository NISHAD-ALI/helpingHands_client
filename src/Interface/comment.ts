interface Comment {
    id: string;
    userId: {
      name: string;
      profileImage: string;
    };
    message: string;
    createdAt: Date;
  }

  export default Comment