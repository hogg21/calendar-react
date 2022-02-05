const baseUrl = 'https://61f42d4c10f0f7001768c86e.mockapi.io/api/v1/events';

export const createTask = taskData => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(taskData)
    }).then(response => {
        if (!response.ok) {
            throw new Error(alert('Internal Server Error. Cant display events'))
        }
    })
}

export const fetchEvents = () => {
    return fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    })
}


export const deleteTask = taskId => {
    return fetch(`${baseUrl}/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error(alert('Internal Server Error. Cant display events'))
        }
    })
}