// src/pages/Homepage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config.json';

const Homepage = () => {

    const [zajezdy, setZajezdy] = useState([]);
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState({
        'filters[Stat][$eq]': '',  // or [$contains] for partial matches
        'filters[Od][$gte]': '',
        'filters[Do][$lte]': '',
        'filters[Doprava][$eq]': '',
        'filters[Nazev][$contains]': ''  // Use $contains for partial matching
    });

    const countries = [
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
            const response = await fetch(`${config.API}/api/zajezds?populate[0]=Obrazky`);
            const data = await response.json();
            setZajezdy(data.data);
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
            const response = await fetch(`${config.API}/api/uvodni-obrazkies?populate=*`);
            const data = await response.json();
            // Access the images from the first item in the response
            const fetchedImages = data.data.length > 0 ? data.data[0].Obrazky : [];
            setImages(fetchedImages); // Set the images state with the nested image data
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

    return (
        <div className="flex flex-col bg-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white pb-6">
                <div className="relative w-full h-80 overflow-hidden"> {/* Increased height */}
                    {images.map((img, index) => (
                        <img
                            key={img.id} // Ensure img.id is unique
                            src={`${config.API}${img.url}`} // Build the full URL
                            alt={`Slide ${index + 1}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}

                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 bg-opacity-70 p-4 rounded-lg text-center">
                            <h1 className="text-3xl font-bold">Vítejte v Теstovací Cestovní kanceláři</h1>
                            <h2 className="text-2xl">Vysoké školy polytechnické Jihlava</h2>
                        </div>
                    </div>

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
                </div>

                {/* Enhanced Search Bar */}
                <form onSubmit={handleSearchSubmit} className="flex flex-wrap justify-center mt-4 px-4">
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
                    <input
                        type="date"
                        name="filters[Od][$gte]"
                        value={searchParams['filters[Od][$gte]']}
                        onChange={handleSearchChange}
                        className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                    />
                    <input
                        type="date"
                        name="filters[Do][$lte]"
                        value={searchParams['filters[Do][$lte]']}
                        onChange={handleSearchChange}
                        className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                    />
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
                            <p className="text-gray-500">{zajezd.Od}</p>
                            <p className="font-bold mt-2 text-red-600">{zajezd.Cena}</p>
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
                    
                    {/* Featurette 1 */}
                    <div className="flex flex-col md:flex-row featurette my-8">
                        <div className="md:w-7/12">
                            <h2 className="text-3xl font-normal leading-tight">Prezentace společnosti Rail Europe</h2>
                            <p className="mt-2 text-lg">
                                Dne 18. 9. 2024 se naše Cestovní kancelář účastnila prezentace společnosti Rail Europe. 
                                Jedná se o společnost, která má ve svém portfoliu více než 70 dopravcních společností z Evropy. 
                                Aktuálně sepisujeme smlouvy o spolupráci a vy se můžete těšit na zajímavé nabídky 
                                zahrnující mimo jiné i vlakovou dopravu.
                            </p>
                        </div>
                        <div className="md:w-5/12 flex justify-center">
                            <Link to="/o-nas">
                                <img
                                    src="/images/aktualita.jpg"
                                    alt="Prezentace společnosti Rail Europe"
                                    className="max-h-80 max-w-full shadow-lg rounded-lg"
                                />
                            </Link>
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* Featurette 2 */}
                    <div className="flex flex-col md:flex-row featurette my-8">
                        <div className="md:w-7/12 order-2 md:order-1">
                            <h2 className="text-3xl font-normal leading-tight">Workshop Mauricius</h2>
                            <p className="mt-2 text-lg">
                                Dne 13. 9. 2024 proběhl v Praze veletrh se zástupci lokálních partnerů, hotelů a cestovních 
                                kanceláří z ostrova Mauricius. Za celý den jsme navázali řadu kontaktů, díky nimž 
                                vám budeme moci nabídnout výhodnější ubytování i dovolenou v této krásné a stále 
                                oblíbenější destinaci.
                            </p>
                        </div>
                        <div className="md:w-5/12 order-1 md:order-2 flex justify-center">
                        <Link to="/o-nas" className="block md:inline-block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
                            Přehled
                                <img
                                    src="/images/aktualita2.jpg"
                                    alt="Workshop Mauricius"
                                    className="max-h-80 max-w-full shadow-lg rounded-lg"
                                />
                        </Link>
                        </div>
                    </div>

                </div>
            </main>

            <div className="container mx-auto px-4 py-8">

                {/* Informační sekce */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center mb-2">
                        <span role="img" aria-label="info" className="text-2xl">
                        ℹ️
                        </span>
                        <h3 className="text-lg font-semibold ml-2">O nás</h3>
                    </div>
                    <p>Jsme přední poskytovatel cestovních služeb s dlouholetou tradicí a spokojenými zákazníky po celé Evropě.</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center mb-2">
                        <span role="img" aria-label="map" className="text-2xl">
                        🗺️
                        </span>
                        <h3 className="text-lg font-semibold ml-2">Naše destinace</h3>
                    </div>
                    <p>Nabízíme cesty do více než 100 destinací napříč Evropou. Od historických měst po nádherné přírodní scenérie.</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center mb-2">
                        <span role="img" aria-label="shield" className="text-2xl">
                        🛡️
                        </span>
                        <h3 className="text-lg font-semibold ml-2">Bezpečnost</h3>
                    </div>
                    <p>Vaše bezpečnost je naší prioritou. Všechny naše cesty jsou plně pojištěny a splňují nejvyšší bezpečnostní standardy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
