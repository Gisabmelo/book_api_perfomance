import http from 'k6/http';
import { check, sleep} from 'k6';
import { pegarBaseUrl } from '../utilis/variaveis.js'; // importa a função para pegar a base URL
import { obterToken } from '../helpers/autenticacao.js';

export const options = {
  iterations: 10,    // quantas vezes o teste será executado
};

export default function () {
  const token = obterToken();
  
  const url = `${pegarBaseUrl()}/api/books`;
  const payload = JSON.stringify({
   //objeto que representa o payload, transformado em json
    title: 'Nome do Vento',
    author: 'Patrick Rothfuss',
    quantity: 3,
    
});

  const params = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

   const res = http.get(url, params);
  
    // Verificações (assertions)
    check(res, {
      'status é 200': (r) => r.status === 200,
      'retornou lista de livros': (r) => Array.isArray(r.json()),
    });
  
    sleep(1); // pausa entre requisições
  }