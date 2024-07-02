import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getVolunteerById } from '../../Api/volunteerApi';

const socket = io('http://localhost:3001');

const VolunteerMessages: React.FC = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [volunteer, setVolunteer] = useState();
  const { id: volunteerId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/volunteer/conversations/${volunteerId}`);
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [volunteerId]);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const response = await getVolunteerById(volunteerId as string);
        setVolunteer(response.data);
      } catch (error) {
        console.error('Error fetching volunteer:', error);
      }
    };

    fetchVolunteer();
  }, [volunteerId]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/volunteer/messages/${selectedConversation._id}`, {
            params: { role: 'volunteer' }
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
      console.log(selectedConversation._id)
      socket.emit('joinGroup', selectedConversation._id);

      socket.on('receiveMessage', (message) => {
        console.log('Received in volunteer:', message);
        if (message.conversation === selectedConversation._id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [selectedConversation]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const messageData = {
        sender: volunteerId,
        group: selectedConversation._id,
        content: newMessage,
        conversation: selectedConversation._id,
        communityId: selectedConversation.communityId._id,
        timestamp: new Date().toISOString()
    };

    try {
        await axios.post(`http://localhost:3001/volunteer/saveMessages`, messageData);

        console.log('Sending message:', messageData);
        socket.emit('sendMessage', messageData);

        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage('');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};


  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r">
        <div className="p-4 bg-green-900 text-white text-center">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <div className="p-4 overflow-y-auto">
          {conversations.map((conversation, index) => (
            <div
              key={index}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-3 mb-4 cursor-pointer rounded-lg flex items-center ${selectedConversation?._id === conversation._id ? 'bg-blue-100' : 'bg-gray-200'}`}
            >
              <img
                src={conversation.communityId.profileImage}
                alt={`${conversation.communityId.name}'s avatar`}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="mb-1">{conversation.communityId.name}</p>
                <small className="text-gray-500">{conversation.lastMessage}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-green-800 text-white text-center">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg flex items-start ${message.sender ? 'bg-blue-100 self-end flex-row-reverse' : 'bg-white self-start flex-row'}`}
            >
              <img
                src={message.sender ? message.sender?.profileImage : message.group?.profileImage}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="mb-1">{message.content}</p>
                <small className="text-gray-500">{moment(message.timestamp).format('h:mm A')}</small>
              </div>
            </div>
          ))}
        </div>
        <form className="flex p-4 bg-white border-t" onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1 p-2 border rounded-full mr-2"
          />
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-full">Send</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerMessages;
