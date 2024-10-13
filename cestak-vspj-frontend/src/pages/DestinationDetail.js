// src/pages/DestinationDetail.js
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import config from '../config.json';
import ReactMarkdown from 'react-markdown';
import { FaCalendarAlt, FaBus,  FaPlane, FaTrain, FaUtensils } from 'react-icons/fa';
import './DestinationDetail.css';

const getTransportIcon = (transport) => {
    switch (transport) {
        case 'Vlakem':
            return <FaTrain className="text-red-500" />;
        case 'Letecky':
            return <FaPlane className="text-red-500" />;
        case 'Autobusem':
            return <FaBus className="text-red-500" />;
        default:
            return <FaBus className="text-red-500" />;
    }
};

const DestinationDetail = () => {

    const { id } = useParams();

    const [zajezd, setZajezd] = useState([]);
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchZajezd = async () => {
          try {
            const response = await fetch(`${config.API}/api/zajezds/${id}?populate=*`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setZajezd(data.data);
            setImages(data.data.Obrazky || []);
          } catch (err) {
            setError(err);
            setLoading(false);
          } finally {
            setLoading(false);
          }
        };
    
        fetchZajezd();
      }, [id]);

    // Carousel auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images]);

    const [formData, setFormData] = useState({
        PocetOsob: 1,
        CeleJmeno: '',
        Bydliste: '',
        Telefon: '',
        Email: '',
        DatumNarozeni: '',
        Termin: '',
        Poznamka: '',
        Pojisteni: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) => { //TODO Opravit tuhle zkurvenou sračku, nesnáším relace ve strapi
        e.preventDefault();  

        const requestBody = {
            data: {
                PocetOsob: parseInt(formData.PocetOsob, 10),
                CeleJmeno: formData.CeleJmeno,
                Bydliste: formData.Bydliste,
                Telefon: formData.Telefon,
                Email: formData.Email,
                DatumNarozeni: formData.DatumNarozeni,
                Termin: formData.Termin ? [
                    {
                        Od: formData.Termin.Od.replace(/"/g, ''),
                        Do: formData.Termin.Do.replace(/"/g, '')
                    }
                ] : [],
                Poznamka: formData.Poznamka,
                Pojisteni: formData.Pojisteni,
                Zajezd: {
                    connect: [{ id: zajezd.id }]
                }
            }
        };

        console.log(requestBody);

        try {
            const response = await fetch(`${config.API}/api/poptavkas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            
            setFormData({
                PocetOsob: 1,
                CeleJmeno: '',
                Bydliste: '',
                Telefon: '',
                Email: '',
                DatumNarozeni: '',
                Termin: '',
                Poznamka: '',
                Pojisteni: false
            });
            setIsModalOpen(false);
            
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const openModal = (termin = null) => {
        setFormData(prevData => ({
          ...prevData,
          Termin: termin
        }));
        setIsModalOpen(true);
      };

    const handleTerminChange = (e) => {
        const selectedTermin = zajezd.Termin.find((termin) => termin.id === parseInt(e.target.value, 10));
        setFormData(prevData => ({
            ...prevData,
            Termin: selectedTermin ? {
                Od: selectedTermin.Od,
                Do: selectedTermin.Do
            } : null
        }));
    };

    if (loading) return <div>{console.log("Načítání...")}</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {isModalOpen && (
                <div className="modal-overlay absolute inset-0 z-50 flex items-center justify-center">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Nezávazná poptávka</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Počet Osob</label>
                                <input
                                    type="number"
                                    name="PocetOsob"
                                    value={formData.PocetOsob}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Počet osob"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Celé Jméno</label>
                                <input
                                    type="text"
                                    name="CeleJmeno"
                                    value={formData.CeleJmeno}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Vaše celé jméno"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Bydliště</label>
                                <input
                                    type="text"
                                    name="Bydliste"
                                    value={formData.Bydliste}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Vaše bydliště"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Telefon</label>
                                <input
                                    type="tel"
                                    name="Telefon"
                                    value={formData.Telefon}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Vaše telefonní číslo"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Váš email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Datum Narození</label>
                                <input
                                    type="date"
                                    name="DatumNarozeni"
                                    value={formData.DatumNarozeni}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Vyberte termín</label>
                                <select
                                    name="Termin"
                                    value={formData.Termin?.id || ""}
                                    onChange={handleTerminChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                    >
                                    <option value="">Vyberte termín</option>
                                    {zajezd.Termin.map((termin) => (
                                        <option key={termin.id} value={termin.id}>
                                        {termin.Od.split('-').reverse().join('.')} - {termin.Do.split('-').reverse().join('.')}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700">Poznámka</label>
                                <textarea
                                    name="Poznamka"
                                    value={formData.Poznamka}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Vaše poznámka"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="Pojisteni"
                                        checked={formData.Pojisteni}
                                        onChange={handleInputChangeCheckbox}
                                        className="mr-2"
                                    />
                                    Pojištění
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Odeslat
                                </button>
                                <button
                                    type="button"
                                    className="ml-2 bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Zrušit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <section className="container mx-auto px-4 pb-8 scale-[0.95]">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="text-center bg-gradient-to-r from-red-600 to-red-800 py-5">
                    <h1 className="text-5xl font-bold text-white">{zajezd.Nazev}</h1>
                    <p className="text-xl text-white">
                        {zajezd.DodatekNazvu ? zajezd.DodatekNazvu : ""}
                    </p>
                    </div>
                    <div className="relative p-4 bg-gray-100">
                    <div className="carousel slide mb-6 relative">
                        <div className="relative w-full max-w-[850px] h-[50vh] mx-auto overflow-hidden p-4 bg-white rounded-lg shadow-lg">
                        {/* Render images as carousel slides */}
                        {images.map((img, index) => (
                            <img
                            key={img.id}
                            src={`${config.API}${img.url}`}
                            alt={`Slide ${index + 1}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                                index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                            />
                        ))}

                        <button
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
                            onClick={() =>
                            setCurrentSlide((currentSlide - 1 + images.length) % images.length)
                            }
                        >
                            <div className="text-red-600">◀</div>
                        </button>
                        <button
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md"
                            onClick={() => setCurrentSlide((currentSlide + 1) % images.length)}
                        >
                            <div className="text-red-600">▶</div>
                        </button>
                        </div>
                    </div>
                        <div className="grid md:grid-cols-2 gap-6 p-6 border border-gray-500 rounded-xl bg-white">
                            <div className="space-y-4">
                            <div className="flex items-center space-x-2 text-lg">
                                <FaCalendarAlt className="text-red-500" />
                                <span>
                                    Rozsah termínů : <strong>{zajezd.Od.split('-').reverse().join('.')} - {zajezd.Do.split('-').reverse().join('.')}</strong>
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-lg">
                                {getTransportIcon(zajezd.Doprava)} {/* Change the icon here */}
                                <span>Doprava: <strong>{zajezd.Doprava}</strong></span>
                            </div>
                            {zajezd.InformaceDopravy && (
                                <div className="mb-4 text-lg">
                                    <p className="font-bold">DODATEČNÉ INFORMACE O DOPRAVĚ:</p>
                                    <p className="text-gray-800">{zajezd.InformaceDopravy}</p>
                                </div>
                            )}
                            <div className="flex items-center space-x-2 text-lg">
                                <FaUtensils className="text-red-500" />
                                <span>Strava: <strong>{zajezd.Strava}</strong></span>
                            </div>
                            </div>
                            <div className="flex flex-col items-center space-y-4 mt-6">
                                <div className="text-3xl font-bold text-primary text-center">
                                    Cena: {zajezd.Cena} Kč
                                </div>

                                {/* Add horizontal line */}
                                <hr className="w-1/2 border-t-2 border-gray-300 my-4" />

                                <div className="text-center">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="btn btn-primary bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    >
                                        Nezávazná poptávka
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* Program Section */}
            <section className="py-5">
                <h1 className="text-3xl font-bold text-black text-center pb-10">Program zájezdu</h1>
                <div className="container mx-auto px-4 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed">
                    <ReactMarkdown
                        className="markdown-content"
                        components={{
                        h1: ({node, children, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>{children}</h1>,
                        h2: ({node, children, ...props}) => <h2 className="text-3xl font-semibold mt-6 mb-4" {...props}>{children}</h2>,
                        h3: ({node, children, ...props}) => <h3 className="text-2xl font-medium mt-4 mb-3" {...props}>{children}</h3>,
                        p: ({node, children, ...props}) => <p className="my-4 leading-relaxed" {...props}>{children}</p>,
                        hr: ({node, ...props}) => <hr className="my-8 border-gray-300" {...props} />,
                        }}
                    >
                    {zajezd.Program}
                    </ReactMarkdown>
                </div>
            </section>

            <section className="py-10 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center space-x-10">
                    {zajezd.Detail && zajezd.Detail.length > 0 ? (
                        zajezd.Detail.map((detail, index) => (
                        <div
                            key={index}
                            className="w-full md:w-1/2 lg:w-1/3 mb-6 flex flex-col items-center scale-105"
                        >
                            <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                            <div className="prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed">
                                <ReactMarkdown
                                className="markdown-content"
                                components={{
                                    h1: ({ node, children, ...props }) => (
                                    <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
                                        {children}
                                    </h1>
                                    ),
                                    h2: ({ node, children, ...props }) => (
                                    <h2 className="text-3xl font-semibold mt-6 mb-4" {...props}>
                                        {children}
                                    </h2>
                                    ),
                                    h3: ({ node, children, ...props }) => (
                                    <h3 className="text-2xl font-semibold mt-4 mb-3" {...props}>
                                        {children}
                                    </h3>
                                    ),
                                    h4: ({ node, children, ...props }) => (
                                    <h4 className="text-xl font-semibold mt-4 mb-3" {...props}>
                                        {children}
                                    </h4>
                                    ),
                                    p: ({ node, children, ...props }) => (
                                    <p className="my-4 leading-relaxed" {...props}>
                                        {children}
                                    </p>
                                    ),
                                    hr: ({ node, ...props }) => (
                                    <hr className="my-8 border-gray-300" {...props} />
                                    ),
                                    ul: ({ node, children, ...props }) => (
                                    <ul className="list-disc pl-5 my-4" {...props}>
                                        {children}
                                    </ul>
                                    ),
                                    li: ({ node, children, ...props }) => (
                                    <li className="my-2" {...props}>
                                        {children}
                                    </li>
                                    ),
                                }}
                                >
                                {detail.Detaily}
                                </ReactMarkdown>
                            </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-center text-xl font-semibold">Detaily nejsou dostupné.</p>
                    )}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-8">
                {zajezd.Tipy && zajezd.Tipy.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {zajezd.Tipy.map((tip, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold ml-2">{tip.Nazev}</h3>
                        </div>
                        <p>{tip.Popis}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-center">Žádné tipy nejsou k dispozici.</p>
                )}
            </section>

            <section className="py-5">
                {zajezd.Poznamky && (
                    <>
                    <h1 className="text-3xl font-bold text-black text-center pb-10">Poznámky</h1>
                    <div className="container mx-auto px-4 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed">
                        <ReactMarkdown
                        className="markdown-content"
                        components={{
                            h1: ({ node, children, ...props }) => (
                            <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>{children}</h1>
                            ),
                            h2: ({ node, children, ...props }) => (
                            <h2 className="text-3xl font-semibold mt-6 mb-4" {...props}>{children}</h2>
                            ),
                            h3: ({ node, children, ...props }) => (
                            <h3 className="text-2xl font-medium mt-4 mb-3" {...props}>{children}</h3>
                            ),
                            p: ({ node, children, ...props }) => (
                            <p className="my-4 leading-relaxed" {...props}>{children}</p>
                            ),
                            hr: ({ node, ...props }) => (
                            <hr className="my-8 border-gray-300" {...props} />
                            ),
                        }}
                        >
                        {zajezd.Poznamky}
                        </ReactMarkdown>
                    </div>
                    </>
                )}
            </section>

            <section className="flex justify-center items-center bg-gray-100 p-4">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-red-500 text-white">
                                    <th className="px-4 py-2 text-left text-sm md:text-base uppercase tracking-wider">Od</th>
                                    <th className="px-4 py-2 text-left text-sm md:text-base uppercase tracking-wider">Do</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {zajezd.Termin.map((termin, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{termin.Od.split('-').reverse().join('.')}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{termin.Do.split('-').reverse().join('.')}</div>
                                        </td>
                                        <td className="pr-9 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            className="btn btn-primary bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                                            onClick={() => openModal(termin)}
                                            >
                                            Nezávazná poptávka
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
      
    </div>
    );
};

export default DestinationDetail;
