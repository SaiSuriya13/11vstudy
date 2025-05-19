"use client";

import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { X, Save, RotateCcw, Trash2 } from "lucide-react";

const Whiteboard = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const exportImage = async () => {
    if (!canvasRef.current) return;
    try {
      const data = await canvasRef.current.exportImage("png");
      const link = document.createElement("a");
      link.href = data;
      link.download = "whiteboard.png";
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    canvasRef.current.clearCanvas();
  };

  const undo = () => {
    if (!canvasRef.current) return;
    canvasRef.current.undo();
  };

  return (
    <div className="fixed left-0 top-0 z-[1000] flex size-full flex-col items-center justify-center bg-black bg-opacity-80 p-4">
      {/* Top Controls */}
      <div className="mb-4 flex w-full max-w-6xl justify-end">
        <button
          onClick={onClose}
          className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
        >
          <X size={20} />
        </button>
      </div>

      {/* Whiteboard Canvas */}
      <ReactSketchCanvas
        ref={canvasRef}
        style={{
          border: "0.0625rem solid #ccc",
          borderRadius: "0.5rem",
        }}
        width="90%"
        height="70%"
        strokeWidth={4}
        strokeColor="white"
      />

      {/* Bottom Controls */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={exportImage}
          className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          <Save size={18} />
          Save
        </button>
        <button
          onClick={undo}
          className="flex items-center gap-2 rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
        >
          <RotateCcw size={18} />
          Undo
        </button>
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;
