// src/pages/About.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaInfoCircle, FaHeadset, FaPhone } from "react-icons/fa";
import config from '../config.json';

  const About = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const teamMembers = [
      { name: "Alex Johnson", role: "Founder & CEO", image: "/placeholder.svg" },
      { name: "Sarah Lee", role: "Head of Operations", image: "/placeholder.svg" },
      { name: "Mike Chen", role: "Lead Travel Consultant", image: "/placeholder.svg" },
      { name: "Emma Rodriguez", role: "Customer Experience Manager", image: "/placeholder.svg" },
    ];

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
      <div className="container mx-auto px-4 py-8 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Cestování. Dovolená. Dobrodružství.</h1>
          <p className="text-xl text-gray-600">Test cesťák ze 2 dny hotový</p>
        </header>
  
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">O nás</h2>
            <p className="text-gray-600">
              Vysoká škola polytechnická Jihlava je od 7. 3. 2008 vlastníkem koncese na provozování cestovní kanceláře.
              Kancelář při VŠPJ byla zřízena za účelem vytvoření prostředí pro získání praktických zkušeností našich studentů v oboru a organizace zájezdů studentů oboru Cestovní ruch.
            </p>
            <p className="text-gray-600">
              Kromě vícedenních pobytů nabízí CK VŠPJ i jednodenní poznávací zájezdy po přírodních i kulturních památkách ČR a okolních států. 
              Takto naši klienti navštívili např. památky UNESCO na Vysočině, v Jižních Čechách a Olomouci. 
              Nelze opomenout ani návštěvy Vídně a Drážďan.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={`${config.API}${images[0].url}`}
              alt="Travelers exploring a scenic location"
              width={500}
              height={400} 
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Naše cíle</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 text-center space-y-2 bg-white">
              <FaThumbsUp className="w-12 h-12 mx-auto text-red-500" /> {/* Ikona pro kvalitu */}
              <h3 className="text-xl font-semibold">Péče a kvalita</h3>
              <p className="text-gray-600">
                Od 4. prosince 2023 je naše cestovní kancelář držitelem certifikátu kvality 'Péče o kvalitu' pro sektor služeb cestovních kanceláří. 
                Tento certifikát potvrzuje naši snahu o poskytování kvalitních služeb našim klientům.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center space-y-2 bg-white">
              <FaInfoCircle className="w-12 h-12 mx-auto text-red-500" /> {/* Ikona pro informace */}
              <h3 className="text-xl font-semibold">Informace a služby</h3>
              <p className="text-gray-600">
                Aktuální informace, ale i tipy na výlety či zajímavosti ze světa cestovního ruchu najdete také na našem Facebooku a Instagramu. 
                Umožňujeme také přímé objednávky letenek, ubytování a pojištění.
              </p>
            </div>
            <div className="border rounded-lg p-6 text-center space-y-2 bg-white">
              <FaHeadset className="w-12 h-12 mx-auto text-red-500" /> {/* Ikona pro podporu */}
              <h3 className="text-xl font-semibold">Podpora</h3>
              <p className="text-gray-600">
                Provozujeme také průvodcovskou činnost - možnost objednání průvodce po Jihlavě nebo průvodce po ČR či zahraničí, a to v ČJ nebo AJ.
              </p>
            </div>
          </div>
        </section>

  
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">Náš tým</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="border rounded-lg text-center p-6 space-y-2">
                <img
                  src={`${config.API}${images[0].url}`}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto"
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
  
        <section className="bg-red-500 text-white p-8 rounded-lg text-center space-y-4">
          <h2 className="text-3xl font-semibold">Připraven na cestování?</h2>
          <p className="text-xl">Společně tvoříme nezapomenutelné vzpomínky</p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-4 flex items-center justify-center">
            <FaPhone className="mr-2 h-4 w-4" />
            <Link to="/kontakty" className="block md:inline-block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
            Kontakty
          </Link>
          </button>
        </section>
      </div>
    );
  }

  export default About;