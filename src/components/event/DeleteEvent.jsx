import React from "react";

const DeleteEvent = ({ onDelete, id }) => {
    return (
        <button className="delete-event-btn" onClick={onDelete(id)}>Удалить</button>
    )
}
export default DeleteEvent;