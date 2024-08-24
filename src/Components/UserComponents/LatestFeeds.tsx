import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import Slider from 'react-slick';
import { getAllPosts, isLiked, likePost, addComment, getComments } from '../../Api/userApi';
import { formatDistanceToNow } from 'date-fns';
import Modal from './CommentModal'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import toast from 'react-hot-toast';

interface Post {
  _id: string;
  image: string;
  title: string;
  description: string;
  postedDate: Date;
  userId: { name: string, profileImage: string };
  totalLiked: number;
  liked: boolean;
  likes?: [number];
}

interface Comment {
  _id: string;
  message: string;
  userId: { name: string, profileImage: string };
  createdAt: Date;
}

const LatestFeeds: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        const fetchedData = response?.posts || [];
        const postsWithLikes = await Promise.all(
          fetchedData.map(async (post: Post) => {
            const likedResponse = await isLiked(post._id);
            return { ...post, liked: likedResponse?.data?.post || false };
          })
        );
        setPosts(postsWithLikes);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (id: string, index: number) => {
    try {
      const response = await likePost(id);
      toast.success('Cheers ✨');
      if (response) {
        setPosts(prevPosts => {
          const updatedPosts = [...prevPosts];
          updatedPosts[index].liked = !updatedPosts[index].liked;
          updatedPosts[index].totalLiked = updatedPosts[index].liked
            ? updatedPosts[index].totalLiked + 1
            : updatedPosts[index].totalLiked - 1;
          return updatedPosts;
        });
      }
    } catch (error) {
      console.error('Failed to like/unlike post:', error);
    }
  };

  const handleCommentClick = async (postId: string) => {
    setActivePostId(postId);
    try {
      const response = await getComments(postId);
      setComments(response?.data || []);
      setShowCommentModal(true);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (activePostId && newComment.trim() !== '') {
      try {
        await addComment(activePostId, newComment);
        toast.success("Yaay, Your comment has been added");
        setNewComment('');
        const response = await getComments(activePostId);
        setComments(response?.data || []);
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    adaptiveHeight: true,
  };

  return (
    <section className="py-16 font-inter flex justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-5xl font-bold text-center mb-8">Latest Feeds</h2>
        {posts.length > 0 ? (
          <Slider {...settings}>
            {posts.map((post, index) => (
              <div key={post._id} className="p-2">
                <article className="group">
                  <img
                    alt={post.title}
                    src={post.image}
                    className="h-72 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                  />
                  <div className="p-4">
                    <div className='flex items-start'>
                      <img
                        src={post?.userId?.profileImage || ''}
                        alt={post?.userId?.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(post.postedDate), { addSuffix: true })}</p>
                      </div>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                      {post.description}
                    </p>
                    <div className="flex justify-end mt-4">
                      <button className="mr-4" onClick={() => handleLike(post._id, index)} aria-label='heart-regular'>
                        <FontAwesomeIcon icon={post.liked ? solidHeart : regularHeart} size="lg" className={`${post.liked ? 'text-red-600' : 'text-blue-600'}`} />
                      </button>
                      <button onClick={() => handleCommentClick(post._id)} aria-label='comment'>
                        <FontAwesomeIcon icon={faComment} size="lg" className="text-blue-600" />
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-500">No posts available</p>
        )}
      </div>
      {showCommentModal && (
        <Modal onClose={() => setShowCommentModal(false)}>
          <div className="max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2 sticky top-0 bg-white z-10">Recent Comments</h2>
            <ul className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <li key={comment._id} className="py-2">
                  <div className="flex items-center space-x-2">
                    <img src={comment.userId.profileImage} alt={comment.userId.name} className="w-8 h-8 rounded-full" />
                    <p className="text-sm font-medium">{comment.userId.name}</p>
                  </div>
                  <p className="text-sm">{comment.message}</p>
                  <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.createdAt))} ago</p>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2 mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Add your comment..."
              ></textarea>
              <button
                type='button'
                aria-label='telegram'
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTelegramPlane} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default LatestFeeds;
