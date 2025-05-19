// Import necessary dependencies
import { NextResponse } from 'next/server';

// Define the API route handler
export async function POST() {
  try {
    // Step 1: Fetch GoFile server details
    const serverRes = await fetch("https://api.gofile.me/getServer");

    // Check if the response was successful
    if (!serverRes.ok) {
      throw new Error("Failed to fetch GoFile server");
    }

    // Parse the JSON response and define the expected structure
    const serverJson = await serverRes.json() as { data: { server: string } };

    // Extract the server from the response
    const server = serverJson.data.server;

    // If the server information is missing, handle the error
    if (!server) {
      console.error("Error getting GoFile server:", serverJson);
      return NextResponse.json({ error: "Failed to get GoFile server" }, { status: 500 });
    }

    // Return the server information or proceed with further logic
    return NextResponse.json({ server }, { status: 200 });

  } catch (error) {
    // Log unexpected errors
    console.error("Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
