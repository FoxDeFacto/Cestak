// src/pages/DestinationDetail.js
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import config from '../config.json';
import ReactMarkdown from 'react-markdown';

const DestinationDetail = () => {

    const { id } = useParams();

    const [zajezd, setZajezd] = useState([]);

    useEffect(() => {
        const fetchZajezd = async () => {
            const response = await fetch(`${config.API}/api/zajezds/${id}?populate[0]=Obrazky`);
            const data = await response.json();
            setZajezd(data.data);
            console.log(data.data); 
        };
    
        fetchZajezd();
    }, [id]);

     // Function to render the images
     const renderImages = () => {
        if (zajezd.Obrazky && zajezd.Obrazky.length > 0) {
            return zajezd.Obrazky.map((image) => (
                <img key={image.id} src={`${config.API}${image.url}`} alt={image.name} className="rounded-lg w-full h-60 object-cover" />
            ));
        }
        return null;
    };

    return (
        <div>
            {/* Hero Section with Background Image and Text */}
            <section className="hero py-5 bg-cover bg-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black">{zajezd.Nazev}</h1>
                    <p className="text-lg text-black">{zajezd.DodatekNazvu ? zajezd.DodatekNazvu : ""}</p>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        {/* Left column: Description */}
                        <div className="w-full md:w-2/3">
                            <div id="myCarousel" className="carousel slide mb-6 relative shadow-lg" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                {renderImages()}
                                </div>
                                {/* Move the button inside the carousel and adjust its position */}
                                <a className="btn btn-lg absolute bg-gray-100 text-black shadow-md border border-gray-100" href="/galerie" style={{ bottom: '-10px', right: '-10px' }}>
                                    Prohlídka galerie
                                </a>
                            </div>
                        </div>

                        {/* Right column: Pricing and details */}
                        <div className="w-full md:w-1/3">
                            <div className="rounded-lg p-5 shadow-md bg-white">
                                <div className="text-center">
                                    <h2 className="text-2xl font-semibold">Cena: {zajezd.Cena} Kč</h2>
                                    <p>Od: {zajezd.Od} - Do: {zajezd.Do}</p>
                                </div>

                                <hr className="my-4" />

                                <div className="text-left">
                                    <p><strong>POČET DNŮ:</strong></p>
                                    <p><strong>DOPRAVA:</strong>
                                    {zajezd.Doprava}
                                    </p>
                                    <p><strong>STRAVA:</strong>{zajezd.Strava}</p>
                                </div>

                                <div className="text-center mt-4">
                                    <a href="#bottom-of-page" className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">Nezávazná poptávka</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Section */}
            <section className="program py-5">
            <h1 className="text-3xl font-bold text-black text-center pb-20">Program zájezdu</h1>
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

            {/* Price and zahrnujes/nezahrnujes Section */}
            <section className="price-details py-5 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        {/* Cena zahrnuje */}
                        <div className="w-full md:w-1/2 mb-4 flex flex-col items-center">
                            <h2 className="text-center">Cena zahrnuje</h2>
                            <ul className="list-disc list-inside">
                                <li className="mb-2">2x ubytování</li>
                                <li className="mb-2">2x snídaně</li>
                                <li className="mb-2">Doprava</li>
                                <li className="mb-2">Plavba po Dunaji</li>
                                <li className="mb-2">Místní průvodce</li>
                            </ul>
                        </div>
                        {/* Cena nezahrnuje */}
                        <div className="w-full md:w-1/2 flex flex-col items-center">
                            <h2 className="text-center">Cena nezahrnuje</h2>
                            <ul className="list-disc list-inside">
                                <li className="mb-2">Vstupné do lázní (např. Széchényi)</li>
                                <li className="mb-2">Stravování a další služby</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* End of Page Section */}
            <div id="bottom-of-page"></div>
    </div>
    );
};

export default DestinationDetail;
