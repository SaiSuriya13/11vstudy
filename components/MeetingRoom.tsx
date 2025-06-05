"use client";

import { useEffect, useRef, useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Users,
  LayoutList,
  Pencil,
  MessageSquareText,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "@/components/Loader";
import EndCallButton from "@/components/EndCallButton";
import DistractionDetector from "@/components/DistractionDetector";
import Whiteboard from "@/components/Whiteboard";

import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = searchParams.get("id") || "default-room";
  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [channel, setChannel] = useState<any>(null);

  const chatClientRef = useRef<StreamChat | null>(null);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // Store userId in state or localStorage to keep stable identity
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Initialize userId once per session
    let storedUserId = localStorage.getItem("stream_user_id");
    if (!storedUserId) {
      storedUserId = `guest-${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem("stream_user_id", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return; // wait until userId is set

    const setupChat = async () => {
      try {
        const client = StreamChat.getInstance(apiKey);
        chatClientRef.current = client;

        // Connect user with dev token (only for dev/testing, use real auth token in production)
        await client.connectUser(
          { id: userId, name: "Guest" },
          client.devToken(userId)
        );

        // Use meetingId as channel ID, make sure user is member
        const newChannel = client.channel("messaging", `meeting-${meetingId}`, {
          name: "Meeting Chat",
          members: [userId], // Add current user as member
        });

        await newChannel.watch();
        setChannel(newChannel);
      } catch (error) {
        console.error("[Chat] Error initializing chat:", error);
      }
    };

    setupChat();

    return () => {
      if (chatClientRef.current) {
        chatClientRef.current.disconnectUser().then(() => {
          chatClientRef.current = null;
        });
      }
    };
  }, [userId, meetingId]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <SpeakerLayout participantsBarPosition="bottom" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      {/* Distraction Detector */}
      <div className="absolute right-4 top-4 z-50">
        <DistractionDetector />
      </div>

      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>

        {/* Participants */}
        {showParticipants && (
          <div className="absolute right-4 top-20 z-50 h-[calc(100vh-140px)] bg-[#0f0f0f] w-[300px] rounded-xl overflow-auto">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}

        {/* Chat */}
        {showChat && channel && chatClientRef.current && (
          <div className="absolute right-4 top-20 z-50 h-[calc(100vh-140px)] w-[300px] bg-[#111] rounded-xl overflow-hidden flex flex-col">
            <Chat client={chatClientRef.current} theme="str-chat__theme-dark">
              <Channel channel={channel}>
                <Window>
                  <MessageList />
                  <MessageInput />
                </Window>
              </Channel>
            </Chat>
            <button
              className="bg-blue-600 text-white p-2 mt-1 rounded"
              onClick={async () => {
                if (channel) {
                  await channel.sendMessage({ text: "Hello from debug!" });
                  console.log("Sent test message");
                }
              }}
            >
              Send Test Message
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 z-50">
        <CallControls onLeave={() => router.push("/home")} />

        {/* Layout Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Participants Button */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} />
          </div>
        </button>

        {/* Whiteboard Button */}
        <button onClick={() => setShowWhiteboard((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Pencil size={20} />
          </div>
        </button>

        {/* Chat Toggle Button */}
        <button onClick={() => setShowChat((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <MessageSquareText size={20} />
          </div>
        </button>

        {/* End Call */}
        {!isPersonalRoom && (
          <EndCallButton onLeave={() => router.push("/home")} />
        )}
      </div>

      {/* Whiteboard */}
      {showWhiteboard && <Whiteboard onClose={() => setShowWhiteboard(false)} />}
    </section>
  );
};

export default MeetingRoom;
