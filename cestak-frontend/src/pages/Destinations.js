import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import config from '../config.json';

const Destinations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [zajezdy, setZajezdy] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useState(null);
    const [inputValues, setInputValues] = useState({
        'filters[Stat][$eq]': '',
        'filters[Od][$gte]': '',
        'filters[Do][$lte]': '',
        'filters[Doprava][$eq]': '',
        'filters[Nazev][$contains]': ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const params = new URLSearchParams(location.search);
        const newSearchParams = {
            'filters[Stat][$eq]': params.get('filters[Stat][$eq]') || '',
            'filters[Od][$gte]': params.get('filters[Od][$gte]') || '',
            'filters[Do][$lte]': params.get('filters[Do][$lte]') || '',
            'filters[Doprava][$eq]': params.get('filters[Doprava][$eq]') || '',
            'filters[Nazev][$contains]': params.get('filters[Nazev][$contains]') || ''
        };
        setSearchParams(newSearchParams);
        setInputValues(newSearchParams);
        setCurrentPage(1);
    }, [location.search]);

    const fetchZajezdy = useCallback(async () => {
        if (searchParams === null) return; // Don't fetch if searchParams is not set yet

        let queryParams = new URLSearchParams({
            'populate[0]': 'Obrazky',
            'pagination[page]': currentPage.toString(),
            'pagination[pageSize]': '12'
        });

        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) {
                queryParams.append(key, value);
            }
        });

        const url = `${config.API}/api/zajezds?${queryParams.toString()}`;
        console.log('API Call URL:', url);

        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setZajezdy(data.data);
            setTotalPages(data.meta.pagination.pageCount);
        } catch (error) {
            console.error('Error fetching zajezdy:', error);
            setZajezdy([]);
            setError(error); 
        } finally {
            setLoading(false);
        }
    }, [searchParams, currentPage]);

    useEffect(() => {
        if (searchParams !== null) {
            fetchZajezdy();
        }
    }, [fetchZajezdy, searchParams]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
        setSearchParams(inputValues); 
        setCurrentPage(1); 
        const queryString = new URLSearchParams(inputValues).toString();
        navigate(`/zajezdy?${queryString}`);
    };

    const handleReset = () => {
        const emptyParams = {
            'filters[Stat][$eq]': '',
            'filters[Od][$gte]': '',
            'filters[Do][$lte]': '',
            'filters[Doprava][$eq]': '',
            'filters[Nazev][$contains]': ''
        };
        setInputValues(emptyParams);
        setSearchParams(emptyParams);
        navigate("/zajezdy");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-red-800 mb-8">Zájezdy</h1>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="mb-8 flex flex-wrap justify-center">
                <select 
                    name="filters[Stat][$eq]" 
                    value={inputValues['filters[Stat][$eq]']}
                    onChange={handleInputChange}
                    className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                >
                    <option value="">Destinace</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                </select>
                <div className="flex items-center m-1"> 
                <label htmlFor="dateTo" className="mr-2 text-base font-semibold text-black">Do:</label>
                <input
                    type="date"
                    name="filters[Od][$gte]"
                    value={inputValues['filters[Od][$gte]']}
                    onChange={handleInputChange}
                    className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                />
                </div>
                <div className="flex items-center m-1">
                 <label htmlFor="dateTo" className="mr-2 text-base font-semibold text-black">Do:</label>
                <input
                    type="date"
                    name="filters[Do][$lte]"
                    value={inputValues['filters[Do][$lte]']}
                    onChange={handleInputChange}
                    className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                />
                </div>
                <select 
                    name="filters[Doprava][$eq]"
                    value={inputValues['filters[Doprava][$eq]']}
                    onChange={handleInputChange}
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
                    value={inputValues['filters[Nazev][$contains]']}
                    onChange={handleInputChange}
                    placeholder="Název zájezdu"
                    className="p-2 m-1 rounded-md border-2 border-gray-300 bg-white text-gray-700"
                />
                <button 
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white p-2 m-1 rounded-md"
                >
                    Hledat
                </button>
                <button type="button" onClick={handleReset} className='bg-red-700 hover:bg-red-800 text-white p-2 m-1 rounded-md'>Resetovat</button>
            </form>

             {/* Zajezdy Grid */}
             {zajezdy.length === 0 ? (
                <div className="flex justify-center gap-6 mb-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold text-red-700">Nebyly nalezeny žádné záznamy</h3>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {zajezdy.map((zajezd) => (
                        <div key={zajezd.id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold text-red-700">{zajezd.Nazev}</h3>
                            <p className="text-gray-500">{`${zajezd.Od.split('-').reverse().join('.')} - ${zajezd.Do.split('-').reverse().join('.')}`}</p>
                            <p className="font-bold mt-2 text-black">{zajezd.Cena} Kč</p>
                            {zajezd.Obrazky && zajezd.Obrazky[0] && (
                                <img
                                    src={`${config.API}${zajezd.Obrazky[0].url}`}
                                    alt={zajezd.Obrazky[0].name}
                                    className="h-40 w-40 object-cover rounded-full mx-auto my-4"
                                />
                            )}
                            <Link to={`/zajezdy/${zajezd.documentId}`} className="block mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-center">
                                Zjistit více
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button 
                            key={index + 1} 
                            onClick={() => setCurrentPage(index + 1)} 
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Destinations;
