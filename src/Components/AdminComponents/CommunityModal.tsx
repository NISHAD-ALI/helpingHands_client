import React from 'react';
import community from '../../Interface/community';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: community | null;
}

const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose, community }) => {
  if (!isOpen || !community) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{community.name}</h2>
        <p><strong>Phone:</strong> {community.phone}</p>
        <p><strong>Volunteers:</strong> {community.volunteers.length}</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CommunityModal;
