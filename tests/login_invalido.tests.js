import http from 'k6/http'
import {sleep,check} from 'k6'
import { pegarBaseUrl } from '../utilis/variaveis.js'; // importa a função para pegar a base URL 

export const options = {
 stages: [
   // { duration: '30s', target: 50 }, // Ramp-up to 10 VUs over 10 seconds
    { duration: '20s', target: 10 }, // Stay at 10 VUs for 20 seconds
  //  { duration: '5s', target: 0 },  // Ramp-down to 0 VUs over 10 seconds
  ],
};

export default function () {
    const url = `${pegarBaseUrl()}/api/auth/login`;
  const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    name: 'juli',
    password: '123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

   const resposta = http.post(url, payload, params);
 // console.log('status', resposta.status);

  
 check(resposta, {
  'Status é 401 (Unauthorized)': (r) => r.status === 401,
  'Credenciais inválidas': (r) => r.body && r.body.includes('invalid credentials'),
  'Tempo de resposta menor que 500 ms': (r) => (r.timings && (r.timings.duration || r.timings['duration'])) < 500,
});

  sleep(1);
  }
  