const baseUrl = 'https://61f42d4c10f0f7001768c86e.mockapi.io/api/v1/events';

export const createTask = taskData => {
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(alert('Internal Server Error. Cant display events'))
    })
}

export const getTasks = () => {
    fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(alert('Internal Server Error. Cant display events'))
    }).then(data => {
        console.log(data);
    })
}

export const deleteTask = id => {
    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(alert('Internal Server Error. Cant display events'))
    })
}