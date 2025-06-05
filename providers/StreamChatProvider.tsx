"use client";

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

export default function StreamChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    if (!user) return;

    const connect = async () => {
      try {
        if (!client.userID) {
          await client.connectUser(
            {
              id: user.id,
              name: user.username || user.fullName || "User",
              image: user.imageUrl,
            },
            // Dev token only works on dev Stream apps!
            client.devToken(user.id)
          );
        }
        setClientReady(true);
      } catch (err) {
        console.error("StreamChat connectUser error:", err);
        setClientReady(false); // prevent permanent loading
      }
    };

    connect();

    return () => {
      client.disconnectUser();
    };
  }, [user]);

  // Render children without chat if not ready
  if (!clientReady) return <>{children}</>;

  return <Chat client={client}>{children}</Chat>;
}
