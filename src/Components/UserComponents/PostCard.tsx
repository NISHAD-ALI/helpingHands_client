import React, { useEffect, useState } from 'react';
import { FaHeart, FaComment, FaEllipsisV } from 'react-icons/fa';
import { addComment, getComments, getPostsOne, isLiked, likePost } from '../../Api/userApi';
import { formatDistanceToNow } from 'date-fns';
import Modal from './CommentModal'; 


interface PostCardProps {
  id: string;
  image: string;
  description: string;
  postedDate: Date;
  onEdit: () => void;
  onDelete: () => void;
  initialTotalLiked: number;
  
}

const PostCard: React.FC<PostCardProps> = ({ image, description, postedDate, onEdit, onDelete, id, initialTotalLiked }) => {
  const [liked, setLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [totalLiked, setTotalLiked] = useState(initialTotalLiked);
  const [commented, setCommented] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments,setComments] = useState([])
  const formattedDate = postedDate ? formatDistanceToNow(new Date(postedDate), { addSuffix: true }) : 'Date not Provided';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await isLiked(id);
        if (response?.data.post) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getComments(id);
        const fetchedData = response?.data;
        console.log(fetchedData);
        setComments(fetchedData)
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);
  const handleCommentClick = () => {
    setCommented(!commented);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleLike = async (id: string) => {
    try {
      const response = await likePost(id);
      if (response) {
        setLiked(!liked);
        setTotalLiked(prevTotalLiked => liked ? prevTotalLiked - 1 : prevTotalLiked + 1);
      }
    } catch (error) {
      console.error('Failed to like/unlike post:', error);
    }
  };

  const handleCommentAdd = async() => {
    if (newComment.trim() !== '') {
      const response = await addComment(id,newComment)
      if(response){
        setNewComment('');
        const updatedComments = await getComments(id);
        setComments(updatedComments?.data);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 relative">
      <img src={image} alt="Post" className="w-full h-auto rounded-lg mb-4" />
      <p className="mb-2 font-medium">{description}</p>
      <p className="mb-2 text-sm">Liked by <span className='font-semibold'>{totalLiked}</span> users</p>
      <p className="text-gray-500 text-sm">{formattedDate}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4">
          <button
            className={`text-lg transition-colors duration-300 ${liked ? 'text-red-600' : 'text-blue-600'}`}
            onClick={() => handleLike(id)}
          >
            <FaHeart />
          </button>
          <button
            className={`text-lg transition-colors duration-300 ${commented ? 'text-red-600' : 'text-blue-600'}`}
            onClick={handleCommentClick}
          >
            <FaComment />
          </button>
        </div>
        <button onClick={toggleOptions}>
          <FaEllipsisV />
        </button>
        {showOptions && (
          <div className="absolute right-0 bottom-12 bg-white shadow-md rounded-lg py-1 w-32">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={onEdit}>
              Edit Post
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={onDelete}>
              Delete Post
            </button>
          </div>
        )}
      </div>

      {commented && (
        <Modal onClose={() => setCommented(false)}>
          <div className="max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2 sticky top-0 bg-white z-10">Recent Comments</h2>
            <ul className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <li key={comment.id} className="py-2">
                  <div className="flex items-center space-x-2">
                    <img src={comment.userId.profileImage} alt={comment.userId.name} className="w-8 h-8 rounded-full" />
                    <p className="text-sm font-medium">{comment.userId.name}</p>
                  </div>
                  <p className="text-sm">{comment.message}</p>
                  <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</p>
                </li>
              ))}
            </ul>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-4"
              placeholder="Add your comment..."
            ></textarea>
            <button
              onClick={handleCommentAdd}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default PostCard;
