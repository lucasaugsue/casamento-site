import renderer from 'react-test-renderer';
import CardReview from '../components/CardReview';

const item = {
    "mais_informacoes": "https://www.amazon.com.br/dp/B001BSX1EM?ref_=cm_sw_r_apan_dp_20ZZWBH7X76K0ENAKVDQ&language=pt-BR",
    "descricao": "O núcleo de aço de calibre pesado não deforma e aquece uniformemente sem pontos quentes para que seus biscoitos e bolos saiam do forno perfeitamente e uniformemente dourados.\nO interior de cada peça tem camadas antiaderentes interligadas que são projetadas para proporcionar liberação duradoura e de alto desempenho. Libera até 2 vezes melhor do que as assadeiras clássicas Calphalon.",
    "created": "2023-12-13T19:25:40.385Z",
    "url": "https://m.media-amazon.com/images/I/81SJ7sZHKYL._AC_UF894,1000_QL80_FMwebp_.jpg",
    "updated": "2023-12-13T19:30:02.715Z",
    "preco": "494.50",
    "nome": "Calphalon Conjunto de assadeiras antiaderentes, conjunto de 6 peças",
    "id": "27ab93168ffb6730d4a0e62336d184e9"
}

test('Renderiza CardReview corretamente', async () => {
    const handleChange = jest.fn();
    const compartilhar = jest.fn();

    const tree = renderer.create(
        <CardReview 
            params={{
                ...item, 
                color_id: 1,
                handleChange: handleChange,
                compartilhar: compartilhar
            }} 
        />
    ).toJSON();

    // Verifica se o snapshot corresponde ao esperado
    expect(tree).toMatchSnapshot();
});
