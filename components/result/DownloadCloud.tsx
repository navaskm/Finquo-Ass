"use client";

import { Download } from "lucide-react";

interface DownloadCloudProps {
  targetId?: string;
}

export default function DownloadCloud({
  targetId = "word-cloud",
}: DownloadCloudProps) {
  async function handleDownload() {
    const element = document.getElementById(targetId);

    if (!element) {
      return;
    }

    const svg = element.querySelector("svg");

    if (!svg) {
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = 1200;
      canvas.height = 800;

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(url);
        return;
      }

      context.fillStyle = "#faf7f3";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }

        const downloadUrl =
          URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = downloadUrl;
        link.download = "word-cloud.png";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(downloadUrl);
      }, "image/png");
    };

    image.src = url;
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5d8f8f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f7f7f]"
    >
      <Download size={17} />
      Download PNG
    </button>
  );
}