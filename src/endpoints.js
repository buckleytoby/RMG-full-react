
export const action_fetch_post = (bodyObj) => (
    fetch('http://localhost:5000/actions/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj)
}))

export const gameRestart = () => (fetch("http://localhost:5000/actions/restart/Confirm/"))

export const get_factories = () => (fetch("http://localhost:5000/game/get_factories/")) // form {id1: {row}, id2: {row}, ... }
export const set_factory_priorities = (bodyObj) => (
    fetch('http://localhost:5000/game/set_factory_priorities', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj)
}))