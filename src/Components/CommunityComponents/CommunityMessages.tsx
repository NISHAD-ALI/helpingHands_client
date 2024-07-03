import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getCommunityDetails } from '../../Api/volunteerApi';
import { getMessages, sendMessageTo } from '../../Api/communityApi';
import { MessageData } from '../../Interface/messageData';

const socket = io('http://localhost:3001');

interface Sender {
  _id: string;
  name: string;
  profileImage: string;
}

interface Message {
  _id: string;
  sender: Sender;
  group: string;
  content: string;
  conversation: string;
  communityId: string;
  timestamp: string;
}

const CommunityMessages: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { id: communityId } = useParams<{ id: string }>();
  const [conversations, setConversations] = useState<string | null>(null);
  const [community, setCommunity] = useState<any>(null);
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await getCommunityDetails(communityId as string);
        const defaultConversation = response.data.updated.defaultConversation;
        setConversations(defaultConversation);
        setCommunity(response.data.updated)
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
          const response = await getMessages(conversations)
          console.log(response)
          setMessages(response);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();

      socket.on('receiveMessage', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [conversations,messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !conversations) return;

    const messageData: MessageData = {
      sender: {
        _id: communityId as string,
        name: 'ADMIN', 
        profileImage: '',
      },
      group: conversations,
      content: newMessage,
      conversation: conversations,
      communityId: communityId as string,
      timestamp: new Date().toISOString()
    };
    try {
      await sendMessageTo(messageData)
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
            className={`mb-4 p-3 rounded-lg flex items-start ${message?.sender === null
              ? 'bg-blue-100 self-end flex-row-reverse'
              : 'bg-white self-start flex-row'
              }`}
          >
              <img
                src={message.sender?.profileImage
                  ? message.sender?.profileImage
                  : message.group?.profileImage}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="mb-1 p-3">
                  <strong className="text-gray-600">{message?.sender?.name ? message?.sender?.name : 'ADMIN'}</strong>
                </p>
                <p>{message?.content}</p>
                <small className="text-gray-500">{moment(message?.timestamp).format('h:mm A')}</small>
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
