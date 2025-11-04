import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useData from "../hooks/useData";
import useDispatch from "../hooks/useDispatch";
import "../App.css";

const EditForm = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const items = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    photo: "",
    url: ""
  });

  const [errors, setErrors] = useState({});
  const [isSending, setSending] = useState(false);

  useEffect(() => {
    document.title = 'Edytuj osobę - Laboratorium 4';
    
    if (id) {
      const person = items.find(p => p.id === parseInt(id));
      if (person) {
        // Formatuj numer telefonu przy ładowaniu (jeśli nie jest już sformatowany)
        let formattedPhone = person.phone || '';
        if (formattedPhone && !formattedPhone.includes('-')) {
          const phoneDigits = formattedPhone.replace(/\D/g, '');
          if (phoneDigits.length > 6) {
            formattedPhone = `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 9)}`;
          } else if (phoneDigits.length > 3) {
            formattedPhone = `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3)}`;
          }
        }
        
        setFormData({
          name: person.name || "",
          email: person.email || "",
          phone: formattedPhone,
          birthDate: person.birthDate || "",
          photo: person.photo || "",
          url: person.url || ""
        });
      }
    }
  }, [id, items]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Imię musi mieć co najmniej 2 znaki";
    }
    if (formData.name && formData.name.length > 100) {
      newErrors.name = "Imię może mieć maksymalnie 100 znaków";
    }

    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Podaj poprawny adres email";
    }
    if (formData.email && formData.email.length > 100) {
      newErrors.email = "Email może mieć maksymalnie 100 znaków";
    }

    // Walidacja numeru telefonu - usuń myślniki do sprawdzenia
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 9) {
      newErrors.phone = "Numer telefonu musi mieć co najmniej 9 cyfr";
    }
    if (phoneDigits && phoneDigits.length > 9) {
      newErrors.phone = "Numer telefonu może mieć maksymalnie 9 cyfr";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Data urodzenia jest wymagana";
    }

    if (formData.photo && formData.photo.length > 500) {
      newErrors.photo = "URL zdjęcia może mieć maksymalnie 500 znaków";
    }

    if (formData.url && formData.url.length > 500) {
      newErrors.url = "URL strony może mieć maksymalnie 500 znaków";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let finalValue = value;
    
    // Formatowanie numeru telefonu
    if (name === 'phone') {
      // Usuń wszystkie znaki niebędące cyframi
      const digitsOnly = value.replace(/\D/g, '');
      
      // Formatuj jako xxx-xxx-xxx
      if (digitsOnly.length <= 3) {
        finalValue = digitsOnly;
      } else if (digitsOnly.length <= 6) {
        finalValue = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
      } else {
        finalValue = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 9)}`;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    
    // Usuń błąd dla tego pola przy zmianie
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSending(true);
    
    // Symulacja wysyłania
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Wysyłanie akcji do reducera
    dispatch({
      type: "edit",
      id: parseInt(id),
      item: {
        ...formData
        // Zapisz numer z myślnikami (formData.phone już jest sformatowany)
      }
    });

    setSending(false);
    alert(`Zaktualizowano dane osoby: ${formData.name}`);
    navigate("/lab3");
  };

  if (!id || !items.find(p => p.id === parseInt(id))) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          <h4>Nie znaleziono osoby</h4>
          <p>Osoba o ID {id} nie istnieje.</p>
          <button className="btn btn-primary" onClick={() => navigate("/lab3")}>
            Powrót do listy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Edytuj dane osoby</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={id} />

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Imię i nazwisko *</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength={2}
            maxLength={100}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          <div className="form-text">Minimum 2 znaki, maksymalnie 100 znaków</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          <div className="form-text">Podaj poprawny adres email</div>
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Telefon *</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={11}
            placeholder="123-456-789"
            required
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          <div className="form-text">Format: xxx-xxx-xxx (9 cyfr)</div>
        </div>

        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">Data urodzenia *</label>
          <input
            type="date"
            className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
          <div className="form-text">Wybierz datę urodzenia</div>
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">URL zdjęcia</label>
          <input
            type="url"
            className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            maxLength={500}
            placeholder="https://example.com/photo.jpg"
          />
          {errors.photo && <div className="invalid-feedback">{errors.photo}</div>}
          <div className="form-text">Opcjonalnie - link do zdjęcia profilowego</div>
        </div>

        <div className="mb-3">
          <label htmlFor="url" className="form-label">Strona internetowa</label>
          <input
            type="url"
            className={`form-control ${errors.url ? 'is-invalid' : ''}`}
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            maxLength={500}
            placeholder="https://example.com"
          />
          {errors.url && <div className="invalid-feedback">{errors.url}</div>}
          <div className="form-text">Opcjonalnie - link do strony osobistej</div>
        </div>

        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={isSending}
          >
            {isSending ? "Zapisywanie..." : "Zapisz zmiany"}
          </button>
          <button 
            type="button"
            className="btn btn-outline-secondary btn-lg"
            onClick={() => navigate("/lab3")}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
