"use client";

interface DownloadCloudProps {
  filename?: string;
}

export function DownloadCloud({
  filename = "session-word-cloud.png",
}: DownloadCloudProps) {
  function downloadCloud() {
    const svg = document.querySelector(
      "[data-word-cloud] svg",
    ) as SVGSVGElement | null;

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

      const width = 1200;
      const height = 800;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(url);
        return;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);

      context.drawImage(image, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          URL.revokeObjectURL(url);
          return;
        }

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = downloadUrl;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(downloadUrl);
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    image.src = url;
  }

  return (
    <button
      type="button"
      onClick={downloadCloud}
      className="rounded-xl border border-[#d8d2c8] bg-white px-5 py-3 text-sm font-medium text-[#403d38] transition hover:bg-[#faf9f7]"
    >
      Download PNG
    </button>
  );
}