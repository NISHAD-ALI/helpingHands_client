import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useNavigate } from 'react-router-dom';

function randomID(len :number) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const JoinStream = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const roomID = id as string;
  const role = ZegoUIKitPrebuilt.Audience;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const appID = 1409135051; 
  const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET1; 
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5)
  );

  React.useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
    });
  }, [kitToken, role]);

  const handleEndStream = () => {
    navigate('/volunteer/events');
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div ref={containerRef} className="w-full h-full"></div>
      <button
        onClick={handleEndStream}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        End Stream
      </button>
    </div>
  );
};

export default JoinStream;
