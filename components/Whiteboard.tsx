"use client";

import React, { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import {
  X,
  Save,
  RotateCcw,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";

const Whiteboard = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [locked, setLocked] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const [strokeColor, setStrokeColor] = useState("black");
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    canvasRef.current?.eraseMode(false);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (locked) return;
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => setDragging(false);

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const doResize = (event: MouseEvent) => {
      const newWidth = Math.max(300, startWidth + (event.clientX - startX));
      const newHeight = Math.max(200, startHeight + (event.clientY - startY));
      setWidth(newWidth);
      setHeight(newHeight);
    };

    const stopResize = () => {
      window.removeEventListener("mousemove", doResize);
      window.removeEventListener("mouseup", stopResize);
    };

    window.addEventListener("mousemove", doResize);
    window.addEventListener("mouseup", stopResize);
  };

  const exportImage = async () => {
    if (typeof window === "undefined") return; // Prevent server-side crash
    try {
      const data = await canvasRef.current?.exportImage("png");
      if (!data) return;
      const link = document.createElement("a");
      link.href = data;
      link.download = "whiteboard.png";
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const clearCanvas = () => canvasRef.current?.clearCanvas();
  const undo = () => canvasRef.current?.undo();

  const toggleEraser = () => {
    const mode = !isEraser;
    canvasRef.current?.eraseMode(mode);
    setIsEraser(mode);
  };

  return (
    <div
      className="fixed z-[1000] bg-black/90 rounded shadow-xl"
      style={{
        top: position.y,
        left: position.x,
        width,
        height,
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold">✏️ VSTUDY Whiteboard</span>
        <div className="flex gap-2">
          <button
            onClick={() => setLocked((prev) => !prev)}
            title={locked ? "Unlock drag" : "Lock drag"}
          >
            {locked ? <Unlock size={16} /> : <Lock size={16} />}
          </button>
          <button onClick={onClose} title="Close whiteboard">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full" style={{ height: height * 0.75 }}>
        <ReactSketchCanvas
          ref={canvasRef}
          style={{
            border: "2px solid #ccc",
            backgroundColor: "#000",
            boxShadow: "inset 0 0 8px #111",
          }}
          width={`${width}px`}
          height={`${height * 0.75}px`}
          strokeWidth={4}
          strokeColor={strokeColor}
          eraserWidth={8}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center p-3 bg-gray-900 text-white text-sm gap-3">
        <div className="flex items-center gap-3">
          🎨 Color:
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => {
              setStrokeColor(e.target.value);
              setIsEraser(false);
              canvasRef.current?.eraseMode(false);
            }}
          />
          <button
            onClick={toggleEraser}
            className={`px-2 py-1 rounded ${
              isEraser ? "bg-red-600" : "bg-gray-600"
            }`}
          >
            {isEraser ? "Eraser On" : "Eraser Off"}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportImage}
            className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
          >
            <Save size={14} className="inline" /> Save
          </button>
          <button
            onClick={undo}
            className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
          >
            <RotateCcw size={14} className="inline" /> Undo
          </button>
          <button
            onClick={clearCanvas}
            className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded"
          >
            <Trash2 size={14} className="inline" /> Clear
          </button>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleResize}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white border border-gray-700"
        title="Resize whiteboard"
      />
    </div>
  );
};

export default Whiteboard;
