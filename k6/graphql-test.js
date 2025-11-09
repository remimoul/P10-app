import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 10 },
    { duration: "20s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.05"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://p10appb";

const queries = {
  getAllLeagues: `
    query GetAllLeagues {
      leagues {
        id
        name
        emoji
      }
    }
  `,
  getAllUsers: `
    query GetAllUsers {
      users {
        id
        email
        clerkId
      }
    }
  `,
  getAllPilots: `
    query GetAllPilots {
      pilots {
        id
        name
        number
      }
    }
  `,
};

export default function () {
  const headers = {
    "Content-Type": "application/json",
  };

  // Test GetAllLeagues query
  group("GraphQL: GetAllLeagues", () => {
    const payload = JSON.stringify({
      query: queries.getAllLeagues,
    });

    const res = http.post(`${BASE_URL}/graphql`, payload, {
      headers,
      tags: { operation: "GetAllLeagues" },
    });

    check(res, {
      "status is 200": (r) => r.status === 200,
      "has data": (r) => r.body.includes('"data"'),
      "no errors": (r) => !r.body.includes('"errors"'),
      "response time < 2s": (r) => r.timings.duration < 2000,
    });
  });

  sleep(1);

  // Test GetAllUsers query
  group("GraphQL: GetAllUsers", () => {
    const payload = JSON.stringify({
      query: queries.getAllUsers,
    });

    const res = http.post(`${BASE_URL}/graphql`, payload, {
      headers,
      tags: { operation: "GetAllUsers" },
    });

    check(res, {
      "status is 200": (r) => r.status === 200,
      "has data": (r) => r.body.includes('"data"'),
      "no errors": (r) => !r.body.includes('"errors"'),
      "response time < 100ms": (r) => r.timings.duration < 100,
    });
  });

  sleep(1);

  // Test GetAllPilots query
  group("GraphQL: GetAllPilots", () => {
    const payload = JSON.stringify({
      query: queries.getAllPilots,
    });

    const res = http.post(`${BASE_URL}/graphql`, payload, {
      headers,
      tags: { operation: "GetAllPilots" },
    });

    check(res, {
      "status is 200": (r) => r.status === 200,
      "has data": (r) => r.body.includes('"data"'),
      "no errors": (r) => !r.body.includes('"errors"'),
      "response time < 1.5s": (r) => r.timings.duration < 1500,
    });
  });

  sleep(1);
}
