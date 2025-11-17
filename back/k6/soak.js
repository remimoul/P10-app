import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,           // 10 utilisateurs simultanés
    duration: '10m',   // 10 minutes
    thresholds: {
        "http_req_duration{name:GET /leagues}": ["p(95)<300"],
        "http_req_duration{name:GET /leagues/:id}": ["p(95)<200"],
        "http_req_duration{name:POST /leagues/join}": ["p(99)<500"],
        http_req_failed: ["rate<0.01"],
    },
};

export default function () {
    const res1 = http.get(`${__ENV.BASE_URL}/leagues`, {
        tags: { name: "GET /leagues" },
    });
    check(res1, { "GET /leagues status 200": (r) => r.status === 200 });

    const res2 = http.get(`${__ENV.BASE_URL}/leagues/1`, {
        tags: { name: "GET /leagues/:id" },
    });
    check(res2, {
        "GET /leagues/:id status ok/404": (r) =>
            r.status === 200 || r.status === 404,
    });

    const res3 = http.post(`${__ENV.BASE_URL}/leagues/join`, {}, {
        tags: { name: "POST /leagues/join" },
    });
    check(res3, {
        "POST /leagues/join status ok/400": (r) =>
            r.status === 200 || r.status === 400,
    });

    sleep(1);
}
