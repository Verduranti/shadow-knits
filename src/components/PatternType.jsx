export default function PatternType ({name, desc, shape}) {
    return (
            <div className="py-5 text-center">
                <div
                    className="mb-12 flex w-full items-center justify-center"
                >
                    <svg
                        viewBox="0 0 150 150"
                        xmlns="http://www.w3.org/2000/svg"
                        className="block mx-auto"
                    >
                        {shape}
                    </svg>
                </div>
                <h4 className="mb-2 text-xl font-bold">{name}</h4>
                <p className="text-left leading-relaxed text-gray-600"> {desc}
                </p>
            </div>
        );
}