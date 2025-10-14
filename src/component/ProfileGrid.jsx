import ProfileCard from './ProfileCard';
import './ProfileGrid.css';

function ProfileGrid({ people, columns = 3 }) {
  // Tworzymy klasę Bootstrap dla kolumn na podstawie parametru columns
  const getColumnClass = () => {
    switch(columns) {
      case 1: return 'col-12';
      case 2: return 'col-lg-6 col-md-6 col-sm-12';
      case 3: return 'col-lg-4 col-md-6 col-sm-12';
      case 4: return 'col-lg-3 col-md-6 col-sm-12';
      case 6: return 'col-lg-2 col-md-4 col-sm-12';
      default: return 'col-lg-4 col-md-6 col-sm-12';
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4 justify-content-center">
        {people.map(person => (
          <div key={person.id} className={getColumnClass()}>
            <ProfileCard 
              id={person.id}
              name={person.name} 
              email={person.email} 
              birthDate={person.birthDate} 
              phone={person.phone}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileGrid;
