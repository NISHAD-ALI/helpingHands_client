import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getCommunityDetails } from '../../Api/volunteerApi';

const socket = io('http://localhost:3001');

const CommunityMessages: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id: communityId } = useParams<{ id: string }>();
  const [conversations, setConversations] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await getCommunityDetails(communityId as string);
        const defaultConversation = response.data.updated.defaultConversation;
        setConversations(defaultConversation);
        
        socket.emit('joinGroup', defaultConversation);
      } catch (error) {
        console.error('Error fetching community:', error);
      }
    };

    fetchCommunity();
  }, [communityId]);

  useEffect(() => {
    if (conversations) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/community/messages/${conversations}`, {
            params: { role: 'community' }
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();

      socket.on('receiveMessage', (message) => {
        console.log('Received in community:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [conversations]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !conversations) return;

    const messageData = {
      sender: communityId,
      group: conversations,
      content: newMessage,
      conversation: conversations,
      communityId,
      timestamp: new Date().toISOString()
    };

    try {
      await axios.post(`http://localhost:3001/community/saveMessages`, messageData);

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
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-green-800 text-white text-center">
          <h2 className="text-xl font-semibold">Community Messages</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg flex items-start ${message.sender === communityId ? 'bg-green-100 self-end flex-row-reverse' : 'bg-white self-start flex-row'}`}
            >
              <img
                src={message.sender === communityId ? message.sender?.profileImage : message.group?.profileImage}
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
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-full">Send</button>
        </form>
      </div>
    </div>
  );
};

export default CommunityMessages;
