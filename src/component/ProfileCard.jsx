import ProfileParagraph from './ProfileParagraph';
import { Link } from 'react-router-dom';

function ProfileCard({ id, name, email, phone, birthDate }) {
  return (
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary mb-4 text-center">Profil użytkownika</h5>
          
          <ProfileParagraph label="Imię" title={name}/>
          <ProfileParagraph label="Email" title={email}/>
          <ProfileParagraph label="Telefon" title={phone}/>
          <ProfileParagraph label="Data urodzin" title={birthDate}/>
          
          {id && (
            <div className="text-center mt-3">
              <Link to={`/lab02/${id}`} className="btn btn-primary btn-sm">
                Zobacz szczegóły
              </Link>
            </div>
          )}
        </div>
      </div>
  );
}

export default ProfileCard;