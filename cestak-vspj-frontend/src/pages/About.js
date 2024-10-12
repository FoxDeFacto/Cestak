// src/pages/About.js
import React, { useState, useEffect } from 'react';

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

  const About = () => {
    const [team, setTeam] = useState([]);
    const [practicants, setPracticants] = useState([]);
  
    useEffect(() => {
      // Simulate fetching data from an API
      const fetchTeam = async () => {
        // Simulated API response for the team
        const teamData = [
          {
            name: "Ondřej Petržela",
            title: "Vedoucí cestovní kanceláře",
            description: "Zkušený vedoucí s dlouholetou praxí v cestovním ruchu.",
            image: "/placeholder.svg?height=100&width=100"
          },
          {
            name: "Mgr. Pavlína Rojík Fulnečková",
            title: "Zástupce vedoucího",
            description: "Specialista na marketing a rozvoj cestovní kanceláře.",
            image: "/placeholder.svg?height=100&width=100"
          }
        ];
        setTeam(teamData);
      };
  
      const fetchPracticants = async () => {
        // Simulated API response for practicants
        const practicantsData = [
          {
            name: "Žaneta Spilková",
            title: "Studentka VŠP",
            description: "Průvodcovská činnost v rámci poznávací praxe, průvodce výletů ČK VŠP, Průvodcování školních zájezdů - Evropa",
            image: "/placeholder.svg?height=100&width=100"
          },
          {
            name: "Magdaléna Malcharková",
            title: "Studentka VŠP",
            description: "Průvodcovská činnost v rámci poznávací praxe, průvodce výletů ČK VŠP",
            image: "/placeholder.svg?height=100&width=100"
          },
          {
            name: "Ludmila Svobodová",
            title: "Studentka VŠP",
            description: "Specializace na poznávávací klientelu, práce pro školy, Specializace na střední Evropu.",
            image: "/placeholder.svg?height=100&width=100"
          },
          {
            name: "Veronika Severová",
            title: "Studentka VŠP",
            description: "Průvodcovská činnost v rámci poznávací praxe, průvodce výletů ČK VŠP, Praxe v dalších cestých CK a CA.",
            image: "/placeholder.svg?height=100&width=100"
          }
        ];
        setPracticants(practicantsData);
      };
  
      fetchTeam();
      fetchPracticants();
    }, []);
  
    return (
      <div className="flex flex-col bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white pb-6">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center">O nás</h1>
            <p className="text-xl text-center mt-2">Теstovací Cestovní kancelář Vysoké školy polytechnické Jihlava</p>
          </div>
        </div>
  
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Company Overview */}
          <section className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-3xl font-semibold mb-4 text-red-800">Cestování. Dovolená. Dobrodružství.</h2>
            <p className="text-lg mb-4">
              Vysoká škola polytechnická Jihlava je od 7. 3. 2008 vlastníkem koncese na provozování cestovní kanceláře.
              Kancelář při VŠPJ byla zřízena za účelem vytvoření prostředí pro získání praktických zkušeností našich studentů v oboru a organizace zájezdů studentů oboru Cestovní ruch.
            </p>
            {/* ... (keep the rest of the overview text) */}
          </section>
  
          {/* Our Team Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-red-800">Náš tým</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-row items-center gap-4">
                      <Avatar 
                        src={member.image} 
                        alt={member.name} 
                        fallback={member.name.split(' ').map(n => n[0]).join('')}
                      />
                      <div>
                        <CardTitle>{member.name}</CardTitle>
                        <p className="text-sm text-gray-600">{member.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
  
          {/* Practicants Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-red-800">Praktikanti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practicants.map((practicant, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-row items-center gap-4">
                      <Avatar 
                        src={practicant.image} 
                        alt={practicant.name} 
                        fallback={practicant.name.split(' ').map(n => n[0]).join('')}
                      />
                      <div>
                        <CardTitle>{practicant.name}</CardTitle>
                        <p className="text-sm text-gray-600">{practicant.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{practicant.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  };
  
  export default About;