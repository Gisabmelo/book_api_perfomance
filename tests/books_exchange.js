import http from 'k6/http';
import { check, sleep} from 'k6';
import { pegarBaseUrl } from '../utilis/variaveis.js'; // importa a função para pegar a base URL
import { obterToken } from '../helpers/autenticacao.js';

export const options = {
  iterations: 10,    // quantas vezes o teste será executado
};

export function setup() {
  const token = obterToken();
  
  const url = `${pegarBaseUrl()}/api/books`;
  const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    title: 'Nome do Vento',
    author: 'Patrick Rothfuss',
    quantity: 15,  // quantidade suficiente para 10 iterações
    
});

  const params = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

  const res = http.post(url, payload, params);
  
  return { token, bookId: res.json('id') };
}

export default function (data) {
  const res = http.post(
    `${pegarBaseUrl()}/api/books/${data.bookId}/exchange`,
    null,
    { headers: { Authorization: `Bearer ${data.token}` } }
  );

  check(res, {
    'status 200 OK': (r) => r.status === 200,
    'mensagem de sucesso': (r) => r.json('message') === 'exchange successful',
  });

  sleep(1);
}