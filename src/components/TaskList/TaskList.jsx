import React from "react";
import PropTypes from "prop-types";
// components
import EditTaskModal from "../EditModal/index";
import TaskItem from "../TaskItem/index";
// styles
import "./TaskList.scss";

const TaskList = ({
  loading,
  tasks,
  date,
  openEditModal,
  deleteTaskHandler,
  completeTaskHandler,
  closeEditModal,
  saveEditedTaskHandler,
  selectedTask,
  editModalOpen,
}) => {
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              openEditModal={openEditModal}
              deleteTaskHandler={deleteTaskHandler}
              completeTaskHandler={completeTaskHandler}
            />
          ))}
        </ul>
      ) : (
        <p>
          No tasks available for {date.toLocaleDateString()}. Add a new task
          above.
        </p>
      )}

      <EditTaskModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSave={saveEditedTaskHandler}
        initialText={selectedTask ? selectedTask.text : ""}
      />
    </>
  );
};

TaskList.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  date: PropTypes.object.isRequired,
  openEditModal: PropTypes.func.isRequired,
  deleteTaskHandler: PropTypes.func.isRequired,
  completeTaskHandler: PropTypes.func.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  saveEditedTaskHandler: PropTypes.func.isRequired,
  selectedTask: PropTypes.object,
  editModalOpen: PropTypes.bool.isRequired,
};

export default TaskList;
