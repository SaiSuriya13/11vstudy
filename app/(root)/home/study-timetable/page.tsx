"use client";

import { useState, useEffect } from "react";

const StudyTimetable = () => {
  const [schedule, setSchedule] = useState<{ time: string; subject: string }[]>([]);
  const [newTime, setNewTime] = useState("");
  const [newSubject, setNewSubject] = useState("");

  // Load stored timetable from local storage
  useEffect(() => {
    const savedSchedule = localStorage.getItem("studyTimetable");
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  // Save to local storage when schedule updates
  useEffect(() => {
    localStorage.setItem("studyTimetable", JSON.stringify(schedule));
  }, [schedule]);

  // Add a new study session
  const addStudySession = () => {
    if (newTime && newSubject) {
      setSchedule([...schedule, { time: newTime, subject: newSubject }]);
      setNewTime("");
      setNewSubject("");
    }
  };

  // Remove a study session
  const removeStudySession = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">📅 Study Timetable</h1>

      {/* Add New Study Session */}
      <div className="mb-4 flex gap-4">
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
        <input
          type="text"
          placeholder="Subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          className="rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
        <button
          onClick={addStudySession}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          ➕ Add
        </button>
      </div>

      {/* Display Study Sessions */}
      <ul className="space-y-2">
        {schedule.map((session, index) => (
          <li
            key={index}
            className="flex justify-between rounded-lg border border-gray-700 bg-gray-900 p-3"
          >
            <span className="text-lg">{session.time} - {session.subject}</span>
            <button
              onClick={() => removeStudySession(index)}
              className="rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-600"
            >
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyTimetable;
