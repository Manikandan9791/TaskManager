export const Services = {
    GetAllTask,
}

function GetAllTask() {
    try {
        return fetch('https://jsonplaceholder.typicode.com/todos', { method: 'GET' })
            .then(response => response.json())
            .then(json => {
                return json
            })
    }
    catch {
    }
}