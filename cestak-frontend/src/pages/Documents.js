import React, { useEffect, useState } from 'react';
import { FaFileAlt, FaDownload } from 'react-icons/fa';
import config from '../config.json';

const DocumentsPage = () => {
  const [dokumenty, setDokumenty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDokumenty = async () => {
      try {
        const response = await fetch(`${config.API}/api/dokumenties?populate=*`);
        const data = await response.json();
        setDokumenty(data.data || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError('Failed to load documents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDokumenty();
  }, []);

  const renderDocuments = () => {
    if (dokumenty.length === 0) {
      return <div className="text-center text-gray-600">Žádné dokumenty nejsou dostupné</div>;
    }

    return dokumenty.map((dokument) => (
      <div key={dokument.id} className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{dokument.Nazev}</h3>
        {dokument.Dokumenty && dokument.Dokumenty.length > 0 ? (
          <ul className="space-y-2">
            {dokument.Dokumenty.map((file) => (
              <li key={file.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaFileAlt className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-800">{file.name}</span>
                </div>
                <a
                  href={`${config.API}${file.url}`}
                  className="flex items-center space-x-1 text-red-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload className="h-4 w-4" />
                  <span>Zobrazit</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">Žádné soubory k danímu dokumentu.</div>
        )}
      </div>
    ));
  };

  if (loading) return <div className="text-center p-8">{console.log("Loading...")}</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="text-center p-6 bg-red-700 text-white">
          <h1 className="text-3xl font-bold">Dokumenty</h1>
          <p className="mt-2">
            Zde naleznete veškeré důležité dokumenty k cestovní kanceláři
          </p>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Ke stažení</h2>
          <div className="overflow-y-auto rounded-md border p-4 bg-gray-100">
            {renderDocuments()}
          </div>
          <div className="mt-6 text-sm text-gray-700">
            <h3 className="font-semibold mb-2">GDPR</h3>
            <p>
              V případě, že dojde mezi námi a spotřebitelem ke vzniku spotřebitelského sporu z kupní smlouvy nebo ze smlouvy o poskytování služeb, který se nepodaří vyřešit vzájemnou dohodou, může spotřebitel podat návrh na mimosoudní řešení takového sporu určenému subjektu mimosoudního řešení spotřebitelských sporů, kterým je:
            </p>
            <address className="mt-4">
              <strong>Administrativní strandy</strong><br />
              Administrativní srandy
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;