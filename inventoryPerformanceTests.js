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
    // Get inventory information
    let res = http.get(`${BASE_URL}/store/inventory`);
    check(res, {
        'GET /store/inventory status is 200': (r) => r.status === 200,
        'approved is 50': (r) => r.json().approved === 50,
        'delivered is 50': (r) => r.json().delivered === 50,
    });

    sleep(1); // Wait for 1 second between iterations
}
