const postLogin = JSON.parse(open('../fixtures/postLogin.json')); //puxa o arquivo json de fixtures, converte em objeto
import http from 'k6/http';
import { pegarBaseUrl } from '../utilis/variaveis.js';


export function obterToken() {  

    const url = `${pegarBaseUrl()}/api/auth/login`
   
        console.log('Payload de login:', postLogin);  
    
        const payload = JSON.stringify(postLogin);
          //objeto que representa o payload, transformado em json
        const params = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const res = http.post(url, payload, params);
        
        // Validações para resposta vazia ou nula
        if (!res || res.status !== 200) {
          console.error('Erro ao obter token: status', res ? res.status : 'sem resposta');
          console.error('Body da resposta:', res ? res.body : 'vazio');
          return null;
        }
        
        const token = res.json('token');
        
        if (!token || token === '' || token === null || token === undefined) {
          console.error('Token vazio ou nulo na resposta');
          console.error('Resposta completa:', res.body);
          return null;
        }
        
        return token;

}

