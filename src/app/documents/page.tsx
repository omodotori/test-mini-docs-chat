"use client";

import { useEffect, useState } from "react";
import DocumentModal from "./DocumentModal";

interface Document {
  id: number;
  file_name: string;
  version: string;
  size: string;
  date: string;
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [selected, setSelected] = useState<Document | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        // Берём первые 10 элементов и мапим под документы
        const docsData: Document[] = data.slice(0, 10).map((item: any) => ({
          id: item.id,
          file_name: `Документ ${item.id}: ${item.title.slice(0, 20)}`, // читаемое название
          version: "1.0",
          size: `${Math.floor(Math.random() * 10 + 1)}MB`,
          date: new Date().toLocaleDateString(),
        }));
        setDocs(docsData);
      } catch (err) {
        console.error("Ошибка загрузки документов:", err);
      }
    };
    fetchDocs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Документы</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Название файла</th>
            <th className="p-2 border">Версия</th>
            <th className="p-2 border">Размер</th>
            <th className="p-2 border">Дата загрузки</th>
            <th className="p-2 border">Действие</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-100">
              <td className="p-2 border">{doc.file_name}</td>
              <td className="p-2 border">{doc.version}</td>
              <td className="p-2 border">{doc.size}</td>
              <td className="p-2 border">{doc.date}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => setSelected(doc)}
                >
                  Подробнее
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <DocumentModal doc={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}