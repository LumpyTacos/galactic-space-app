// Define the props the component will accept
interface InfoPanelProps {
  title: string;
  onClose: () => void;
}

export function InfoPanel({ title, onClose }: InfoPanelProps) {
  return (
    // Using TailwindCSS classes for styling
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-80 text-white p-6 rounded-lg shadow-xl w-96">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">
        This is where the AI-summarized data for the NASA publications will be displayed.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  );
}
