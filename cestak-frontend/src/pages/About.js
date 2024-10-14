// src/pages/About.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaInfoCircle, FaHeadset, FaPhone } from "react-icons/fa";
import config from '../config.json';

  const About = () => {

    const [images, setImages] = useState([]);
    const [teamMembers, setTeaMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true);
    const [error, setError] = useState(null);


      useEffect(() => {
        const fetchTeamMembers = async () => {
          try {
            const response = await fetch(`${config.API}/api/nas-tyms?populate=*`);
            const data = await response.json();
            setTeaMembers(data.data);
            setLoading(false);
          } catch (error) {
              console.error('Error fetching images:', error);
              setError(true);
          } finally {
              setLoading(false); // Set loading to false after fetch
          }
          };

        fetchTeamMembers();
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
            setLoadingImages(false); // Set loading to false after fetch
        }
        };

        fetchImages();
    }, []);

  if (loading || loadingImages) return <div>{console.log('Loading...')}</div>; 
  if (error) return <div>Error: {error.message}</div>;

    return (
      <div>
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2">
          <div className="relative w-full h-96 overflow-hidden">
              <img
               src={images && images.length > 2 && images[2].url ? `${config.API}${images[2].url}` : config.defaultImage}
              alt="Mountain landscape" // Corrected the attribute
              className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 bg-opacity-70 p-4 rounded-lg text-center">
                  <h1 className="text-3xl font-bold">Cestování. Dovolená. Dobrodružství.</h1>
                  <p className="text-xl">Test cesťák ze 2 dny hotový</p>
              </div>
              </div>
          </div>
        </div>
      <div className="container mx-auto px-4 py-8 space-y-12">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">O nás</h2>
            <p className="text-gray-600">
              Vysoká škola je od 7. 3. 2008 vlastníkem koncese na provozování cestovní kanceláře.
              Kancelář byla zřízena za účelem vytvoření prostředí pro získání praktických zkušeností našich studentů v oboru a organizace zájezdů studentů oboru Cestovní ruch.
            </p>
            <p className="text-gray-600">
              Kromě vícedenních pobytů nabízí CK i jednodenní poznávací zájezdy po přírodních i kulturních památkách ČR a okolních států. 
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
          <div className="flex flex-wrap justify-evenly">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`text-center p-6 space-y-2 w-1/3 ${index % 3 === 0 ? 'clear-left' : ''}`}
              >
                <img
                  src={`${config.API}${member.Obrazek.url}`}
                  alt={member.Nazev}
                  width={250}
                  height={350}
                  className="rounded-full mx-auto"
                />
                <h3 className="font-semibold">{member.CeleJmeno}</h3>
                <p className="text-sm text-gray-600">{member.Pozice}</p>
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
      </div>
    );
  }

  export default About;