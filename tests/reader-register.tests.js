import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseUrl } from '../utilis/variaveis.js';

// Configuração do teste
export const options = {
  vus: 5, // usuários virtuais
  duration: '10s', // tempo de execução
};

export default function () {
  const BASE_URL = pegarBaseUrl();
  const registerUrl = `${BASE_URL}/api/auth/register`;

  // 🔹 1) Criação válida (espera 201)
  const uniqueName = `reader_${__VU}_${__ITER}_${Math.floor(Math.random()*1e6)}`;
  let validPayloadObj = {
    name: uniqueName,
    password: '1234',
  };
  let validPayload = JSON.stringify(validPayloadObj);

  let res = http.post(registerUrl, validPayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'Leitor Criado (201)': (r) => r.status === 201,
  });

  // 🔹 2) Dados inválidos (espera 400)
  let invalidPayload = JSON.stringify({
    name: '', // nome vazio
    password: '1234',
  });

  let resInvalid = http.post(registerUrl, invalidPayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(resInvalid, {
    'Status é 400 (Dados inválidos)': (r) => r.status === 400,
  });

  // 🔹 3) Usuário já existente (espera 409)
  let resDuplicate = http.post(registerUrl, validPayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(resDuplicate, {
    'Status é 409 (Conflito - Já cadastrado)': (r) => r.status === 409,
  });

  sleep(1);
}
