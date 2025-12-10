"use client";

interface Props {
  doc: any;
  onClose: () => void;
}

export default function DocumentModal({ doc, onClose }: Props) {
  const handleAnalyze = () => {
    alert("Анализ выполнен");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">{doc.file_name}</h2>
        <p>Версия: {doc.version}</p>
        <p>Размер: {doc.size}</p>
        <p>Дата: {doc.date}</p>
        <button
          onClick={handleAnalyze}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Проанализировать
        </button>
      </div>
    </div>
  );
}
