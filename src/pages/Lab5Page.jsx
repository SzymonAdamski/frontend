import { useEffect, useReducer, useMemo, useState } from 'react';
import { Container, Table, Badge, Spinner, Accordion, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import TableHeader from '../component/TableHeader';
import TableDataReducer from '../data/TableDataReducer';
import './Lab5Page.css';

function Lab5Page() {
  useEffect(() => {
    document.title = 'Laboratorium 5 - WSEI App';
  }, []);

  const [posts] = useFetch("https://jsonplaceholder.typicode.com/posts");
  const [users] = useFetch("https://jsonplaceholder.typicode.com/users");
  const [comments] = useFetch("https://jsonplaceholder.typicode.com/comments");
  
  const originalTableData = useMemo(() => {
    return posts.map((p) => {
      return {
        user: users.find((u) => u.id === p.userId),
        post: p,
        comments: comments.filter((c) => c.postId === p.id),
      };
    });
  }, [posts, users, comments]);

  const [tableData, dispatch] = useReducer(TableDataReducer, originalTableData);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (originalTableData.length > 0) {
      dispatch({ type: 'resetOrder', originalData: originalTableData });
    }
  }, [originalTableData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tableData.length]);

  const handleUserSort = (order) => {
    if (order === 'asc') {
      dispatch({ type: 'sortUserAsc' });
    } else if (order === 'desc') {
      dispatch({ type: 'sortUserDesc' });
    } else {
      dispatch({ type: 'resetOrder', originalData: originalTableData });
    }
  };

  const handlePostSort = (order) => {
    if (order === 'asc') {
      dispatch({ type: 'sortPostAsc' });
    } else if (order === 'desc') {
      dispatch({ type: 'sortPostDesc' });
    } else {
      dispatch({ type: 'resetOrder', originalData: originalTableData });
    }
  };

  const handleCommentsSort = (order) => {
    if (order === 'asc') {
      dispatch({ type: 'sortCommentsAsc' });
    } else if (order === 'desc') {
      dispatch({ type: 'sortCommentsDesc' });
    } else {
      dispatch({ type: 'resetOrder', originalData: originalTableData });
    }
  };

  const isLoading = posts.length === 0 || users.length === 0 || comments.length === 0;

  return (
    <div className="lab5-container">
      <Container className="py-4">
        <div className="lab5-header">
          <h1 className="lab5-title mb-3">Laboratorium 5 - Pobieranie danych</h1>
          <p className="lead text-muted mb-0">
            Przykład użycia własnego hooka <code className="text-primary">useFetch</code> do pobierania danych z API
          </p>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <Spinner animation="border" role="status" variant="primary" className="loading-spinner">
              <span className="visually-hidden">Ładowanie...</span>
            </Spinner>
            <p className="mt-3 text-muted">Pobieranie danych z JSONPlaceholder...</p>
          </div>
        ) : (
          <>
            <div className="lab5-stats">
              <h5 className="mb-3">📊 Statystyki:</h5>
              <ul>
                <li>📝 Liczba postów: <strong>{posts.length}</strong></li>
                <li>👥 Liczba użytkowników: <strong>{users.length}</strong></li>
                <li>💬 Liczba komentarzy: <strong>{comments.length}</strong></li>
              </ul>
            </div>

            <div className="lab5-table-container">
              <Table hover responsive className="lab5-table">
                <thead>
                  <tr>
                    <TableHeader title="User" onSort={handleUserSort} />
                    <TableHeader title="Post title" onSort={handlePostSort} />
                    <TableHeader title="Comments count" onSort={handleCommentsSort} />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row) => (
                    <tr key={row.post.id}>
                      <td>
                        <Link 
                          to={`/lab5/users/${row.user?.id}`}
                          className="user-link"
                        >
                          👤 {row.user?.name || 'Nieznany'}
                        </Link>
                      </td>
                      <td>
                        <Accordion flush>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              {row.post.title}
                            </Accordion.Header>
                            <Accordion.Body>
                              {row.post.body}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </td>
                      <td className="text-center">
                        <Link to={`/lab5/posts/${row.post.id}/comments`} className="comments-badge">
                          💬 {row.comments.length}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="pagination-container">
                <Pagination className="justify-content-center">
                  <Pagination.First 
                    onClick={() => setCurrentPage(1)} 
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                  />
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                    ) {
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                          activeLabel=""
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    }
                    return null;
                  })}
                  
                  <Pagination.Next 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last 
                    onClick={() => setCurrentPage(totalPages)} 
                    disabled={currentPage === totalPages}
                  />
                </Pagination>

                <div className="table-footer">
                  <small className="text-muted">
                    📄 Strona <strong>{currentPage}</strong> z <strong>{totalPages}</strong>
                    {' · '}
                    ✨ Wyświetlono <strong>{currentItems.length}</strong> z <strong>{tableData.length}</strong> postów
                  </small>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Lab5Page;
