export const sidebarLinks = [
  {
    imgURL: "/icons/Home.svg",
    route: "/home", // ✅ Fix: Ensure this points to /home
    label: "Home",
  },
  {
    imgURL: "/icons/upcoming.svg",
    route: "/home/upcoming", // ✅ Fix: Ensure this points to /home/upcoming
    label: "Upcoming Study",
  },
  {
    imgURL: "/icons/previous.svg",
    route: "/home/previous", // ✅ Fix: Ensure this points to /home/previous
    label: "Previous",
  },
  {
    imgURL: "/icons/Video.svg",
    route: "/home/recordings", // ✅ Fix: Ensure this points to /home/recordings
    label: "Recordings",
  },
  {
    imgURL: "/icons/add-personal.svg",
    route: "/home/personal-room", // ✅ Fix: Ensure this points to /home/personal-room
    label: "Personal Room",
  },
  {
    imgURL: "/icons/focus.svg",
    route: "/home/focus-mode", // ✅ Fix: Ensure this points to /home/focus-mode
    label: "Focus Mode",
  },
];

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
