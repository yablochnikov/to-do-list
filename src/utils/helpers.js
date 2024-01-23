import axios from "axios";
import { TASKS_ENDPOINT } from "./config";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(TASKS_ENDPOINT);

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const filterTasks = async (tasks, taskId) => {
  try {
    await axios.delete(`${TASKS_ENDPOINT}/${taskId}`);

    return tasks.filter((task) => task.id !== taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
    return tasks;
  }
};

export const addTask = async (tasks, newTask, date) => {
  try {
    const response = await axios.post(TASKS_ENDPOINT, {
      text: newTask,
      date: date.toLocaleDateString(),
    });

    return [...tasks, response.data];
  } catch (error) {
    console.error("Error adding task:", error);
    return tasks;
  }
};

export const saveEditedTask = async (tasks, selectedTask, newText) => {
  try {
    const updatedTask = { ...selectedTask, text: newText };
    await axios.put(`${TASKS_ENDPOINT}/${selectedTask.id}`, updatedTask);

    return tasks.map((task) =>
      task.id === selectedTask.id ? updatedTask : task
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return tasks;
  }
};

export const completeTask = async (tasks, taskId) => {
  try {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, completed: true };
      await axios.put(`${TASKS_ENDPOINT}/${taskId}`, updatedTask);

      return tasks.map((task) => (task.id === taskId ? updatedTask : task));
    } else {
      console.error("Task not found");
      return tasks;
    }
  } catch (error) {
    console.error("Error completing task:", error);
    return tasks;
  }
};
