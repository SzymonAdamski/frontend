import { people } from '../../module-data';

// Dodajemy dodatkowe właściwości do danych
const data = people.map(person => {
  // Formatuj numer telefonu do xxx-xxx-xxx
  let formattedPhone = person.phone || '';
  if (formattedPhone && !formattedPhone.includes('-')) {
    const phoneDigits = formattedPhone.replace(/\D/g, '');
    if (phoneDigits.length === 9) {
      formattedPhone = `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 9)}`;
    }
  }
  
  return {
    ...person,
    phone: formattedPhone,
    rating: 0,
    isChecked: false,
    photo: person.photo || "",
    url: person.url || ""
  };
});

export default data;
