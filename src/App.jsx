import { useEffect, useState, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleEdit = (index) => {
    if (!todos[index].checked) {
      setEditTodoIndex(index);
      setEditTodo(todos[index].text);
    }
  };

  const EditTodo = (index) => {
    index.preventDefault();
    if (editTodo.length > 0) {
      const newTodos = [...todos];

      newTodos[editTodoIndex] = { ...newTodos[editTodoIndex], text: editTodo };
      setTodos(newTodos);
      setEditTodoIndex(null);
      setEditTodo("");
    }
  };
  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const handleInput = (e) => {
    e.preventDefault();

    setTodo(e.target.value);
  };
  const handleAddTodo = (e) => {
    e.preventDefault();

    if (todo.length > 0) {
      setTodos([...todos, { text: todo, checked: false }]);
    }
    setTodo("");
  };
  const handleCheck = (index, e) => {
    const isChecked = e.target.checked;
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], checked: isChecked };
    setTodos(newTodos);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <div className="p-4 w-75  rounded bg-white border shadow">
          <h1>Today's ToDo's</h1>

          <form onSubmit={handleAddTodo} className="d-flex justify-content-end">
            <input
              className="form-control "
              type="text"
              placeholder="your todo"
              value={todo}
              onChange={handleInput}
              ref={inputRef}
            />
          </form>
          <button
            type="button"
            onClick={handleAddTodo}
            className="btn btn-primary"
          >
            Add ToDo
          </button>
          <ListGroup className="mt-4">
            {todos.map((todoItem, index) => (
              <ListGroup.Item key={index}>
                {editTodoIndex === index ? (
                  <>
                    <form
                      onSubmit={EditTodo}
                      className="d-flex justify-content-end"
                    >
                      <input
                        className="form-control "
                        type="text"
                        placeholder="your todo"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                      />
                    </form>
                    <button
                      type="button"
                      onClick={EditTodo}
                      className="btn btn-primary float-end  "
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={todoItem.checked}
                          onChange={(e) => handleCheck(index, e)}
                        />
                        <span
                          style={{
                            textDecoration: todoItem.checked
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {todoItem.text}
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger me-2"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                        {!todoItem.checked && (
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </>
  );
}

export default App;
const completed = {
  textDecoration: "line-through",
};
