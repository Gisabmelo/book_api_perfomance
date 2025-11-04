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
        return res.json('token')   // obtem o token a partir do json de resposta

}