import React from "react";
import PropTypes from "prop-types";
//components
import Button from "../Button/Button";
// styles
import "./TaskItem.scss";

const TaskItem = ({
  task,
  openEditModal,
  deleteTaskHandler,
  completeTaskHandler,
}) => {
  return (
    <li className={task.completed ? "completed" : ""}>
      <span title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}>
        {task.text}
      </span>
      <div className="task__buttons">
        {!task.completed && (
          <Button type="warning" onClick={() => openEditModal(task)}>
            Edit
          </Button>
        )}
        <Button type="error" onClick={() => deleteTaskHandler(task.id)}>
          Delete
        </Button>
        {!task.completed && (
          <Button type="success" onClick={() => completeTaskHandler(task.id)}>
            Done
          </Button>
        )}
      </div>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  openEditModal: PropTypes.func.isRequired,
  deleteTaskHandler: PropTypes.func.isRequired,
  completeTaskHandler: PropTypes.func.isRequired,
};

export default TaskItem;
