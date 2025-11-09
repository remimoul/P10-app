import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.1"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://p10appb";

export default function () {
  // Test /leagues
  const res1 = http.get(`${BASE_URL}/leagues`);
  check(res1, {
    "/leagues status 200": (r) => r.status === 200,
  });

  sleep(0.5);

  // Test /users/all
  const res2 = http.get(`${BASE_URL}/users/all`);
  check(res2, {
    "/users/all status 200": (r) => r.status === 200,
  });

  sleep(0.5);

  // Test /pilots/all
  const res3 = http.get(`${BASE_URL}/pilots/all`);
  check(res3, {
    "/pilots/all status 200": (r) => r.status === 200,
  });

  sleep(1);
}
