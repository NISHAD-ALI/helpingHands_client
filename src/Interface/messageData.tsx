export interface MessageData {
    sender: {
      _id: string;
      name: string;
      profileImage: string;
    };
    group:  any
    content: string;
    conversation: string;
    communityId: string;
    timestamp: string;
  }
  