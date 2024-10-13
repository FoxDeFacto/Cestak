// src/pages/Homepage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaMapMarkedAlt, FaShieldAlt } from "react-icons/fa";
import config from '../config.json';

const Homepage = () => {

    const [zajezdy, setZajezdy] = useState([]);
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState({
        'filters[Stat][$eq]': '',
        'filters[Od][$gte]': '',
        'filters[Do][$lte]': '',
        'filters[Doprava][$eq]': '',
        'filters[Nazev][$contains]': ''
    });

    const countries = [
        { id: "Česko", name: "Česko" },
        { id: "Bulharsko", name: "Bulharsko" },
        { id: "Egypt", name: "Egypt" },
        { id: "Francie", name: "Francie" },
        { id: "Indie", name: "Indie" },
        { id: "Madeira", name: "Madeira" },
        { id: "Maďarsko", name: "Maďarsko" },
        { id: "Nizozemsko", name: "Nizozemsko" },
        { id: "Německo", name: "Německo" },
        { id: "Rakousko", name: "Rakousko" },
        { id: "Rumunsko", name: "Rumunsko" },
        { id: "Slovinsko", name: "Slovinsko" },
        { id: "Spojené arabské emiráty", name: "Spojené arabské emiráty" },
        { id: "Švýcarsko", name: "Švýcarsko" }
      ];
      
      
      const transportMethods = [
        { id: "Vlakem", name: "Vlakem" },
        { id: "Letecky", name: "Letecky" },
        { id: "Autobusem", name: "Autobusem" }
      ];

      useEffect(() => {
        const fetchZajezdy = async () => {
          try {
            const response = await fetch(`${config.API}/api/zajezds?populate[0]=Obrazky&sort[0]=Od:asc&pagination[limit]=3`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setZajezdy(data.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchZajezdy();
      }, []);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const queryString = new URLSearchParams(searchParams).toString();
        navigate(`/zajezdy?${queryString}`);
    };

    // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${config.API}/api/uvodni-obrazkies?populate=*`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const fetchedImages = data.data.length > 0 ? data.data[0].Obrazky.slice(0, 4) : [ config.defaultImage,config.defaultImage,config.defaultImage ];
        setImages(fetchedImages);
        setLoadingImages(false);
      } catch (err) {
        setError(err);
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, []);

    // Carousel auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images]);

    if (loading || loadingImages) return <div>{console.log('Loading...')}</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col bg-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white pb-4">
            <div className="relative w-full h-96 overflow-hidden"> {/* Increased height */}
                    {images.map((img, index) => (
                        <img
                            key={img.id}
                            src={`${config.API}${img.url}`}
                            alt={`Slide ${index + 1}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}

                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 bg-opacity-70 p-4 rounded-lg text-center">
                            <h1 className="text-3xl font-bold">Vítejte v Теstovací Cestovní kanceláři</h1>
                            <h2 className="text-2xl">Vysoké školy</h2>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button 
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                        onClick={() => setCurrentSlide((currentSlide - 1 + images.length) % images.length)}
                    >
                        <div className="text-red-600">◀</div>
                    </button>
                    <button 
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                        onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}
                    >
                        <div className="text-red-600">▶</div>
                    </button>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentSlide(index)} // Click to navigate to the specific slide
                                className={`h-3 w-3 rounded-full cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Search Bar */}
                <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center justify-center mt-4 px-4">
                    <select
                        name="filters[Stat][$eq]"
                        value={searchParams['filters[Stat][$eq]']}
                        onChange={handleSearchChange}
                        className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                    >
                        <option value="">Destinace</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                    </select>

                    <div className="flex items-center m-1">
                        <label htmlFor="dateFrom" className="mr-2 text-base font-semibold text-white">Od:</label>
                        <input
                            id="dateFrom"
                            type="date"
                            name="filters[Od][$gte]"
                            value={searchParams['filters[Od][$gte]']}
                            onChange={handleSearchChange}
                            className="p-2 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                        />
                    </div>

                    <div className="flex items-center m-1">
                        <label htmlFor="dateTo" className="mr-2 text-base font-semibold text-white">Do:</label>
                        <input
                            id="dateTo"
                            type="date"
                            name="filters[Do][$lte]"
                            value={searchParams['filters[Do][$lte]']}
                            onChange={handleSearchChange}
                            className="p-2 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                        />
                    </div>

                    <select
                        name="filters[Doprava][$eq]"
                        value={searchParams['filters[Doprava][$eq]']}
                        onChange={handleSearchChange}
                        className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                    >
                        <option value="">Způsob dopravy</option>
                        {transportMethods.map((mode) => (
                            <option key={mode.id} value={mode.id}>{mode.name}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="filters[Nazev][$contains]"
                        value={searchParams['filters[Nazev][$contains]']}
                        onChange={handleSearchChange}
                        placeholder="Název zájezdu"
                        className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                    />

                    <button type="submit" className="bg-red-600 hover:bg-red-700 text-white p-2 m-1 rounded-md">
                        Hledat
                    </button>
                </form>

            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Přehled nejbližších cest */}
                <h2 className="text-3xl font-semibold mb-4 text-center text-red-800">Zájezdy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {zajezdy.map((zajezd) => (
                        <div key={zajezd.id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold text-red-700">{zajezd.Nazev}</h3>
                            <p className="text-gray-500 font-semibold">{`${zajezd.Od.split('-').reverse().join('.')} - ${zajezd.Do.split('-').reverse().join('.')}`}</p>
                            <p className="text-lg font-bold mt-2 text-black">{zajezd.Cena} Kč</p>
                            <img
                                key={zajezd.Obrazky[0].id}
                                src={`${config.API}${zajezd.Obrazky[0].url}`}
                                alt={zajezd.Obrazky[0].name}
                                className="h-40 w-40 object-cover rounded-full mx-auto my-4"
                            />
                            <Link to={`/zajezdy/${zajezd.documentId}`} className="block mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-center">
                                Zjistit více
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="container mx-auto my-8 px-4">
                    <hr className="my-4" />
                    
                    <div className="flex flex-col md:flex-row featurette my-8">
                        <div className="md:w-7/12">
                            <h2 className="text-3xl font-normal leading-tight">Prezentace společnosti Робота</h2>
                            <p className="mt-2 text-lg">
                                Dne 29. 2. 2024 se naše Cestovní kancelář účastnila prezentace společnosti Робота. 
                                Jedná se o společnost, která má ve svém portfoliu více než 70 dopravcních společností z Evropy. 
                                Aktuálně sepisujeme smlouvy o spolupráci a vy se můžete těšit na zajímavé nabídky 
                                zahrnující mimo jiné i vlakovou dopravu.
                            </p>
                        </div>
                        <div className="md:w-5/12 flex justify-center">
                            <Link to="/o-nas">
                                <img
                                    src={`${config.API}${images[1].url}`}
                                    alt="Prezentace společnosti Rail Europe"
                                    className="max-h-80 max-w-full shadow-lg rounded-lg"
                                />
                            </Link>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="flex flex-col md:flex-row featurette my-8">
                        {/* Image Section */}
                        <div className="md:w-7/12 order-2 md:order-1 flex justify-center">
                            <Link to="/o-nas" className="block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
                                <img
                                    src={`${config.API}${images[2].url}`}
                                    alt="Workshop Mauricius"
                                    className="max-h-80 max-w-full shadow-lg rounded-lg"
                                />
                            </Link>
                        </div>

                        {/* Text Section */}
                        <div className="md:w-5/12 order-1 md:order-2 flex flex-col justify-center text-center md:text-left">
                            <h2 className="text-3xl font-normal leading-tight">Workshop Exotika</h2>
                            <p className="mt-2 text-lg">
                                Dne 30. 2. 2024 proběhl v Praze veletrh se zástupci lokálních partnerů, hotelů a cestovních 
                                kanceláří z Exotiky. Za celý den jsme navázali řadu kontaktů, díky nimž 
                                vám budeme moci nabídnout výhodnější ubytování i dovolenou v této krásné a stále 
                                oblíbenější destinaci.
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            <section className="container mx-auto px-4 py-8">
                {/* Informační sekce */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/o-nas">
                    <div className="bg-white shadow-md rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_5px_3px_rgba(169,169,169,0.5)]">
                        <div className="flex items-center mb-2">
                        <FaInfoCircle className="text-2xl text-red-500" />
                        <h3 className="text-lg font-semibold ml-2">O nás</h3>
                        </div>
                        <p>Jsme přední poskytovatel cestovních služeb s dlouholetou tradicí a spokojenými zákazníky po celé Evropě.</p>
                    </div>
                    </Link>

                    <Link to="/kontakty">
                    <div className="bg-white shadow-md rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_5px_3px_rgba(169,169,169,0.5)]">
                        <div className="flex items-center mb-2">
                        <FaMapMarkedAlt className="text-2xl text-red-500" />
                        <h3 className="text-lg font-semibold ml-2">Kontakty</h3>
                        </div>
                        <p>Nabízíme cesty do více než 100 destinací napříč Evropou. Od historických měst po nádherné přírodní scenérie.</p>
                    </div>
                    </Link>

                    <Link to="/pruvodci">
                    <div className="bg-white shadow-md rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_5px_3px_rgba(169,169,169,0.5)]">
                        <div className="flex items-center mb-2">
                        <FaShieldAlt className="text-2xl text-red-500" />
                        <h3 className="text-lg font-semibold ml-2">Průvodci</h3>
                        </div>
                        <p>Vaše bezpečnost je naší prioritou. Všechny naše cesty jsou plně pojištěny a splňují nejvyšší bezpečnostní standardy.</p>
                    </div>
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default Homepage;
