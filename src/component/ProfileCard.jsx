import ProfileParagraph from './ProfileParagraph';

function ProfileCard({ name, email, phone, birthDate }) {
  return (
      <div className="Container">
        <h2 style={{ marginTop: 0, color: "#333" }}>Profil użytkownika</h2>

        <ProfileParagraph label="Imię" title={name}/>
        <ProfileParagraph label="Email" title={email}/>
        <ProfileParagraph label="Telefon" title={phone}/>
        <ProfileParagraph label="Data urodzin" title={birthDate}/>
      </div>
  );
}

export default ProfileCard;