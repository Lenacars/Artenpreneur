"use client";
import { generateReactHelpers } from "@uploadthing/react";
import { useState } from "react";

const { useUploadThing } = generateReactHelpers();

interface UploadResponse {
  url: string;
  name: string;
  size: number;
}

export default function VideoYuklePage() {
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const { startUpload, isUploading } = useUploadThing("videoUploader", {
    onClientUploadComplete: (res: UploadResponse[] | undefined) => {
      if (!res || !res[0]) return;
      setUploadStatus("Yükleme başarılı!");
      alert("Yükleme tamamlandı! Dosya URL: " + res[0].url);
    },
    onUploadError: (error: Error) => {
      setUploadStatus("Yükleme hatası!");
      alert(`Yükleme hatası: ${error.message}`);
    },
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Video Yükle</h1>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            onChange={(e) => {
              if (e.target.files) {
                startUpload(Array.from(e.target.files));
              }
            }}
            disabled={isUploading}
          />
          <p className="text-sm text-gray-500">
            Maksimum dosya boyutu: 4GB
          </p>
        </div>
        {uploadStatus && (
          <p className={`mt-4 text-center ${
            uploadStatus.includes("başarılı") ? "text-green-600" : "text-red-600"
          }`}>
            {uploadStatus}
          </p>
        )}
        {isUploading && (
          <p className="mt-4 text-center text-blue-600">
            Yükleme devam ediyor...
          </p>
        )}
      </div>
    </div>
  );
}