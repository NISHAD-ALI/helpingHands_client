import React from 'react';

interface PostCardProps {
  image: string;
  description: string;
  postedDate: string;
}

const PostCard: React.FC<PostCardProps> = ({ image, description, postedDate }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={image} alt="Post" className="w-full h-auto rounded-lg mb-4" />
      <p className="mb-2">{description}</p>
      <p className="text-gray-500 text-sm">{postedDate}</p>
      <div className="flex space-x-4 mt-2">
        <button className="text-blue-600">
          <i className="far fa-thumbs-up"></i> Like
        </button>
        <button className="text-blue-600">
          <i className="far fa-comment"></i> Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
