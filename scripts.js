import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '10s', target: 100 },
    { duration: '20s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '20s', target: 400 },
    { duration: '10s', target: 200 },
    { duration: '10s', target: 10 },
  ],
};
let getID = () => {
  return Math.floor((Math.random() * 1000000) +1);
}
export default function () {
  const productId = getID();
  const url = 'http://127.0.0.1:5000/'

  // get products
  // let res = http.get(`${url}products`);
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);

  // //single product
  // let res = http.get(`${url}products/${productId}`);
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);

  // //styles products
  // let res = http.get(`${url}products/${productId}/styles`);
  // check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);

  //related products
  let res = http.get(`${url}products/${productId}/related`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}