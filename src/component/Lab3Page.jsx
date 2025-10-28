import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import MyContainer from './MyContainer';
import PersonProfile from './PersonProfile';
import './Lab3Page.css';

// komponent w postaci funkcji strzałkowej
const Item = ({name, id, className}) => 
  <Card style={{width: `18rem`}} className="border mb-3 p-3 ms-3" key={id}>{name}</Card>;

function Lab3Page() {
  useEffect(() => {
    document.title = 'Laboratorium 3 - WSEI App';
  }, []);

  return (
    <div className="container lab3-container mt-4">
      <h1 className="lab3-title"> Laboratorium 3 </h1>
      <p className="lab3-subtitle"> Witaj w magicznym świecie komponentów React! </p>
      
      <div className="row">
        <div className="col-12">
          <div className="card fancy-card mb-4">
            <div className="card-header fancy-card-header">
              <h3 className="mb-0"> Komponent profilu i kontener</h3>
            </div>
            <div className="card-body">
              <h4> Przykład z komponentem Item (prosty):</h4>
              <MyContainer element={Item} />
              
              <hr className="my-4"/>
              
              <h4> Komponent PersonProfile z RatingBar i useReducer:</h4>

              <MyContainer element={PersonProfile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lab3Page;