'use client';

import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus('❌ Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      const { message, fileUrl, fileName } = response.data;

      setUploadStatus(message);
      setFileUrl(fileUrl);
      setFileName(fileName);
    } catch (error: any) {
      console.error(error);
      setUploadStatus('❌ Upload failed');
    }
  };

  const handleCopyLink = async () => {
    if (fileUrl) {
      try {
        await navigator.clipboard.writeText(fileUrl);
        alert('✅ Link copied to clipboard!');
      } catch (err) {
        alert('❌ Failed to copy link');
      }
    }
  };

  const getDownloadUrl = (url: string) => {
    return url.includes('cloudinary') ? `${url}?fl_attachment=true` : url;
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl bg-gray-900 p-6 text-white shadow-xl">
      <h2 className="mb-4 text-xl font-bold">Upload to Shared Library</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-purple-700"
        />

        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white hover:bg-purple-700"
        >
          Upload
        </button>
      </form>

      {uploadStatus && (
        <div className="mt-4 text-sm text-green-400">{uploadStatus}</div>
      )}

      {fileUrl && (
        <div className="mt-4 space-y-2">
          <p className="text-sm">📎 <strong>{fileName}</strong></p>

          {/* Preview Link */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            🔍 Preview File
          </a>

          {/* Download Link */}
          <br />
          <a
            href={getDownloadUrl(fileUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            ⬇️ Download File
          </a>

          {/* Copy Link Button */}
          <div className="mt-2">
            <button
              onClick={handleCopyLink}
              className="rounded bg-gray-700 px-4 py-1 text-sm text-white hover:bg-gray-800"
            >
              📋 Copy Shareable Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
