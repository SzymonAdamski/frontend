import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, ListGroup, Button, Spinner } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import './PostComments.css';

function PostComments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts] = useFetch("https://jsonplaceholder.typicode.com/posts");
  const [comments] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  
  const post = posts.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Komentarze`;
    } else {
      document.title = 'Komentarze do postu';
    }
  }, [post]);

  if (posts.length === 0 || comments.length === 0) {
    return (
      <div className="post-comments-container">
        <Container className="loading-comments">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Ładowanie komentarzy...</p>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-comments-container">
        <Container className="py-5">
          <div className="alert alert-danger">
            <h4>❌ Nie znaleziono postu</h4>
            <p>Post o ID {id} nie istnieje.</p>
            <Button variant="primary" onClick={() => navigate('/lab5')} className="back-button">
              ← Powrót do listy
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="post-comments-container">
      <Container className="py-4">
        <h1 className="mb-4" style={{ color: '#667eea', fontWeight: '800' }}>
          💬 Komentarze do postu
        </h1>
        
        <Card className="post-header-card">
          <div className="post-header-title">
            <h3 className="mb-0">{post.title}</h3>
            <span className="post-header-badge">
              💬 {comments.length} komentarzy
            </span>
          </div>
          <Card.Body className="post-body-content">
            <p className="mb-0">{post.body}</p>
          </Card.Body>
        </Card>

        <h4 className="comments-section-title">
          📝 Lista komentarzy:
        </h4>
        
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id} className="comment-item">
              <div className="comment-header">
                <h5 className="comment-name">{comment.name}</h5>
                <span className="comment-email">✉️ {comment.email}</span>
              </div>
              <p className="comment-body mb-0">{comment.body}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <Button className="comments-back-button" onClick={() => navigate('/lab5')}>
          ← Powrót do listy postów
        </Button>
      </Container>
    </div>
  );
}

export default PostComments;
