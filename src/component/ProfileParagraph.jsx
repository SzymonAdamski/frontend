function ProfileParagraph({ label, title }) {
  return (
    <div className="mb-3">
      <strong className="text-muted small">{label}:</strong>
      <p className="mb-0 mt-1 font-weight-normal">{title}</p>
    </div>
  );
}

export default ProfileParagraph;