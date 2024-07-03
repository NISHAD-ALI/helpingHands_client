import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { fetchDefaultConversations, getMessages, getVolunteerById, sendMessageTo } from '../../Api/volunteerApi';
import { MessageData } from '../../Interface/messageData';

const socket = io('http://localhost:3001');

const VolunteerMessages: React.FC = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [volunteer, setVolunteer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { id: volunteerId } = useParams<{ id: string }>();
  const [lastMessage,SetLastMessage] = useState<any>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response: any = await fetchDefaultConversations(volunteerId as string);
        console.log(response);
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
          const response = await getMessages(selectedConversation._id);
          setMessages(response);
          console.log(response[response.length-1])
          SetLastMessage(response[response.length-1])
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
      console.log("sel", selectedConversation);
      socket.emit('joinGroup', selectedConversation._id);

      socket.on('receiveMessage', (message: MessageData) => {
        console.log('Received in volunteer:', message);
        if (message.conversation === selectedConversation._id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [selectedConversation, messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const messageData: MessageData = {
      sender: {
        _id: volunteerId as string,
        name: volunteer?.name,
        profileImage: volunteer?.profileImage
      },
      group: selectedConversation._id,
      content: newMessage,
      conversation: selectedConversation._id,
      communityId: selectedConversation?.communityId._id,
      timestamp: new Date().toISOString()
    };

    try {
      await sendMessageTo(messageData);
      console.log('Sending message:', messageData);
      socket.emit('sendMessage', messageData);

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredConversations = conversations.filter((conversation: any) =>
    conversation.communityId.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r">
        <div className="p-4 bg-green-200 text-black text-center">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-xl bg-slate-50"
          />
          <div className="overflow-y-auto">
            {filteredConversations.map((conversation: any, index: number) => (
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
                  <small className="text-gray-500">{`${lastMessage?.sender?.name ? lastMessage?.sender?.name : 'ADMIN'}: ${lastMessage?.content}`}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-green-200 text-black flex items-center">
          {selectedConversation && (
            <>
              <img
                src={selectedConversation.communityId.profileImage}
                alt={`${selectedConversation.communityId.name}'s avatar`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <h2 className="text-xl font-semibold">{selectedConversation.communityId.name}</h2>
            </>
          )}
          {!selectedConversation && (
            <h2 className="text-xl font-semibold text-center flex-1">Messages</h2>
          )}
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg flex items-start ${message?.sender?._id === volunteerId
                  ? 'bg-blue-100 self-end flex-row-reverse'
                  : 'bg-white self-start flex-row'
                }`}
            >
              <img
                src={
                  message.sender?.profileImage
                    ? message.sender?.profileImage
                    : message.group?.profileImage
                }
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="mb-1 p-2">
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
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-full">Send</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerMessages;
