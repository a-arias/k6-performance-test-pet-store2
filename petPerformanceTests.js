import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 }, // Ramp-up to 20 users over 30 seconds
        { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
        { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
    ],
};

const BASE_URL = 'http://localhost:8080/api/v3';

export default function () {
    // Create a new pet
    let createPayload = JSON.stringify({
        id: 101,
        name: "Max100",
        category: { id: 1, name: "Dogs" },
        photoUrls: ["url1", "url2"],
        tags: [{ id: 0, name: "tag1" }],
        status: "available"
    });
    let res = http.post(`${BASE_URL}/pet`, createPayload, {
        headers: { 'Content-Type': 'application/json' },
    });
    check(res, {
        'POST /pet status is 200': (r) => r.status === 200,
    });

    // Update an existing pet
    let updatePayload = JSON.stringify({
        id: 101,
        name: "Max200",
        category: { id: 1, name: "Dogs" },
        photoUrls: ["url1", "url2"],
        tags: [{ id: 0, name: "tag1" }],
        status: "available"
    });
    res = http.put(`${BASE_URL}/pet`, updatePayload, {
        headers: { 'Content-Type': 'application/json' },
    });
    check(res, {
        'PUT /pet status is 200': (r) => r.status === 200,
    });

    // Get pet by ID
    res = http.get(`${BASE_URL}/pet/101`);
    check(res, {
        'GET /pet/:petId status is 200': (r) => r.status === 200,
        'id is correct': (r) => r.json().id === 101,
        'name is not empty': (r) => r.json().name !== "",
        'status is not empty': (r) => r.json().status !== ""
    });

    // Get all available pets
    res = http.get(`${BASE_URL}/pet/findByStatus?status=available`);
    check(res, { 'GET /pet/findByStatus status is 200': (r) => r.status === 200 });

    // Delete a pet
    res = http.del(`${BASE_URL}/pet/101`);
    check(res, { 'DELETE /pet/:petId status is 200': (r) => r.status === 200 });

    sleep(1); // Wait for 1 second between iterations
}
