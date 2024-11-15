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
    // Create a new user
    let userPayload = JSON.stringify({
        id: 101,
        username: "theUser",
        firstName: "John",
        lastName: "James",
        email: "john@email.com",
        password: "12345",
        phone: "12345",
        userStatus: 1
    });
    let res = http.post(`${BASE_URL}/user`, userPayload, {
        headers: { 'Content-Type': 'application/json' },
    });
    check(res, {
        'POST /user status is 200': (r) => r.status === 200,
        'id is 101': (r) => r.json().id === 101,
        'username is "theUser"': (r) => r.json().username === "theUser",
        'firstName is "John"': (r) => r.json().firstName === "John",
        'lastName is "James"': (r) => r.json().lastName === "James",
        'email is "john@email.com"': (r) => r.json().email === "john@email.com",
        'password is "12345"': (r) => r.json().password === "12345",
        'phone is "12345"': (r) => r.json().phone === "12345",
        'userStatus is 1': (r) => r.json().userStatus === 1,
    });

    // Delete the user
    res = http.del(`${BASE_URL}/user/101`);
    check(res, {
        'DELETE /user/:userId status is 200': (r) => r.status === 200,
    });

    sleep(1); // Wait for 1 second between iterations
}
