import React, { useState, useEffect } from 'react';
import { FaPlane, FaHome, FaShieldAlt, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import config from '../config.json';

// ServiceCard Component
function ServiceCard({ title, icon, description }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl text-red-500">{icon}</span>
            {title}
          </h2>
        </div>
        <div>
          <p>{description}</p>
        </div>
      </div>
    );
  }

const Services = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const [formData, setFormData] = useState({
        CeleJmeno: '',
        Email: '',
        Telefon: '',
        Predmet: '',
        Zprava: ''
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [submitMessage, setSubmitMessage] = useState('');
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [id]: value
        }));
      };
    
      const validateForm = () => {
        let newErrors = {};
        if (!formData.CeleJmeno) newErrors.CeleJmeno = 'Jméno je povinné';
    
        if (!formData.Email) newErrors.Email = 'Email je povinný';
        else if (!/\S+@\S+\.\S+/.test(formData.Email)) newErrors.Email = 'Neplatný email';
    
        const cleanedTelefon = formData.Telefon.replace(/\s+/g, '').replace(/^(\+)/, '');
        if (!formData.Telefon) {
        newErrors.Telefon = 'Telefon je povinný';
      } else if (!/^\d+$/.test(cleanedTelefon)) {
        newErrors.Telefon = 'Špatný formát telefonního čísla';
      }
        if (!formData.Predmet) newErrors.Predmet = 'Předmět je povinný';
        if (!formData.Zprava) newErrors.Zprava = 'Zpráva je povinná';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          setIsSubmitting(true);
          setSubmitMessage('');
    
          const cleanedTelefon = formData.Telefon.replace(/\s+/g, '').replace(/^(\+)/, '');
    
          try {
            const response = await fetch(`${config.API}/api/zprava-od-uzivateles`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                data: {
                  ...formData,
                  Telefon: cleanedTelefon  // Send the cleaned phone number
                }
              }),
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Success:', result);
            setSubmitMessage('Zpráva byla úspěšně odeslána!');
            setFormData({
              CeleJmeno: '',
              Email: '',
              Telefon: '',
              Predmet: '',
              Zprava: ''
            });
          } catch (error) {
            console.error('Error:', error);
            setSubmitMessage('Došlo k chybě při odesílání zprávy. Zkuste to prosím znovu.');
          } finally {
            setIsSubmitting(false);
          }
        }
      };

      if (loading) return <div>{console.log('Loading...')}</div>; 
      if (error) return <div>Error: {error.message}</div>;
    
    
  return (
    <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2">
        <div className="relative w-full h-96 overflow-hidden">
            <img
            src={images && images.length > 4 && images[4].url ? `${config.API}${images[4].url}` : config.defaultImage}
            alt="Mountain landscape" // Corrected the attribute
            className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-600 bg-opacity-70 p-4 rounded-lg text-center">
                <h1 className="text-3xl font-bold">Služby</h1>
            </div>
            </div>
        </div>
        </div>

      <main className="flex-grow container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-items-center">
            <ServiceCard
                title="Letenky"
                icon={<FaPlane />} // Using FaPlane icon
                description="Přes naši cestovní kancelář můžete objednat letenky. Letenky zajistíme přes naši e-mail adresu."
            />
            <ServiceCard
                title="Ubytování"
                icon={<FaHome />} // Using FaHome icon
                description="Přes naši cestovní kancelář si lze bez zájezdu ubytování jak v ČR, tak v zahraničí. Pro poptávku ubytování využijte e-mail adresu."
            />
            <ServiceCard
                title="Cestovní pojištění"
                icon={<FaShieldAlt />} // Using FaShieldAlt icon
                description="Pomocí naší kanceláře je možno sjednat také cestovní pojištění."
            />
            <ServiceCard
                title="Průvodcovská činnost"
                icon={<FaUsers />} // Using FaUsers icon
                description="Naši průvodci z řad profesionálů i studentů disponují průkazy průvodců 1. až 3. stupně. Nabízíme průvodcování českých i zahraničních skupin. Nabízíme doprovod hostů konferencí a seminářů v anglickém jazyce. Možnost spolupráce s ostatními cestovními kancelářemi."
            />
            <ServiceCard
                title="Zájezdy na míru"
                icon={<FaMapMarkerAlt />} // Using FaMapMarkerAlt icon
                description="Spolupracujeme s mnoha partnery z různých zemí. Přáli byste si něco jiného, než máme v nabídce? Napište nám na info@example.com a vypracujeme vám nabídku na míru."
            />
    </div>


        <div className='pb-6 w-1/2 mx-auto'>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
           <h2 className="text-2xl font-semibold mb-6 text-gray-800">Kontaktní formulář</h2>
            <div className="space-y-2">
              <label htmlFor="CeleJmeno" className="block mb-1 text-gray-700">Celé jméno</label>
              <input
                id="CeleJmeno"
                value={formData.CeleJmeno}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Vaše celé jméno"
                required
              />
              {errors.CeleJmeno && <p className="text-red-500 text-sm">{errors.CeleJmeno}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="Email" className="block mb-1 text-gray-700">Email</label>
              <input
                id="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="vas@email.cz"
                required
              />
              {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="Telefon" className="block mb-1 text-gray-700">Telefon</label>
              <input
                id="Telefon"
                type="tel"
                value={formData.Telefon}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="+420 123 456 789"
                required
              />
              {errors.Telefon && <p className="text-red-500 text-sm">{errors.Telefon}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="Predmet" className="block mb-1 text-gray-700">Předmět</label>
              <input
                id="Predmet"
                value={formData.Predmet}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Předmět zprávy"
                required
              />
              {errors.Predmet && <p className="text-red-500 text-sm">{errors.Predmet}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="Zprava" className="block mb-1 text-gray-700">Vaše zpráva</label>
              <textarea
                id="Zprava"
                value={formData.Zprava}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Napište nám svůj dotaz"
                rows={4}
                required
              />
              {errors.Zprava && <p className="text-red-500 text-sm">{errors.Zprava}</p>}
            </div>
            <button 
              type="submit" 
              className="bg-red-600 text-white px-6 py-3 rounded-md w-full hover:bg-red-700 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Odesílání...' : 'Odeslat'}
            </button>
            {submitMessage && (
              <p className={`text-center mt-4 ${submitMessage.includes('chybě') ? 'text-red-500' : 'text-green-500'}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>

    
      </main>
    </div>
  );
}

export default Services;
