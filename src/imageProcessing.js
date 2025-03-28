export const processImage = (img, canvasRef, setImageData) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let x = (i / 4) % canvas.width; // Calculate x position (assuming canvasWidth is known)
        let y = Math.floor(i / (4 * canvas.width)); // Calculate y position

        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

        // Alternate black and white for every other pixel
        let bw = ( (x + y) % 2 === 0 )
            ? (avg > 128 ? 255 : 0)
            : (avg < 128 ? 255 : 0);
        data[i] = data[i + 1] = data[i + 2] = bw;
    }

    ctx.putImageData(imageData, 0, 0);
    //setImageData(canvas.toDataURL());
};
