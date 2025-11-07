import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 }, // Ramp-up to 20 users over 30s
    { duration: "1m30s", target: 20 }, // Stay at 20 users for 1m30s
    { duration: "20s", target: 0 }, // Ramp-down to 0 users over 20s
  ],
  thresholds: {
    // Latency SLO thresholds
    "http_req_duration{route:/leagues}": ["p(95)<1950"], // /leagues: < 1.95s
    "http_req_duration{route:/users/all}": ["p(95)<4.8"], // /users/all: < 4.8ms
    "http_req_duration{route:/pilots/all}": ["p(95)<975"], // /pilots/all: < 975ms

    // Error rate SLO thresholds
    "http_req_failed{route:/leagues}": ["rate<0.05"], // /leagues: < 5%
    "http_req_failed{route:/users/all}": ["rate<0.01"], // /users/all: < 1%
    "http_req_failed{route:/pilots/all}": ["rate<0.05"], // /pilots/all: < 5%
  },
};

const BASE_URL = __ENV.BASE_URL || "http://p10appb";
const ENDPOINTS = [
  {
    name: "/leagues",
    path: "/leagues",
    tags: { route: "/leagues" },
  },
  {
    name: "/users/all",
    path: "/users/all",
    tags: { route: "/users/all" },
  },
  {
    name: "/pilots/all",
    path: "/pilots/all",
    tags: { route: "/pilots/all" },
  },
];

export default function () {
  for (const endpoint of ENDPOINTS) {
    group(endpoint.name, () => {
      const url = `${BASE_URL}${endpoint.path}`;
      const res = http.get(url, {
        tags: endpoint.tags,
      });

      check(
        res,
        {
          "status is 200": (r) => r.status === 200,
          "response time < threshold": (r) => {
            if (endpoint.name === "/leagues") return r.timings.duration < 1950;
            if (endpoint.name === "/users/all") return r.timings.duration < 4.8;
            if (endpoint.name === "/pilots/all") return r.timings.duration < 975;
            return true;
          },
        },
        endpoint.tags
      );
    });

    sleep(1);
  }
}
