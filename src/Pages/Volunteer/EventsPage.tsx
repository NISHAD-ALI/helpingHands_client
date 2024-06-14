import React, { useRef, useState, useEffect } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { useNavigate, useParams } from 'react-router-dom';
import Counter from '../../Components/CommunityComponents/Counter';
import ProjectDetails from '../../Components/CommunityComponents/ProjectDetails';
import Footer from '../../Components/Common/Footer';
import { getEventsById } from '../../Api/communityApi';
import { enrollToEvents } from '../../Api/volunteerApi';
import NavBar from '../../Components/VolunteerComponents/NavBar';

const EventPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const zgRef = useRef<ZegoExpressEngine | null>(null);
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const appID = 1517725939;
    const server = 'wss://webliveroom1517725939-api.coolzcloud.com/ws';
    const roomID = '011';
    const streamID = 'streamID';

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await getEventsById(id);
            if (response?.data?.event?.shifts?.length > 0) {
                setEventDate(new Date(response.data.event.shifts[0].date));
            }
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        zgRef.current = new ZegoExpressEngine(appID, server);

        return () => {
            if (zgRef.current) {
                try {
                    zgRef.current.destroyEngine();
                } catch (error) {
                    console.error('Error destroying ZegoExpressEngine:', error);
                } finally {
                    zgRef.current = null;
                }
            }
        };
    }, [appID, server]);

    const handleJoinStream = async () => {
        try {
            if (!zgRef.current) {
                zgRef.current = new ZegoExpressEngine(appID, server);
            }
            const token = '04AAAAAGZmjlIAEGMwODBmZmgwc3h1NDV2ZHoAsOT2FxmcLcZTjA6lWbeEx0HsLLnyxQ3xMm3AOqLGzb3XJbIMalAD0K7SIsa/WXyviJPXeUlfMPVb2dML6zx/K1mbEuHKpKAUruPK0+bsMTVMpGe/eLbiDRTxC/OS6t8XtkhA77OpTlsKhxDKijv8Z+0zLm66FUhKvVZ0/1pP76WLCB20qSNHZTRCO3A2BCldN7U7FYYARYxb9VGj1hPON6rZfy6l1IGY/L1UL1qaLd31';
            const user = { userID: 'volunteer', userName: 'Volunteer' };

            await zgRef.current.loginRoom(roomID, token, user, { userUpdate: true });

            const remoteStream = await zgRef.current.startPlayingStream(streamID);
            if (videoRef.current) {
                videoRef.current.srcObject = remoteStream;
            }

            setIsStreaming(true);
        } catch (error) {
            console.error('Failed to join the stream:', error);
        }
    };

    const handleLeaveStream = async () => {
        try {
            if (zgRef.current) {
                await zgRef.current.stopPlayingStream(streamID);
                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                }

                await zgRef.current.logoutRoom(roomID);
                setIsStreaming(false);
            }
        } catch (error) {
            console.error('Failed to leave the stream:', error);
        }
    };

    const handleEnroll = async () => {
        try {
            const response = await enrollToEvents(id as string);
            if (response?.data.success) {
                navigate('/volunteer/events');
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Event Details</h1>
                {eventDate && <Counter eventDate={eventDate} />}
                <ProjectDetails />
                <div className="flex justify-center mt-10">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700" onClick={handleEnroll}>Enroll to event</button>
                </div>
                <div className="flex justify-center mt-10">
                    {!isStreaming ? (
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700" onClick={handleJoinStream}>Join Stream</button>
                    ) : (
                        <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700" onClick={handleLeaveStream}>Leave Stream</button>
                    )}
                </div>
                <div className="flex justify-center mt-10">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-auto object-cover rounded-lg border border-gray-300"></video>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EventPage;
