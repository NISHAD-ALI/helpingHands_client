import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart,faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { addComment, getAllPosts, getComments, isLiked, likePost, reportPost } from '../../Api/userApi';
import { formatDistanceToNow } from 'date-fns';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from './CommentModal';
import toast, { Toaster } from 'react-hot-toast';
interface Post {
  _id: string;
  image: string;
  title: string;
  description: string;
  postedDate: Date;
  userId: { name: string; profileImage: string };
  totalLiked: number;
  liked: boolean;
}

interface Comment {
  _id: string;
  userId: { name: string; profileImage: string };
  message: string;
  createdAt: Date;
}

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [commented, setCommented] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>({});
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        const fetchedData = response?.posts || [];
        const postsWithLikes = await Promise.all(
          fetchedData.map(async (post: Post) => {
            const likedResponse = await isLiked(post._id);
            return { ...post, liked: likedResponse?.data?.post || false, totalLiked: post.totalLiked || 0 };
          })
        );

        const sortedPosts = postsWithLikes.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        setPosts(sortedPosts);
        setDisplayedPosts(sortedPosts.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (id: string) => {
    try {
      setPosts(prevPosts => {
        const updatedPosts = prevPosts.map(post =>
          post._id === id ? { ...post, liked: !post.liked, totalLiked: post.liked ? post.totalLiked - 1 : post.totalLiked + 1 } : post
        );
        return updatedPosts;
      });

      setDisplayedPosts(prevDisplayedPosts => {
        const updatedDisplayedPosts = prevDisplayedPosts.map(post =>
          post._id === id ? { ...post, liked: !post.liked, totalLiked: post.liked ? post.totalLiked - 1 : post.totalLiked + 1 } : post
        );
        return updatedDisplayedPosts;
      });

      await likePost(id);
      toast.success('Cheers ✨')
    } catch (error) {
      console.error('Failed to like/unlike post:', error);
    }
  };

  useEffect(() => {
    if (currentPostId) {
      const fetchComments = async () => {
        try {
          const response = await getComments(currentPostId);
          const fetchedData = response?.data || [];
          
          setComments(fetchedData);
        } catch (error) {
          console.error('Failed to fetch comments:', error);
        }
      };

      fetchComments();
    }
  }, [currentPostId]);

  const handleLoadMore = () => {
    setShowAll(true);
    setDisplayedPosts(posts);
  };

  const handleCommentClick = (postId: string) => {
    setCurrentPostId(postId);
    setCommented(true);
  };

  const handleCommentAdd = async () => {
    if (newComment.trim() !== '' && currentPostId) {
      try {
        const response = await addComment(currentPostId, newComment);
        if (response) {
          setNewComment('');
          toast.success("Yaay, You,re comment has been added")
          const updatedComments = await getComments(currentPostId);
          setComments(updatedComments?.data);
        }
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const toggleDropdown = (postId: string) => {
    setShowDropdown(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const handleReport = (postId: string) => {
    setShowReportModal(true);
    setCurrentPostId(postId);
    setShowDropdown({});
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleReportModalClose = () => {
    setShowReportModal(false);
    setReportReason('');
    setOtherReason('');
    setCurrentPostId(null);
  };

  const handleReportSubmit = async() => {
    console.log(`Reported post ${currentPostId} for reason: ${reportReason}`);
    if (reportReason === 'other') {
      console.log(`Other reason provided: ${otherReason}`);
      const response = await reportPost(currentPostId as string,otherReason)
      if(response){
        console.log(response)
        toast.success("You've Reported this post")
      }
    }else{
      const reponse = await reportPost(currentPostId as string,reportReason)
      if(reponse){
        console.log(reponse)
        toast.success("You've Reported this post")
      }
    }
   
    handleReportModalClose();
  };

  return (
    <section className="py-16 font-inter relative">
      <div className={`w-full sticky top-0 z-10 mx-auto transition-all duration-300 ${isSticky ? 'bg-green-100 shadow-md' : ''}`}>
        <h2 className="text-3xl font-bold text-center py-4 mb-8">Latest Feeds</h2>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-around z-10">
          {displayedPosts.map((post) => (
            <div
              key={post._id}
              className="max-w-sm w-full bg-white shadow-md m-2 rounded-lg overflow-hidden relative"
              style={{
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                zIndex: 1
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.userId.profileImage || 'default-profile.png'}
                      alt={post.userId.name}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{post.userId.name}</h4>
                    </div>
                  </div>
                  <div className="relative">
                    <button onClick={() => toggleDropdown(post._id)}>
                      <FontAwesomeIcon icon={faEllipsisV} size="lg" className="text-white" />
                    </button>
                    {showDropdown[post._id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleReport(post._id)}
                        >
                          Report Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <button className="mr-4" onClick={() => handleLike(post._id)}>
                      <FontAwesomeIcon
                        icon={post.liked ? solidHeart : regularHeart}
                        size="lg"
                        className={post.liked ? 'text-red-600' : 'text-white'}
                      />
                    </button>
                    <button onClick={() => handleCommentClick(post._id)}>
                      <FontAwesomeIcon icon={faComment} size="lg" />
                    </button>
                  </div>
                  <h4 className="font-bold">{post.userId.name}</h4>
                  <p>{post.title}</p>
                  <p className="mb-2 text-sm text-gray-300">Liked by <span className='font-semibold'>{post.likes.length}</span> users</p>
                  <p className="text-gray-200 text-sm">{formatDistanceToNow(new Date(post.postedDate), { addSuffix: true })}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!showAll && posts.length > 3 && (
          <div className="flex justify-center mt-8">
            <button onClick={handleLoadMore} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Load More
            </button>
          </div>
        )}
        {commented && (
          <Modal onClose={() => setCommented(false)}>
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

        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-lg">
              <h3 className="text-lg font-bold mb-4">Report Post</h3>
              <div className="space-y-4">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="spam"
                      checked={reportReason === 'spam'}
                      onChange={() => setReportReason('spam')}
                      className="form-radio h-5 w-5 text-green-600"
                    />
                    <span className="ml-2">Spam</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="inappropriate"
                      checked={reportReason === 'inappropriate'}
                      onChange={() => setReportReason('inappropriate')}
                      className="form-radio h-5 w-5 text-green-600"
                    />
                    <span className="ml-2">Inappropriate Content</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="bullying"
                      checked={reportReason === 'bullying'}
                      onChange={() => setReportReason('bullying')}
                      className="form-radio h-5 w-5 text-green-600"
                    />
                    <span className="ml-2">Bullying/Harassment</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="other"
                      checked={reportReason === 'other'}
                      onChange={() => {
                        setReportReason('other');
                        setOtherReason('');
                      }}
                      className="form-radio h-5 w-5 text-green-600"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                  {reportReason === 'other' && (
                    <textarea
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                      placeholder="Specify reason..."
                    ></textarea>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleReportSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                >
                  Submit
                </button>
                <button
                  onClick={handleReportModalClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
    </section>
  );
};

export default AllPosts;
