import http from 'k6/http';
import { sleep, check } from 'k6';
export let options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

let getID = () => {
  return Math.floor((Math.random() * 1000000) +1);
}

export default function () {
  const BASE_URL = 'http://127.0.0.1:5000/';
  let productId = getID();
  let res = http.get(`${BASE_URL}products/${productId}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
  // let responses = http.batch([
  //   [
  //     'GET',
  //     `${BASE_URL}/products/`,
  //     null,
  //     {},
  //   ],
  //   // [
  //   //   'GET',
  //   //   `${BASE_URL}/products/${productId}`,
  //   //   null,
  //   //   {},
  //   // ],
  //   // [
  //   //   'GET',
  //   //   `${BASE_URL}/products/${productId}/styles`,
  //   //   null,
  //   //   {},
  //   // ],
  //   // [
  //   //   'GET',
  //   //   `${BASE_URL}/products/${productId}/related`,
  //   //   null,
  //   //   {},
  //   // ],
  // ]);
  sleep(1);
}