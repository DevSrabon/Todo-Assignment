import { useEffect, useState } from "react";
import "../styles/addTodoForm.css";

const AddTodoForm = () => {
  const [todos, setTodos] = useState([]);
  
  const [refetch, setRefetch] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  // api url
  
  const api_url = import.meta.env.VITE_APP_API;
  useEffect(() => {
    const abortController = new AbortController();
  
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${api_url}/todo/get`, {
          signal: abortController.signal,
        });
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        if(error.name!=="AbortError"){
          
                  setErrorMessages([
                    "An unexpected error occurred. Please try again later.",
                  ]);

        }
        console.log(error.name);
      }
    };
  
    fetchTodos();
  
    return () => abortController.abort();
  }, [api_url, refetch]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const todo = form.todo.value;

    try {
      const response = await fetch(`${api_url}/todo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title, todo}),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessages(
          data.messages || ["Server Error. Please try again later."]
        );
      } else {
        setErrorMessages([]);
   setRefetch(prev=>!prev);
        form.reset()
      }
    } catch (error) {
      setErrorMessages([
        "An unexpected error occurred. Please try again later.",
      ]);
    }
 
  };

  const handleDelete = async (todoId) => {
    try {
      const response = await fetch(
        `${api_url}/todo/delete/${todoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        setErrorMessages(["Server Error. Please try again later."]);
      } else {
        setRefetch(prev=>!prev); 
      }
    } catch (error) {
      setErrorMessages([
        "An unexpected error occurred. Please try again later.",
      ]);
    }
  };

  const handleComplete = async (todoId) => {
    try {
      const response = await fetch(`${api_url}/todo/update/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (!response.ok) {
        setErrorMessages(["Server Error. Please try again later."]);
      } else {
        setRefetch(prev=>!prev);
      }
    } catch (error) {
      setErrorMessages([
        "An unexpected error occurred. Please try again later.",
      ]);
    }
  };

  return (
    <section className="container">
      <h1>My Task</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" id="" placeholder="Title" />
        <textarea
          autoCapitalize="true"
          type="text"
          name="todo"
          id="todo"
          placeholder="Todo"
        />

        <button type="submit">Add New Task</button>
      </form>
      {errorMessages.length > 0 && (
        <div>
          <h3>Error:</h3>
          <ul>
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="todos">
        <h2>Task:</h2>
        <ul>
          {todos?.slice(0).reverse().map((todo,i) => (
            <li key={todo._id} >
              <p className={`title ${todo?.status=== 'completed' &&'completed'}`}>
             {i+1}. {todo.title} - {todo.todo}{" "}

              </p>
              <div>
              {todo?.status!== 'completed' &&         
              <button onClick={() => handleComplete(todo._id)}>Complete</button>
              }
              <button onClick={() => handleDelete(todo._id)}>Delete</button>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AddTodoForm;
