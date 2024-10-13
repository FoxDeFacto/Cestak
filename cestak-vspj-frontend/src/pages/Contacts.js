import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import config from '../config.json';

const Contacts = () => {
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

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid md:grid-cols-2 gap-12">

      <div>
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Kontaktní informace</h2>
                <div className="space-y-6">
                <div className="flex items-center border-b pb-4">
                    <FaMapMarkerAlt className="mr-3 text-red-500" />
                    <div>
                    <span className="text-gray-700 font-semibold">Adresa:</span>
                    <p className="text-gray-700">Hlavní 123, 123 00 Praha 1</p>
                    </div>
                </div>
                
                <div className="flex items-center border-b pb-4">
                    <FaPhoneAlt className="mr-3 text-red-500" />
                    <div className="flex space-x-8">
                        <div className="flex flex-col">
                        <span className="text-gray-700 font-semibold">Tel:</span>
                        <p className="text-gray-700">+420 123 456 789</p>
                        </div>
                        <div className="flex flex-col">
                        <span className="text-gray-700 font-semibold">Whatsapp:</span>
                        <p className="text-gray-700">123 456 789</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center border-b pb-4">
                    <FaEnvelope className="mr-3 text-red-500" />
                    <div>
                    <span className="text-gray-700 font-semibold">Email:</span>
                    <p className="text-gray-700">skolni@nasewebstranka.cz</p>
                    </div>
                </div>
                
                <div className="flex items-center border-b pb-4">
                    <FaEnvelope className="mr-3 text-red-500" />
                    <div>
                    <span className="text-gray-700 font-semibold">Email:</span>
                    <p className="text-gray-700">odpovednaosoba@nasewebstranka.cz</p>
                    </div>
                </div>
                
                <div className="flex items-center border-b pb-4">
                    <FaEnvelope className="mr-3 text-red-500" />
                    <div>
                    <span className="text-gray-700 font-semibold">Email:</span>
                    <p className="text-gray-700">supervizor@nasewebstranka.cz</p>
                    </div>
                </div>
                
                <div className="flex items-start border-b pb-4">
                    <FaClock className="mr-3 text-red-500 mt-1" />
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-800">Otevírací hodiny:</p>
                        <div className="flex mt-2">
                            {/* Days Column */}
                            <div className="flex flex-col mr-8">
                                {[
                                    'Pondělí',
                                    'Úterý',
                                    'Středa',
                                    'Čtvrtek',
                                    'Pátek',
                                    'So-Ne',
                                ].map(day => (
                                    <span key={day} className="text-gray-700 font-semibold">
                                        {day}
                                    </span>
                                ))}
                            </div>
                            {/* Times Column */}
                            <div className="flex flex-col">
                                {[
                                    'Dle domluvy',
                                    '10:00 - 14:00',
                                    'Dle domluvy',
                                    '10:00 - 14:00',
                                    'Dle domluvy',
                                    'Zavřeno',
                                ].map((time, index) => (
                                    <span key={index} className="text-gray-700">
                                        {time}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>

        <div className='pb-6'>
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
      </div>
    </div>
  );
}

export default Contacts;