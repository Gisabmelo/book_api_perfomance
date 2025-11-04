const configLocal = JSON.parse(open('../config/config.local.json')); //puxa o arquivo json de config, converte em objeto
export function pegarBaseUrl() {
    return __ENV.BASE_URL || configLocal.baseURL;  //verifica se existe a variável de ambiente BASE_URL, se não existir usa a do arquivo local.json
}