import { Card } from 'react-bootstrap';
import MyContainer from './MyContainer';
import PersonProfile from './PersonProfile';

// tablica z danymi
const people = [
  {
    name: "Ala",
    id: 1,
    email: "ala@example.com",
    phone: "123-456-789",
    rating: 0,
    isChecked: false
  },
  {
    name: "Ela",
    id: 2,
    email: "ela@example.com",
    phone: "234-567-890",
    rating: 3,
    isChecked: false
  },
  {
    name: "Karol",
    id: 3,
    email: "karol@example.com",
    phone: "345-678-901",
    rating: 7,
    isChecked: true
  },
  {
    name: "Ola",
    id: 4,
    email: "ola@example.com",
    phone: "456-789-012",
    rating: 5,
    isChecked: false
  },
  {
    name: "Monika",
    id: 5,
    email: "monika@example.com",
    phone: "567-890-123",
    rating: 10,
    isChecked: false
  },
  {
    name: "Robert",
    id: 6,
    email: "robert@example.com",
    phone: "678-901-234",
    rating: 2,
    isChecked: true
  }
];

// komponent w postaci funkcji strzałkowej
const Item = ({name, id, className}) => 
  <Card style={{width: `18rem`}} className="border mb-3 p-3 ms-3" key={id}>{name}</Card>;

function Lab3Page() {
  return (
    <div className="container mt-4">
      <h1>Laboratorium 3</h1>
      <p>Witaj na stronie Laboratorium 3!</p>
      
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header">
              <h3>Komponent profilu i kontener</h3>
            </div>
            <div className="card-body">
              <h4>Przykład z komponentem Item (prosty):</h4>
              <MyContainer element={Item} data={people}/>
              
              <hr className="my-4"/>
              
              <h4>Komponent PersonProfile z przyciskami i stanem</h4>
 
              <MyContainer element={PersonProfile} data={people}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lab3Page;