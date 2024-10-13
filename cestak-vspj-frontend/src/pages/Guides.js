import React, { useEffect, useState } from 'react';
import config from '../config.json';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold mb-2">{children}</h2>
);

const Avatar = ({ src, alt, fallback }) => (
  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-xl font-semibold">{fallback}</span>
    )}
  </div>
);

const guides = [
  {
    name: "Jméno Příjmenení",
    title: "Pozice",
    description: "Popis činností",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Jméno Příjmenení",
    title: "Pozice",
    description: "Popis činností",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Jméno Příjmenení",
    title: "Pozice",
    description: "Popis činností",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Jméno Příjmenení",
    title: "Pozice",
    description: "Popis činností",
    image: "/placeholder.svg?height=100&width=100"
  }
];


const Guides = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await fetch(`${config.API}/api/zajezds?filters[Stat][$ne]=null&fields[Stat]=true&sort[Stat]=asc`);
          const data = await response.json();
          const fetchedCountries = data.data.length > 0 ? data.data : [];
          setCountries(fetchedCountries);
        } catch (error) {
          console.error('Error fetching countries:',error);
        } finally {
          console.log("Success");
        }

      };
      fetchCountries();

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
            setLoading(false); // Set loading to false after fetch
        }
        };

        fetchImages();
    }, []);

  if (loading) return <div>{console.log('Loading...')}</div>; 
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-12">
        <img
            src={`${config.API}${images[0].url}`}
          alt="Sunset background"
          className="w-full h-48 object-cover rounded-lg"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Naši průvodci {console.log(countries)}
        </h1>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>S potěšením vám představujeme naše zkušené průvodce, kteří s námi pravidelně spolupracují:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Naši průvodci z řad profesionálů včetně studentů jsou držiteli průkazů průvodců 1. a 2. stupně.</li>
            <li>Nabízíme průvodcovskou činnost pro české i zahraniční skupiny v ČR i zahraničí.</li>
            <li>Poskytujeme doprovodné služby na konferencích a seminářích v českém i anglickém jazyce.</li>
            <li>Spolupracujeme s dalšími cestovními kancelářemi.</li>
          </ul>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex flex-row items-center gap-4">
                <Avatar 
                  src={guide.image} 
                  alt={guide.name} 
                  fallback={guide.name.split(' ').map(n => n[0]).join('')}
                />
                <div>
                  <CardTitle>{guide.name}</CardTitle>
                  <p className="text-sm text-gray-600">{guide.title}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{guide.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Guides;
