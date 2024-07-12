import React, { useEffect, useState } from 'react';
import { getAllReports, terminatePost } from '../../Api/adminApi'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../Common/ConfirmationModal';

interface Report {
  userId: { name: string, profileImage: string };
  reason: string;
}

interface ReportedPost {
  _id: string;
  postId: { _id: string, userId: string, title: string };
  reportedUsers: Report[];
}

const ReportPost: React.FC = () => {
  const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>([]);
  const [expandedPostIds, setExpandedPostIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{ postId: string, userId: string, reasons: string[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllReports();
        console.log(response);
        const groupedReports = response?.data.reports.reduce((acc: any, curr: any) => {
          const postId = curr.postId._id;
          if (!acc[postId]) {
            acc[postId] = { ...curr, reportedUsers: [] };
          }
          acc[postId].reportedUsers.push(...curr.reportedUsers);
          return acc;
        }, {});

        setReportedPosts(Object.values(groupedReports));
      } catch (error) {
        console.error('Failed to fetch reported posts:', error);
      }
    };

    fetchData();
  }, []);

  const togglePostExpansion = (postId: string) => {
    setExpandedPostIds(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleTerminatePost = async () => {
    if (selectedPost) {
      try {
        await terminatePost(selectedPost.postId, selectedPost.userId, selectedPost.reasons);
        setReportedPosts(prev => prev.filter(post => post.postId._id !== selectedPost.postId));
        setIsModalOpen(false);
        setSelectedPost(null);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const openConfirmationModal = (postId: string, userId: string, reasons: string[]) => {
    setSelectedPost({ postId, userId, reasons });
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Reported Posts Management</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Post Title</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedPosts.map(post => (
                <React.Fragment key={post._id}>
                  <tr>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center">
                        <button
                          type="button"
                          title={expandedPostIds.includes(post.postId._id) ? 'Collapse' : 'Expand'}
                          onClick={() => togglePostExpansion(post.postId._id)}
                          className="mr-2 focus:outline-none"
                        >
                          <FontAwesomeIcon icon={expandedPostIds.includes(post.postId._id) ? faChevronUp : faChevronDown} />
                        </button>
                        {post.postId.title}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        type="button"
                        onClick={() => openConfirmationModal(post.postId._id, post.postId.userId, post.reportedUsers.map(user => user.reason))}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                      >
                        Terminate
                      </button>
                    </td>
                  </tr>
                  {expandedPostIds.includes(post.postId._id) && (
                    <tr>
                      <td colSpan={2} className="bg-gray-100 p-4">
                        <table className="min-w-full bg-white border">
                          <thead>
                            <tr>
                              <th className="py-2 px-4 border-b">Reported User</th>
                              <th className="py-2 px-4 border-b">Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {post.reportedUsers.map((report, index) => (
                              <tr key={index}>
                                <td className="py-2 px-4 border-b">
                                  <div className="flex items-center">
                                    <img src={report.userId.profileImage} alt={report.userId.name} className="w-8 h-8 rounded-full mr-2" />
                                    {report.userId.name}
                                  </div>
                                </td>
                                <td className="py-2 px-4 border-b">{report.reason}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleTerminatePost}
        message="Are you sure you want to terminate this post?"
      />
    </div>
  );
};

export default ReportPost;
