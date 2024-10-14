import React, { useEffect, useState } from 'react';
import config from '../config.json';


const Guides = () => {
  const [images, setImages] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
      const fetchGuides = async () => {
        try {
          const response = await fetch(`${config.API}/api/prudovcis?populate=*`);
          const data = await response.json();
          setGuides(data.data);
          setLoading(false);
        } catch (error) {
            console.error('Error fetching guides:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
        };

      fetchGuides();
    },[])


  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${config.API}/api/uvodni-obrazkies?populate=*`);
        const data = await response.json();
        const fetchedImages = data.data.length > 0 ? data.data[0].Obrazky : [];
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError(true);
      } finally {
        setLoadingImages(false); 
      }
    };

    fetchImages();
  }, []);

  if (loading ||loadingImages) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2">
        <div className="relative w-full h-96 overflow-hidden">
          <img
            src={images && images.length > 3 && images[3].url ? `${config.API}${images[3].url}` : config.defaultImage}
            alt="Mountain landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-600 bg-opacity-70 p-4 rounded-lg text-center">
              <h1 className="text-3xl font-bold">Průvodci</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Information about guides */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold mb-2">
              S potěšením vám představujeme naše zkušené průvodce, kteří s námi pravidelně spolupracují:
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Naši průvodci z řad profesionálů včetně studentů jsou držiteli průkazů průvodců 1. a 2. stupně.</li>
              <li>Nabízíme průvodcovskou činnost pro české i zahraniční skupiny v ČR i zahraničí.</li>
              <li>Poskytujeme doprovodné služby na konferencích a seminářích v českém i anglickém jazyce.</li>
              <li>Spolupracujeme s dalšími cestovními kancelářemi.</li>
            </ul>
          </div>
        </div>

        {/* Team section */}
        <section className="py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Náš tým</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {guides.map((member) => (
        <div
          key={member.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
                <img
                  src={`${config.API}${member.Obrazek.url}`}
                  alt={member.Nazev}
                  width={250}
                  height={200}
                  className="rounded-full mx-auto"
                />
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">{member.CeleJmeno}</h3>
            <p className="text-md font-semibold text-blue-600">{member.Pozice}</p>
            {member.Certifikaty && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Certifikáty:</span> {member.Certifikaty}
              </p>
            )}
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Zkušenosti:</span> {member.Zkusenosti}
            </p>
            {member.DodatecneInformace && (
              <p className="text-sm text-gray-600">
              <span className="font-semibold">O mně:</span> {member.DodatecneInformace}
            </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        
      </div>
    </div>
  );
}

export default Guides;