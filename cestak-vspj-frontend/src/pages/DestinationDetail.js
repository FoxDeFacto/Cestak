// src/pages/DestinationDetail.js
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import config from '../config.json';
import ReactMarkdown from 'react-markdown';

const DestinationDetail = () => {

    const { id } = useParams();

    const [zajezd, setZajezd] = useState([]);
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchZajezd = async () => {
            const response = await fetch(`${config.API}/api/zajezds/${id}?populate=*`);
            const data = await response.json();
            setZajezd(data.data);
            setImages(data.data.Obrazky)
            console.log(data.data); 
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

    return (
        <div>

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
                            <span>📅</span>
                            <span>
                            Od: {zajezd.Od} - Do: {zajezd.Do}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-lg">
                            <span>🚌</span>
                            <span>Doprava: {zajezd.Doprava}</span>
                        </div>
                        {zajezd.InformaceDopravy && (
                            <div className="mb-4 text-lg">
                            <p className="font-bold">DODATEČNÉ INFORMACE O DOPRAVĚ:</p>
                            <p className="text-gray-800">{zajezd.InformaceDopravy}</p>
                            </div>
                        )}
                        <div className="flex items-center space-x-2 text-lg">
                            <span>🍽️</span>
                            <span>Strava: {zajezd.Strava}</span>
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

            {/* Modal for Prohlídka galerie */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-4">Nezávazná poptávka</h2>
                    <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Jméno</label>
                        <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Vaše jméno"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Váš email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Zpráva</label>
                        <textarea
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Vaše zpráva"
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                        type="button"
                        className="btn btn-primary bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => setIsModalOpen(false)}
                        >
                        Odeslat
                        </button>
                        <button
                        type="button"
                        className="ml-2 bg-red-500 hover:bg-red-800 text-black font-bold py-2 px-4 rounded-lg"
                        onClick={() => setIsModalOpen(false)}
                        >
                        Zrušit
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}
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
            
    </div>
    );
};

export default DestinationDetail;
