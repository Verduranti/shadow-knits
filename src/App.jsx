import { useState, useRef } from "react";
import { tapestryDescription, scarfDescription, shawlDescription } from "./text.js";
import { TapestryShape, ScarfShape, ShawlShape } from "./shapes.jsx";
import PatternType from "./components/PatternType.jsx";
import Button from "./components/Button.jsx";
import ImageEditor from "./components/ImageEditor.jsx";

// export default function App() {
//     const [imageData, setImageData] = useState(null);
//     const [imageSize, setImageSize] = useState({ width: 200, height: 500 }); // Box size (resized image should fit here)
//     const canvasRef = useRef(null);
//     const fileInputRef = useRef(null);
//
//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const img = new Image();
//                 img.onload = () => {
//                     resizeImage(img);
//                 };
//                 img.src = e.target.result;
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     // Function to resize the image to fit within the box, preserving aspect ratio
//     const resizeImage = (img) => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//
//         // Get the aspect ratio of the image
//         const aspectRatio = img.width / img.height;
//
//         // Determine the new dimensions based on the box size
//         let newWidth = imageSize.width;
//         let newHeight = imageSize.height;
//
//         if (img.width > img.height) {
//             newHeight = newWidth / aspectRatio; // Scale based on width
//         } else {
//             newWidth = newHeight * aspectRatio; // Scale based on height
//         }
//
//         // Set canvas size
//         canvas.width = newWidth;
//         canvas.height = newHeight;
//
//         // Draw the image onto the canvas with the new dimensions
//         ctx.drawImage(img, 0, 0, newWidth, newHeight);
//
//         // Convert canvas to image data (Data URL)
//         const resizedImage = canvas.toDataURL();
//         setImageData(resizedImage); // Update the state with resized image
//     };
//
//     return (
//         <div className="flex flex-col items-center p-4">
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//                 className="m-2"
//             />
//             <canvas ref={canvasRef} className="hidden" />
//             {imageData && (
//                 <img
//                     src={imageData}
//                     alt="Resized"
//                     className="mt-4 border"
//                     style={{ maxWidth: imageSize.width, maxHeight: imageSize.height }}
//                 />
//             )}
//         </div>
//     );
// }


export default function App() {
    const [selectedPattern, setSelectedPattern] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return <ImageEditor onBack={() => setIsEditing(false)} />;
    }

    return (
        <div
            id="page-container"
            className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100"
        >
            <main id="page-content" className="flex max-w-full flex-auto flex-col">
                <div className="bg-gray-900">

                    <div
                        className="container mx-auto px-4 pt-16 lg:px-8 lg:pt-32 xl:max-w-6xl mb-12"
                    >
                        <div className="text-center">
                            <h2
                                className="mb-4 text-balance text-3xl font-extrabold text-white md:text-5xl"
                            >
                                Shadow Knitting Pattern Generator
                            </h2>
                        </div>
                    </div>
                </div>
                <div
                    className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-6xl "
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-12">
                        {["Tapestry", "Scarf", "Shawl"].map((type, index) => {
                            const descriptions = [tapestryDescription, scarfDescription, shawlDescription];
                            const shapes = [TapestryShape, ScarfShape, ShawlShape];

                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedPattern(type)}
                                    className={`cursor-pointer ${selectedPattern === type ? "border-2 border-blue-500" : ""
                                        }`}
                                >
                                    <PatternType
                                        name={type}
                                        desc={descriptions[index]}
                                        shape={shapes[index]()}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center">
                        <Button 
                            label={selectedPattern ? `Start a ${selectedPattern}` : "Select a Pattern"}
                            onClick={() => {
                                if (selectedPattern) {
                                    setIsEditing(true);
                                }
                            }} />
                    </div>
                </div>
            </main>
        </div>
    );
}