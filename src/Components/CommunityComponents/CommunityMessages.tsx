import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3001'); // Replace with your server URL

const CommunityMessages: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id: communityId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/community/messages/${communityId}`);
        console.log(response)
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [communityId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      sender: communityId, // This should be the actual sender ID
      group: communityId,
      content: newMessage
    };

    try {
      await axios.post(`http://localhost:3001/community/saveMessages`, messageData);

      socket.emit('sendMessage', messageData);

      // Add message to local state
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Community Messages</h2>
      <div>
        {messages.map((message,index) => (
          <div key={index}>
            <p>{message.content}</p>
            <small>{message.sender}</small>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CommunityMessages;
