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

  const payloadEsgotado = JSON.stringify({
    title: 'Livro Esgotado',
    author: 'Autor Teste',
    quantity: 1,  // será esgotado no setup
  });

  const params = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

  const res = http.post(url, payload, params);
  
  // Criar livro que será esgotado
  const resEsgotado = http.post(url, payloadEsgotado, params);
  const bookIdEsgotado = resEsgotado.json('id');
  
  // Esgotar o livro (fazer 1 troca para zerar a quantidade)
  http.post(
    `${pegarBaseUrl()}/api/books/${bookIdEsgotado}/exchange`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  
  return { token, bookId: res.json('id'), bookIdEsgotado };
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

  // Validação 401 - Sem autenticação
  const res401 = http.post(
    `${pegarBaseUrl()}/api/books/${data.bookId}/exchange`,
    null
  );
  check(res401, {
    'Status é 401 (Unauthorized)': (r) => r.status === 401,
  });

  // Validação 404 - ID inexistente
  const res404 = http.post(
    `${pegarBaseUrl()}/api/books/id-invalido/exchange`,
    null,
    { headers: { Authorization: `Bearer ${data.token}` } }
  );
  check(res404, {
    'Status é 404 (Not Found)': (r) => r.status === 404,
  });

  // Validação 409 - Livro sem estoque disponível
  const res409 = http.post(
    `${pegarBaseUrl()}/api/books/${data.bookIdEsgotado}/exchange`,
    null,
    { headers: { Authorization: `Bearer ${data.token}` } }
  );
  check(res409, {
    'Status é 409 (Conflito - sem cópias)': (r) => r.status === 409,
  });

  sleep(1);
}