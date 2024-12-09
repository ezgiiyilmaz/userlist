import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

   
    const fetchUser = axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const fetchPosts = axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    const fetchTodos = axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
    const fetchComments = axios.get('https://jsonplaceholder.typicode.com/comments');

    Promise.all([fetchUser, fetchPosts, fetchTodos, fetchComments])
      .then(([userResponse, postsResponse, todosResponse, commentsResponse]) => {
        setUser(userResponse.data);
        setPosts(postsResponse.data);
        setTodos(todosResponse.data);
        setComments(commentsResponse.data);
      })
      .catch((error) => {
        console.error('API çağrısı sırasında hata:', error);
        setError('Veriler alınırken bir hata oluştu.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>

      <h3>Posts</h3>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>

              <h5>Comments:</h5>
              <ul>
                {comments
                  .filter((comment) => comment.postId === post.id)
                  .map((comment) => (
                    <li key={comment.id}>
                      <p><strong>{comment.name}</strong>: {comment.body}</p>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}

      <h3>Todos</h3>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
};

export default UserDetails;
