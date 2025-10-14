import { useParams } from 'react-router-dom';
import { people } from '../../module-data';
import ProfileCard from '../component/ProfileCard';

function Lab02() {
  const { id } = useParams();

  // Sprawdzenie czy parametr id został przekazany
  if (!id) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h4>Brak identyfikatora osoby</h4>
          <p>Aby wyświetlić profil, podaj identyfikator osoby w URL: <code>/lab02/1</code></p>
        </div>
      </div>
    );
  }

  // Wyszukanie osoby po id
  const person = people.find(p => p.id === parseInt(id));

  // Sprawdzenie czy osoba została znaleziona
  if (!person) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Nie znaleziono osoby o tym identyfikatorze</h4>
          <p>Osoba o ID <strong>{id}</strong> nie istnieje w bazie danych.</p>
          <small className="text-muted">
            Dostępne ID: {people.map(p => p.id).join(', ')}
          </small>
        </div>
      </div>
    );
  }

  // Wyświetlenie profilu znalezionej osoby
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Profil osoby - ID: {id}</h2>
          <ProfileCard 
            name={person.name}
            email={person.email}
            birthDate={person.birthDate}
            phone={person.phone}
          />
        </div>
      </div>
    </div>
  );
}

export default Lab02;
