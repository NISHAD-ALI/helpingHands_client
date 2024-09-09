import React, { useEffect, useState } from 'react';
import user from '../../Interface/user';
import { deletePost, getPostsOne, getProfile, savePost, getSavedPosts } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../Components/UserComponents/PostCard';
import CreatePostModal from '../../Components/UserComponents/CreatePostModal';
import EditPostModal from '../../Components/UserComponents/EditPostModal';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Profile: React.FC = () => {
  const [data, setData] = useState<user>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse: any = await getProfile();
        setData(profileResponse?.data.data);
        const postsResponse = await getPostsOne();
        setPosts(postsResponse?.posts?.posts);
        const savedPostsResponse = await getSavedPosts();
        console.log(savedPostsResponse?.data.posts.postId)
        setSavedPosts(savedPostsResponse?.data.posts.postId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditPost = (post: any) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePost(id);
      if (response) {
        if (showSavedPosts) {
          setSavedPosts(savedPosts.filter((post: any) => post?._id !== id));
        } else {
          setPosts(posts.filter((post: any) => post?._id !== id));
        }
        toast.success('Post deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post');
    }
  };

  const handleSave = async (post: any) => {
    try {
      const response = await savePost(post);
      if (response) {
        toast.success('Post saved successfully');
        setSavedPosts([...savedPosts, post]);
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      toast.error('Failed to save post');
    }
  };

  const handleSaveEdit = (updatedPost: any) => {
    if (showSavedPosts) {
      setSavedPosts(savedPosts.map((post: any) => (post._id === updatedPost._id ? updatedPost : post)));
    } else {
      setPosts(posts.map((post: any) => (post._id === updatedPost._id ? updatedPost : post)));
    }
    setIsEditModalOpen(false);
  };

  return (
    <main className="p-4 mx-auto max-w-screen-xl">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 h-full">
          <img src={data?.profileImage} alt="Profile" className="w-full h-auto rounded-lg mb-4" />
          <h2 className="text-xl font-semibold">{data?.name}</h2>
          <p>{data?.email}</p>
          <p>{data?.address}</p>
          <p>{data?.phone}</p>
          <button
            className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg text-gray-900 bg-green-500 focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/editProfile', { state: { data } })}
          >
            Edit profile
          </button>
        </div>
        <div className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50 text-purple-900 rounded-lg shadow-lg p-4 text-center">
              <h3 className="text-2xl font-semibold">${data?.donationsFund}+</h3>
              <p>Donated for Charity</p>
            </div>
            <div className="bg-green-100 text-green-900 rounded-lg shadow-lg p-4 text-center">
              <h3 className="text-2xl font-semibold">0+</h3>
              <p>Essentials Donated</p>
            </div>
            <div className="bg-orange-100 text-orange-900 rounded-lg shadow-lg p-4 text-center">
              <h3 className="text-2xl font-semibold">{data?.posts?.length}</h3>
              <p>Posts</p>
            </div>
          </div>
          <div className="mt-8 bg-gray-100 rounded-lg p-4 flex items-center justify-end">
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-900 bg-green-500 focus:outline-none focus:shadow-outline"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create a new Post
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-900 bg-green-500 focus:outline-none focus:shadow-outline ml-2"
              onClick={() => setShowSavedPosts(!showSavedPosts)}
            >
              {showSavedPosts ? 'Show My Posts' : 'Show Saved Posts'}
            </button>
          </div>
          <div className="mt-8">
            {showSavedPosts ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedPosts?.length > 0 ? (
                  savedPosts.map((post: any, index: number) => (
                    <PostCard
                      key={index}
                      image={post?.image}
                      description={post?.title}
                      postedDate={post?.postedDate}
                      id={post?._id}
                      initialTotalLiked={post?.likes?.length}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center">
                    <p>No saved posts available.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {posts.length > 0 ? (
                  posts.map((post: any, index: number) => (
                    <PostCard
                      key={index}
                      image={post?.image}
                      description={post?.title}
                      postedDate={post?.postedDate}
                      onEdit={() => handleEditPost(post)}
                      onDelete={() => handleDelete(post?._id)}
                      id={post?._id}
                      initialTotalLiked={post?.likes?.length}
                      onSave={() => handleSave(post)}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center">
                    <p>No posts available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <CreatePostModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      {selectedPost && (
        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={selectedPost}
          onSave={handleSaveEdit}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
    </main>
  );
};

export default Profile;
