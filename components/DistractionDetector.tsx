'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

const DistractionDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState('⌛ Initializing...');

  useEffect(() => {
    const loadModelAndCamera = async () => {
      try {
        setStatus('📦 Loading model...');
        await tf.setBackend('webgl');
        await tf.ready();
        const model = await blazeface.load();
        setStatus('✅ Model loaded. Accessing camera...');

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            detectDistraction(model);
          };
        }
      } catch (error) {
        console.error('Error initializing face detection:', error);
        setStatus('❌ Error accessing camera or loading model.');
      }
    };

    loadModelAndCamera();
  }, []);

  const detectDistraction = async (model: blazeface.BlazeFaceModel) => {
    const interval = setInterval(async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) return;

      const predictions = await model.estimateFaces(videoRef.current, false);
      setStatus(
        predictions.length === 0
          ? '⚠ No face detected. Stay focused!'
          : '✅ Face detected. Good job!'
      );
    }, 2000);

    return () => clearInterval(interval);
  };

  return (
    <div className="flex flex-col items-center gap-1 rounded-lg bg-black/70 px-3 py-2 text-sm shadow-lg">
      <video
        ref={videoRef}
        className="hidden"
        width={300}
        height={200}
        muted
        autoPlay
        playsInline
      />
      <p>{status}</p>
    </div>
  );
};

export default DistractionDetector;