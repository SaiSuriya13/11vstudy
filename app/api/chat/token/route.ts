// app/api/chat/token/route.ts

import { StreamChat } from 'stream-chat';
import { NextResponse } from 'next/server';

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const token = serverClient.createToken(userId);
    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json({ error: 'Token generation failed' }, { status: 500 });
  }
}
