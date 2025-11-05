import http from 'k6/http';
import { check, sleep } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import { obterToken } from '../helpers/autenticacao.js';
import { pegarBaseUrl } from '../utilis/variaveis.js';  // importa a função para pegar a base URL 
 
export const options = {
  iterations: 10,
};

export default function() {
 const token = obterToken();

 const url = `${pegarBaseUrl()}/api/books`;
const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    title: 'Tudo é Rio',
    author: 'Maria Valéria Rezende',
    quantity: 3 ,
});


 const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
  

  let res = http.post(url, payload, params);  
   console.log('status', res.status);


 check(res, {
    'Livro Criado': (r) => r.status === 201,
  
 });

  // Validação 400 - Dados inválidos (título vazio, quantidade negativa)
  const invalidPayload = JSON.stringify({
    title: '',
    author: 'Autor Teste',
    quantity: -1,
  });

  const res400 = http.post(url, invalidPayload, params);
  check(res400, {
    'Status é 400 (Dados inválidos)': (r) => r.status === 400,
  });

  // Validação 401 - Sem autenticação
  const paramsSemAuth = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res401 = http.post(url, payload, paramsSemAuth);
  check(res401, {
    'Status é 401 (Unauthorized)': (r) => r.status === 401,
  });

  sleep(1);
}
