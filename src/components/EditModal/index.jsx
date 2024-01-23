import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// components
import Button from "../Button/Button";
import Input from "../Input/Input";
// styles
import "./EditModal.scss";

const EditTaskModal = ({ isOpen, onClose, onSave, initialText }) => {
  const [editedText, setEditedText] = useState(initialText);

  useEffect(() => {
    setEditedText(initialText);
  }, [initialText]);

  const handleSave = () => {
    onSave(editedText);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal__content">
        <h2>Edit Task</h2>
        <Input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        <div className="modal__buttons">
          <Button
            type="success"
            onClick={handleSave}
            isDisabled={!editedText.length}
          >
            Save
          </Button>
          <Button type="error" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

EditTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialText: PropTypes.string.isRequired,
};

export default EditTaskModal;
