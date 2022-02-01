import React from "react";

const DeleteEvent = ({ removeEvent, id }) => {
    return (
        <button className="delete-event-btn" onClick={() => removeEvent(id)}>Удалить</button>
    )
}
export default DeleteEvent;