const BASE_URL = "http://localhost:5005";

async function get(url) {
    const res = await fetch(`${BASE_URL}/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

function getWithToken(url, token) {
    return fetch(`${BASE_URL}/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

function gettId(url, id) {
    return fetch(`${BASE_URL}/${url}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

function post(url, data) {
    return fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

function put(url, data) {
    return fetch(`${BASE_URL}/${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

function deleteRequest(url) {
    return fetch(`${BASE_URL}/${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export { get, post, put, deleteRequest, BASE_URL };

