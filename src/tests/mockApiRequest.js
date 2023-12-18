const mockApiRequest = jest.fn((method, endpoint, data) => {
    switch (method) {
        case 'GET':
            if (endpoint === '/presentes/list') {
                return Promise.resolve([
                    {
                        "mais_informacoes": "https://www.amazon.com.br/dp/B001BSX1EM?ref_=cm_sw_r_apan_dp_20ZZWBH7X76K0ENAKVDQ&language=pt-BR",
                        "descricao": "O núcleo de aço de calibre pesado não deforma e aquece uniformemente sem pontos quentes para que seus biscoitos e bolos saiam do forno perfeitamente e uniformemente dourados.\nO interior de cada peça tem camadas antiaderentes interligadas que são projetadas para proporcionar liberação duradoura e de alto desempenho. Libera até 2 vezes melhor do que as assadeiras clássicas Calphalon.",
                        "created": "2023-12-13T19:25:40.385Z",
                        "url": "https://m.media-amazon.com/images/I/81SJ7sZHKYL._AC_UF894,1000_QL80_FMwebp_.jpg",
                        "updated": "2023-12-13T19:30:02.715Z",
                        "preco": "494.50",
                        "nome": "Calphalon Conjunto de assadeiras antiaderentes, conjunto de 6 peças",
                        "id": "27ab93168ffb6730d4a0e62336d184e9"
                    },
                    {
                        "mais_informacoes": "https://m.magazineluiza.com.br/fritadeira-eletrica-sem-oleo-air-fryer-mondial-afo-12l-bi-oven-preta-12l-com-forno/p/236702500/ep/frel/?partner_id=64068&utm_source=pdp&utm_medium=share",
                        "descricao": "A fritadeira elétrica sem óleo/Air Fryer Mondial AFO-12L-BI Oven tem as cores preto e inox e vai facilitar muito o seu dia a dia na cozinha. Fabricada em material PP e inox, tem o cesto com capacidade de 5L e oferece diversas funções como 2 em 1 onde o modelo oven alia as vantagens da tecnologia da Air Fryer ao espaço e versatilidade do forno. Tem capacidade total de 12L.",
                        "created": "2023-12-13T19:21:27.170Z",
                        "url": "https://a-static.mlcdn.com.br/450x450/fritadeira-eletrica-sem-oleo-air-fryer-mondial-afo-12l-bi-oven-preta-12l-com-forno/magazineluiza/236702500/b585030ba78b67a323c8eea676b1b81a.jpg",
                        "updated": "2023-12-13T19:21:27.170Z",
                        "preco": "724.24",
                        "nome": "Fritadeira Elétrica sem óleo/Air Fryer Mondial",
                        "id": "0ac9e4a0e635758cce67d5d2f6adfa7a"
                    }
                ]);
            }

            else if (endpoint === '/recados/list') {
                return Promise.resolve([
                    {
                        "recado": "lorem ipslum texto hehe",
                        "updated": "2023-12-17T00:06:11.783Z",
                        "created": "2023-12-17T00:06:11.783Z",
                        "nome": "lucas augsue",
                        "email": "lucasaugsue7@gmail.com",
                        "id": "c0a394d2f8be89ec46507751a65a2cce"
                    },
                    {
                        "recado": "Site bem poggers, ngl",
                        "updated": "2023-12-13T20:00:34.640Z",
                        "created": "2023-12-13T20:00:34.640Z",
                        "nome": "David Bazooka",
                        "email": "daviaugsue6@gmail.com",
                        "id": "62b922d1df84fd00816368daccf0d44f"
                    },
                    {
                        "recado": "Vivi pague o que você me deve",
                        "updated": "2023-11-30T17:37:07.242Z",
                        "created": "2023-11-30T17:37:07.242Z",
                        "nome": "David Bazooka",
                        "email": "daviaugsue6@gmail.com",
                        "id": "26550995bb2bcbbc9d065afa71908077"
                    },
                ]);
            }

            else if (endpoint === '/confirmar-presenca/list') {
                return Promise.resolve([
                    {
                        "updated": "2023-12-17T00:00:23.745Z",
                        "created": "2023-12-17T00:00:23.745Z",
                        "nome": "lucas augsue testinho",
                        "id": "200e1d4af3cf5c8525e87fb0aa4056bb",
                        "celular": "(61)98114-6060",
                        "idade": "21"
                    },
                    {
                        "updated": "2023-12-16T18:12:52.861Z",
                        "created": "2023-12-16T18:12:52.861Z",
                        "nome": "Lucas Augsue ",
                        "id": "898ff3740ed8df4ad748b0de2babbc60",
                        "celular": "61981146060",
                        "idade": "21"
                    }
                ]);
            }
            break;
    
        case 'POST':
            if (endpoint === '/presentes/create') {
                return Promise.resolve({
                    "item": {
                        "collection": "presentes",
                        "key": "a57e0a001e063ba81f15e9a59c38e464",
                        "props": {
                            "mais_informacoes": "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjB3JjFudqCAxWBYkgAHTGtA4kYABAIGgJjZQ&gclid=CjwKCAiAjfyqBhAsEiwA-UdzJCUqA7hj1uJT0Z72HMNjsaWl9cUoC1oi6YgMeYkjA13OfvpDA2XUrBoCrhQQAvD_BwE&ohost=www.google.com&cid=CAESVuD2gvaXYtbAmggPYCTv0l-7cuzWXH-zfl6pWt2avVB91ejLKBMNuDQtQRi7n-0c70jze-dneMvYgv36j2QoSbCIJgAv6pwxrEnIsdhPUgeFEAaRzp4H&sig=AOD64_0X6BLbsVqNn82acMlpWaErwa-MmQ&ctype=5&q=&ved=2ahUKEwjgypHFudqCAxXUnpUCHaZUDCQQ9aACKAB6BAgEEA4&adurl=",
                            "descricao": "O G203 LIGHTSYNC vem pronto para jogar com um sensor de 8.000 DPI e cores RGB LIGHTSYNC personalizáveis. A iluminação RGB LIGHTSYNC pode ser personalizada com efeitos ou padrões de ondas de cores em aproximadamente 16,8 milhões de cores para se adequar ao seu estilo, configuração e humor. O sensor de nível avançado para jogos responde com precisão aos seus movimentos e você pode personalizar as configurações para se adequar à sensibilidade desejada.* ",
                            "created": "2023-12-18T17:07:15.428Z",
                            "url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQIWRiS28nUCk40tClRLUpifp7y8tbSj1E1U4vOJyNavZG_b9Gn-6Wfotz2oUEeac5rKANqip3Or1v7xRGeRWmwveSGDcQsGoueC5hpFuLN8zdSIsBi_NcvtqKMtChhN20ehlQraw&usqp=CAc",
                            "updated": "2023-12-18T17:07:15.428Z",
                            "preco": "89",
                            "nome": "mouse gamer 2",
                            "id": "a57e0a001e063ba81f15e9a59c38e464"
                        }
                    },
                    "message": "Criado com sucesso!"
                });
            }

            else if (endpoint === '/recados/create') {
                return Promise.resolve({
                    "item": {
                        "collection": "recados",
                        "key": "63c31433cb9ca5d9ce2f54c0bb43b67c",
                        "props": {
                            "recado": "lorem ipslum texto hehe",
                            "updated": "2023-12-18T16:49:41.133Z",
                            "created": "2023-12-18T16:49:41.134Z",
                            "nome": "lucas augsue",
                            "email": "lucasaugsue7@gmail.com",
                            "id": "63c31433cb9ca5d9ce2f54c0bb43b67c"
                        }
                    },
                    "message": "Criado com sucesso!"
                });
            }

            else if (endpoint === '/confirmar-presenca/create') {
                return Promise.resolve({
                    "item": {
                        "collection": "confirmar_presenca",
                        "key": "9cffde6265166dbb889b000a174e5c28",
                        "props": {
                            "updated": "2023-12-18T17:11:38.224Z",
                            "created": "2023-12-18T17:11:38.224Z",
                            "nome": "lucas augsue testinho",
                            "id": "9cffde6265166dbb889b000a174e5c28",
                            "celular": "(61)98114-6060",
                            "idade": "21"
                        }
                    },
                    "message": "Criado com sucesso!"
                  });
            }
            break;
    
        case 'PATCH':
            if (endpoint === '/presentes/edit/:id') {
                return Promise.resolve({
                    "item": {
                        "collection": "presentes",
                        "key": "a57e0a001e063ba81f15e9a59c38e464",
                        "props": {
                            "mais_informacoes": "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjB3JjFudqCAxWBYkgAHTGtA4kYABAIGgJjZQ&gclid=CjwKCAiAjfyqBhAsEiwA-UdzJCUqA7hj1uJT0Z72HMNjsaWl9cUoC1oi6YgMeYkjA13OfvpDA2XUrBoCrhQQAvD_BwE&ohost=www.google.com&cid=CAESVuD2gvaXYtbAmggPYCTv0l-7cuzWXH-zfl6pWt2avVB91ejLKBMNuDQtQRi7n-0c70jze-dneMvYgv36j2QoSbCIJgAv6pwxrEnIsdhPUgeFEAaRzp4H&sig=AOD64_0X6BLbsVqNn82acMlpWaErwa-MmQ&ctype=5&q=&ved=2ahUKEwjgypHFudqCAxXUnpUCHaZUDCQQ9aACKAB6BAgEEA4&adurl=",
                            "descricao": "O G203 LIGHTSYNC vem pronto para jogar com um sensor de 8.000 DPI e cores RGB LIGHTSYNC personalizáveis. A iluminação RGB LIGHTSYNC pode ser personalizada com efeitos ou padrões de ondas de cores em aproximadamente 16,8 milhões de cores para se adequar ao seu estilo, configuração e humor. O sensor de nível avançado para jogos responde com precisão aos seus movimentos e você pode personalizar as configurações para se adequar à sensibilidade desejada.* ",
                            "created": "2023-12-18T17:07:15.428Z",
                            "url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQIWRiS28nUCk40tClRLUpifp7y8tbSj1E1U4vOJyNavZG_b9Gn-6Wfotz2oUEeac5rKANqip3Or1v7xRGeRWmwveSGDcQsGoueC5hpFuLN8zdSIsBi_NcvtqKMtChhN20ehlQraw&usqp=CAc",
                            "updated": "2023-12-18T17:07:15.428Z",
                            "preco": "89",
                            "nome": "mouse gamer 2",
                            "id": "a57e0a001e063ba81f15e9a59c38e464"
                        }
                    },
                    "message": "Editado com sucesso!"
                });
            }
            
            else if (endpoint === '/recados/edit/:id') {
                return Promise.resolve({
                    "item": {
                        "collection": "recados",
                        "key": "63c31433cb9ca5d9ce2f54c0bb43b67c",
                        "props": {
                            "recado": "lorem ipslum texto editado",
                            "updated": "2023-12-18T16:52:17.229Z",
                            "created": "2023-12-18T16:49:41.134Z",
                            "nome": "lucas augsue",
                            "email": "lucasaugsue7@gmail.com",
                            "id": "63c31433cb9ca5d9ce2f54c0bb43b67c"
                        }
                    },
                    "message": "Editado com sucesso!"
                });
            }

            else if (endpoint === '/confirmar-presenca/edit/:id') {
                return Promise.resolve({
                    "item": {
                        "collection": "confirmar_presenca",
                        "key": "9cffde6265166dbb889b000a174e5c28",
                        "props": {
                            "updated": "2023-12-18T17:11:38.224Z",
                            "created": "2023-12-18T17:11:38.224Z",
                            "nome": "lucas augsue testinho",
                            "id": "9cffde6265166dbb889b000a174e5c28",
                            "celular": "(61)98114-6060",
                            "idade": "21"
                        }
                    },
                    "message": "Editado com sucesso!"
                });
            }
            break;
        
        case 'DELETE':
            if (endpoint === '/presentes/delete/:id') {
                return Promise.resolve({
                    "message": "Deletado com sucesso!"
                });
            }

            else if (endpoint === '/recados/delete/:id') {
                return Promise.resolve({
                    "message": "Deletado com sucesso!"
                });
            }

            else if (endpoint === '/confirmar-presenca/delete/:id') {
                return Promise.resolve({
                    "message": "Deletado com sucesso!"
                });
            }
            break;
    
        default:
            break;
    }
  
    // Se nenhum caso corresponder, retorne uma promessa rejeitada
    return Promise.reject(new Error(`Unhandled API request: ${method} ${endpoint}`));
});

export default mockApiRequest;