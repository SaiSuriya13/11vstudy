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

import "stream-chat-react/dist/css/v2/index.css";

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
  const [userId, setUserId] = useState<string>("");
  const chatClientRef = useRef<StreamChat | null>(null);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // Generate or fetch local user ID
  useEffect(() => {
    let storedUserId = localStorage.getItem("stream_user_id");
    if (!storedUserId) {
      storedUserId = `guest-${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem("stream_user_id", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  // Setup Stream Chat client
  useEffect(() => {
    if (!userId) return;

    const setupChat = async () => {
      try {
        const res = await fetch("/api/chat/token", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        const { token } = await res.json();

        const client = StreamChat.getInstance(apiKey);

        if (chatClientRef.current) {
          await chatClientRef.current.disconnectUser();
        }

        await client.connectUser(
          {
            id: userId,
            name: userId.startsWith("guest") ? "Guest User" : userId,
          },
          token
        );

        const newChannel = client.channel("messaging", `meeting-${meetingId}`, {
          name: "Meeting Chat",
          members: [userId],
        });

        await newChannel.watch();

        chatClientRef.current = client;
        setChannel(newChannel);
      } catch (error) {
        console.error("[StreamChat] Error:", error);
      }
    };

    setupChat();

    return () => {
      const cleanup = async () => {
        if (chatClientRef.current) {
          await chatClientRef.current.disconnectUser();
          chatClientRef.current = null;
        }
      };
      cleanup();
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
      <div className="absolute right-4 top-4 z-50">
        <DistractionDetector />
      </div>

      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>

        {showParticipants && (
          <div className="absolute right-4 top-20 z-50 h-[calc(100vh-140px)] bg-[#0f0f0f] w-[300px] rounded-xl overflow-auto">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}

        {showChat && channel && chatClientRef.current && (
          <div className="absolute right-4 top-20 z-50 h-[calc(100vh-140px)] w-[350px] bg-gradient-to-br from-[#1c1f24] to-[#111] rounded-xl shadow-xl overflow-hidden flex flex-col border border-[#2f2f2f]">
            <Chat client={chatClientRef.current} theme="str-chat__theme-dark">
              <Channel channel={channel}>
                <Window>
                  <MessageList
                    hideDeletedMessages
                    messageActions={["react", "reply", "edit", "delete"]}
                  />
                  <MessageInput
                    noFiles
                    emojiPicker={true}
                    additionalTextareaProps={{
                      className:
                        "bg-[#1f1f1f] text-white border-none focus:ring-0",
                    }}
                  />
                </Window>
              </Channel>
            </Chat>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 z-50">
        <CallControls onLeave={() => router.push("/home")} />

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

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} />
          </div>
        </button>

        <button onClick={() => setShowWhiteboard((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Pencil size={20} />
          </div>
        </button>

        <button onClick={() => setShowChat((prev) => !prev)}>
          <div className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <MessageSquareText size={20} />
          </div>
        </button>

        {!isPersonalRoom && (
          <EndCallButton onLeave={() => router.push("/home")} />
        )}
      </div>

      {showWhiteboard && (
        <Whiteboard onClose={() => setShowWhiteboard(false)} />
      )}
    </section>
  );
};

export default MeetingRoom;
