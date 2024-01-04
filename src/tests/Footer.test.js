import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import Footer from '../screens/Footer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */

const mockApiRequest = jest.fn((config) => {
	//Simule o comportamento da API
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
        },
        {
            "mais_informacoes": "https://m.magazineluiza.com.br/kit-philco-pkt75-com-liquidificador-e-batedeira/p/235722300/ep/bate/?partner_id=64068&utm_source=pdp&utm_medium=share",
            "descricao": "Para facilitar o seu dia a dia na cozinha, você precisa ter equipamentos que auxiliem no preparo dos alimentos. Por isso você precisa conhecer o kit 101501053_110 PKT75 da Philco. Ele é composto por 1 liquidificador com 900W de potência, filtro, base antiderrapante, faca de 4 lâminas, tampa com sobre tampa, porta fio e 1 batedeira planetária com 700W de potência, 3 pares de batedores em inox para massas leves, massas pesadas e claras em neve e trabalha com 12 velocidades + Turbo.",
            "created": "2023-12-13T19:19:30.063Z",
            "url": "https://a-static.mlcdn.com.br/450x450/kit-philco-pkt75-com-liquidificador-e-batedeira/magazineluiza/235722300/218564b0a24905f772ad602c7aaed7bd.jpg",
            "updated": "2023-12-13T19:19:30.063Z",
            "preco": "344.64",
            "nome": "Kit Philco PKT75 com Liquidificador e Batedeira",
            "id": "7c50d4897b8404baf40d1ec255dbb51f"
        },
    ]);
});

describe('<Footer/>', () => {
    describe('Renderização', () => {
        test('deve renderizar Footer corretamente', async () => {
            let tree;
        
            await act(async () => {
                const clientContext = { apiRequest: mockApiRequest };

                tree = renderer.create(
                    <ClientContext.Provider value={clientContext}>
                        <Footer />
                    </ClientContext.Provider>
                );
            });
        
            expect(tree.toJSON()).toMatchSnapshot();
        });
    });

    describe('Interações', () => {
        const clientContext = { apiRequest: mockApiRequest };

        beforeEach(async () => {
            await act(async () => {
                render(<ClientContext.Provider value={clientContext}>
                    <Footer />
                </ClientContext.Provider>);
            });
        });

        it('deve testar o retorno de getPresentes', async () => {
            await waitFor(() => {
                expect(mockApiRequest).toHaveBeenCalledWith("GET", "/presentes/list");
            });
    
            await waitFor(() => {
                expect(screen.getAllByTestId('item-presente')).toHaveLength(3); 
            });
        });
    });
});