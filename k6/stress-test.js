import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 100 }, // Ramp-up to 100 users
    { duration: "5m", target: 100 }, // Stay at 100 users
    { duration: "2m", target: 200 }, // Ramp-up to 200 users
    { duration: "5m", target: 200 }, // Stay at 200 users
    { duration: "1m", target: 0 }, // Ramp-down
  ],
  thresholds: {
    http_req_duration: ["p(99)<5000"], // 99th percentile under 5s
    http_req_failed: ["rate<0.1"], // Error rate under 10%
  },
};

const BASE_URL = __ENV.BASE_URL || "http://p10appb";

export default function () {
  // Test /leagues endpoint
  group("GET /leagues", () => {
    const res = http.get(`${BASE_URL}/leagues`, {
      tags: { route: "/leagues" },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
      "response time acceptable": (r) => r.timings.duration < 3000,
    });
  });

  sleep(0.5);

  // Test /users/all endpoint
  group("GET /users/all", () => {
    const res = http.get(`${BASE_URL}/users/all`, {
      tags: { route: "/users/all" },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
      "response time acceptable": (r) => r.timings.duration < 100,
    });
  });

  sleep(0.5);

  // Test /pilots/all endpoint
  group("GET /pilots/all", () => {
    const res = http.get(`${BASE_URL}/pilots/all`, {
      tags: { route: "/pilots/all" },
    });
    check(res, {
      "status is 200": (r) => r.status === 200,
      "response time acceptable": (r) => r.timings.duration < 1500,
    });
  });

  sleep(1);
}
