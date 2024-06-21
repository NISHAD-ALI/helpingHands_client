import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../Components/CommunityComponents/NavBar';
import Footer from '../../Components/Common/Footer';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number): string {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const LiveStreamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const roomID = id || randomID(5);
  const containerRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null);

  useEffect(() => {
    const appID = 1517725939;
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Clean up previous resources before joining new room
    // if (zpRef.current) {
    //   zpRef.current.leaveRoom();
    //   zpRef.current.dispose();
    // }

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;
    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Host,
        },
      },
    });

    // Optionally return a clean-up function if necessary
    // return () => {
    //   if (zpRef.current) {
    //     zpRef.current.leaveRoom();
    //     zpRef.current.dispose();
    //   }
    // };
  }, [roomID]);

  const handleEndStream = () => {
    navigate('/community/eventList');
    window.location.reload();
  };

  return (
    <div>
      <NavBar />
      <div ref={containerRef} style={{ width: '80vw', height: '80vh' }} className='ml-24'></div>
      <button
        onClick={handleEndStream}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        style={{ margin: '20px' }}
      >
        End Stream
      </button>
      <Footer />
    </div>
  );
};

export default LiveStreamPage;
