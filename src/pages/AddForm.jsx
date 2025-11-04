import { Button, Container, Form, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useData";
import useDispatch from "../hooks/useDispatch";

const AddForm = () => {
  const [errors, setErrors] = useState([]);
  const [isSending, setSending] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const items = useData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dodaj osobę - Laboratorium 4';
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    // Usuń wszystkie znaki niebędące cyframi
    const digitsOnly = value.replace(/\D/g, '');
    
    // Formatuj jako xxx-xxx-xxx
    let formatted = digitsOnly;
    if (digitsOnly.length <= 3) {
      formatted = digitsOnly;
    } else if (digitsOnly.length <= 6) {
      formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
    } else {
      formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 9)}`;
    }
    
    setPhoneValue(formatted);
  };

  const onSubmitFunction = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
    
    const data = new FormData(e.target);
    const newErrors = [];

    // Walidacja
    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    const birthDate = data.get("birthDate");
    const photo = data.get("photo");
    const url = data.get("url");

    // Usuń myślniki z numeru telefonu do walidacji
    const phoneDigits = phone.replace(/\D/g, '');

    if (!name || name.length < 2) {
      newErrors.push("Imię musi mieć co najmniej 2 znaki");
    }
    if (!email || !email.includes("@")) {
      newErrors.push("Podaj poprawny adres email");
    }
    if (!phoneDigits || phoneDigits.length < 9) {
      newErrors.push("Numer telefonu musi mieć 9 cyfr");
    }
    if (phoneDigits && phoneDigits.length > 9) {
      newErrors.push("Numer telefonu może mieć maksymalnie 9 cyfr");
    }
    if (!birthDate) {
      newErrors.push("Data urodzenia jest wymagana");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setSending(true);
    
    // Symulacja wysyłania
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generowanie nowego ID
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;

    // Wysyłanie akcji do reducera
    dispatch({
      type: "add",
      item: {
        id: newId,
        name: name,
        email: email,
        phone: phone, // Zapisz z myślnikami w formacie xxx-xxx-xxx
        birthDate: birthDate,
        photo: photo || "",
        url: url || "",
        rating: 0,
        isChecked: false
      }
    });

    setSending(false);
    
    // Reset formularza
    e.target.reset();
    setPhoneValue(""); // Reset pola telefonu
    
    // Przekierowanie do lab3
    alert(`Dodano nową osobę: ${name}`);
    navigate("/lab3");
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Dodaj nową osobę</h1>
      
      <div className="text-danger mb-3">
        {errors.map((e, i) => <p key={i}>{e}</p>)}
      </div>
      
      <Form className="text-primary" onSubmit={onSubmitFunction}>
        
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Imię i nazwisko</Form.Label>
          <FormControl
            required
            id="name"
            type="text"
            name="name"
            minLength={2}
            maxLength={100}
            placeholder="Wprowadź imię i nazwisko"
          />
          <Form.Text className="text-muted">
            Minimum 2 znaki, maksymalnie 100 znaków
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <FormControl
            required
            id="email"
            type="email"
            name="email"
            maxLength={100}
            placeholder="Wprowadź adres email"
          />
          <Form.Text className="text-muted">
            Podaj poprawny adres email
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="phone">Telefon</Form.Label>
          <FormControl
            required
            id="phone"
            type="text"
            name="phone"
            value={phoneValue}
            onChange={handlePhoneChange}
            maxLength={11}
            placeholder="123-456-789"
          />
          <Form.Text className="text-muted">
            Format: xxx-xxx-xxx (9 cyfr)
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="birthDate">Data urodzenia</Form.Label>
          <FormControl
            required
            id="birthDate"
            type="date"
            name="birthDate"
          />
          <Form.Text className="text-muted">
            Wybierz datę urodzenia
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="photo">URL zdjęcia</Form.Label>
          <FormControl
            id="photo"
            type="url"
            name="photo"
            maxLength={500}
            placeholder="https://example.com/photo.jpg"
          />
          <Form.Text className="text-muted">
            Opcjonalnie - link do zdjęcia profilowego
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="url">Strona internetowa</Form.Label>
          <FormControl
            id="url"
            type="url"
            name="url"
            maxLength={500}
            placeholder="https://example.com"
          />
          <Form.Text className="text-muted">
            Opcjonalnie - link do strony osobistej
          </Form.Text>
        </Form.Group>
        
        <div className="d-grid gap-2">
          <Button 
            disabled={isSending} 
            type="submit" 
            variant="primary" 
            size="lg"
          >
            {isSending ? "Dodawanie..." : "Dodaj osobę"}
          </Button>
          <Button 
            variant="outline-secondary" 
            size="lg"
            onClick={() => navigate("/lab3")}
          >
            Anuluj
          </Button>
        </div>
        
      </Form>
    </Container>
  );
};

export default AddForm;
