import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
// components
import TaskList from "../components/TaskList/TaskList";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
// utils
import {
  addTask,
  completeTask,
  fetchTasks,
  filterTasks,
  saveEditedTask,
} from "../utils/helpers";
// styles
import "react-calendar/dist/Calendar.css";
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      setFilteredTasks(
        tasks.filter((task) => task.date === date.toLocaleDateString())
      );
    }
  }, [tasks, date]);

  useEffect(() => {
    fetchTasksHandler();
  }, [date]);

  const fetchTasksHandler = () => {
    setLoading(true);

    fetchTasks()
      .then((tasks) => {
        setTasks(tasks);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedTask(null);
  };

  const saveEditedTaskHandler = (newText) => {
    setTasks(
      saveEditedTask(tasks, selectedTask, newText).then(() =>
        fetchTasksHandler()
      )
    );
    closeEditModal();
  };

  const addTaskHandler = () => {
    if (newTask.trim() !== "") {
      setTasks(addTask(tasks, newTask, date).then(() => fetchTasksHandler()));
      setNewTask("");
    }
  };

  const deleteTaskHandler = (taskId) => {
    setTasks(filterTasks(tasks, taskId).then(() => fetchTasksHandler()));
  };

  const completeTaskHandler = (taskId) => {
    setTasks(completeTask(tasks, taskId).then(() => fetchTasksHandler()));
  };

  return (
    <div className="App">
      <h1>To-Do List for {date.toLocaleDateString()}</h1>

      <div className="App__task-new">
        <Input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          type="success"
          onClick={addTaskHandler}
          isDisabled={!newTask.length}
        >
          Add Task
        </Button>
      </div>

      <div className="App__calendar">
        <Calendar onChange={setDate} value={date} />
      </div>

      <TaskList
        loading={loading}
        tasks={filteredTasks}
        date={date}
        openEditModal={openEditModal}
        deleteTaskHandler={deleteTaskHandler}
        completeTaskHandler={completeTaskHandler}
        closeEditModal={closeEditModal}
        saveEditedTaskHandler={saveEditedTaskHandler}
        selectedTask={selectedTask}
        editModalOpen={editModalOpen}
      />
    </div>
  );
}

export default App;
