import React, { useState, useEffect } from 'react';
import './App.css';
import assets from './assets';
import Input from './components/Input';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './components/TodoList';
import Modal from './components/Modal';

let counter = 1;

const todos = [
  {
    id: uuidv4(),
    sortId: counter++,
    task: 'Complete online JavaScript course',
    completed: true,
  },
  {
    id: uuidv4(),
    sortId: counter++,
    task: '10 minutes meditation',
    completed: false,
  },
  {
    id: uuidv4(),
    sortId: counter++,
    task: 'Read for 1 hour',
    completed: false,
  },
  {
    id: uuidv4(),
    sortId: counter++,
    task: 'Pick up groceries',
    completed: false,
  },
  {
    id: uuidv4(),
    sortId: counter++,
    task: 'Complete Todo App on Frontend Mentor',
    completed: true,
  },
];

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);
  const [todoIdToDelete, setTodoIdToDelete] = useState(null);

  const mainBackground = darkMode ? 'bg-dark' : 'bg-light';
  const secondaryBackground = darkMode
    ? 'bg-dark-secondary'
    : 'bg-light-secondary';

  const modalBg = darkMode ? 'dark-modal' : 'light-modal';

  const toggleMode = () => setDarkMode((prev) => !prev);

  const handleTaskComplete = (id) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    });
  };

  useEffect(() => {
    setItems(todos);
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
    setError(null);
  };

  const addNewTodo = () => {
    if (newTodo.trim() === '') {
      setError('Please submit a non-empty todo!');
    } else {
      const newItem = {
        id: uuidv4(),
        sortId: counter++,
        task: newTodo,
        completed: false,
      };

      setItems((prev) => [...prev, newItem]);
    }
  };

  const handleDeleteTodo = (id) => {
    setTodoIdToDelete(id);
    setModal(true);
  };

  const deleteTodo = () => {
    setItems((prev) => prev.filter((item) => item.id !== todoIdToDelete));
    setModal(false);
    setTodoIdToDelete(null);
  };

  const closeModal = () => {
    setModal(false);
  };

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.completed));
  };

  const filterTodos = (condition) => {
    switch (condition.toLowerCase()) {
      case 'all':
        return items;
      case 'completed':
        return items.filter((item) => item.completed);
      case 'active':
        return items.filter((item) => !item.completed);
      default:
        return;
    }
  };

  const allowDrop = (e) => e.preventDefault();

  const drag = (e) => {
    e.dataTransfer.setData('id', e.target.id);
  };

  const drop = (e) => {
    e.preventDefault();
    var sourceId = +e.dataTransfer.getData('id');
    var targetId = +e.target.id;

    if (sourceId && targetId) {
      setItems((prev) => {
        const newState = prev.map((item) => {
          if (item.sortId === sourceId) {
            return { ...item, sortId: targetId };
          } else if (item.sortId === targetId) {
            return { ...item, sortId: sourceId };
          }
          return item;
        });
        return newState;
      });
    }
  };

  const filteredItems = filterTodos(filter);

  const sortedItems = filteredItems.sort((a, b) => {
    if (a.sortId < b.sortId) {
      return -1;
    } else if (a.sortId > b.sortId) {
      return 1;
    } else {
      return 0;
    }
  });

  const bgImage = darkMode ? 'bg-img-dark' : 'bg-img-light';

  return (
    <div className={`wrapper ${mainBackground} ${bgImage}`}>
      {modal && (
        <Modal
          onClick={closeModal}
          onCancel={closeModal}
          onConfirm={deleteTodo}
          bg={modalBg}
        />
      )}
      <div className="inner-wrapper">
        <div className="header">
          <h1>TODO</h1>
          <img
            src={darkMode ? assets.sun : assets.moon}
            onClick={toggleMode}
            alt="moon"
          />
        </div>
        <Input
          bg={secondaryBackground}
          darkMode={darkMode}
          error={error}
          onInputChange={handleInputChange}
          value={newTodo}
          onNewTodoAdd={addNewTodo}
          placeholder={'Create a new Todo'}
        />
        <TodoList
          filter={(filter) => setFilter(filter)}
          clearCompleted={clearCompleted}
          bg={secondaryBackground}
          onTaskComplete={handleTaskComplete}
          onDelete={handleDeleteTodo}
          items={sortedItems}
          darkMode={darkMode}
          onItemDragStart={drag}
          onItemDragOver={allowDrop}
          onItemDrop={drop}
        />
      </div>
    </div>
  );
};

export default App;
