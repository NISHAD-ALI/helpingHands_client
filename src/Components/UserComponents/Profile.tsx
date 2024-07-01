import React, { useEffect, useState } from 'react';
import user from '../../Interface/user';
import { deletePost, getPostsOne, getProfile, likePost } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../Components/UserComponents/PostCard';
import CreatePostModal from '../../Components/UserComponents/CreatePostModal';
import EditPostModal from '../../Components/UserComponents/EditPostModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile: React.FC = () => {
  const [data, setData] = useState<user>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response: any = await getProfile();
        setData(response?.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchedData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsOne();
        const fetchedData = response?.posts?.posts;
        console.log(fetchedData);
        setPosts(fetchedData);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePost(id);
      if (response) {
        setPosts(posts.filter((post) => post._id !== id));
        toast.success('Post deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post');
    }
  };
  

  const handleSaveEdit = (updatedPost: any) => {
    setPosts(posts.map((post: any) => (post._id === updatedPost._id ? updatedPost : post)));
    setIsEditModalOpen(false);
  };

  return (
    <main className="p-4 mx-auto max-w-screen-xl">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 h-full">
          <img src={data?.profileImage} alt="Profile" className="w-full h-auto rounded-lg mb-4" />
          <h2 className="text-xl font-semibold">{data?.name}</h2>
          <div className="flex space-x-4 my-2">
            <a href="#" className="text-blue-600"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-blue-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-pink-600"><i className="fab fa-instagram"></i></a>
          </div>
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
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-2xl font-semibold">$ {data?.donationsFund}+</h3>
              <p>Donated for Charity</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-2xl font-semibold">0+</h3>
              <p>Essentials Donated</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
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
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                image={post?.image}
                description={post?.title}
                postedDate={post?.postedDate}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDelete(post?._id)}
                id = {post?._id}
                initialTotalLiked = {post?.likes?.length}
              />
            ))}
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
    </main>
  );
};

export default Profile;
