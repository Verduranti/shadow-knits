import React, { useRef, useState } from "react";

export default function ImageEditor({ onBack }) {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [imageData, setImageData] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                };
                img.src = e.target.result;
                setImageData(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <button className="btn btn-blue mb-4" onClick={onBack}>
                Back to Main Screen
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="m-2"
            />
            <canvas ref={canvasRef} className="border mt-4" />
            {imageData && (
                <img
                    src={imageData}
                    alt="Uploaded"
                    className="mt-4 border"
                    style={{ maxWidth: "100%", maxHeight: "500px" }}
                />
            )}
        </div>
    );
}