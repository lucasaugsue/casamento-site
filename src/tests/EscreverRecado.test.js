import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import EscreverRecado from '../screens/EscreverRecado';

const mockApiRequest = jest.fn((config) => {
	// Simule o comportamento da sua API
	return Promise.resolve({
        "item": {
            "collection": "recados",
            "key": "c0a394d2f8be89ec46507751a65a2cce",
            "props": {
                "recado": "lorem ipslum texto hehe",
                "updated": "2023-12-17T00:06:11.783Z",
                "created": "2023-12-17T00:06:11.783Z",
                "nome": "lucas augsue",
                "email": "lucasaugsue7@gmail.com",
                "id": "c0a394d2f8be89ec46507751a65a2cce"
            }
        },
        "message": "Criado com sucesso!"
    });
});
  
test('Renderiza EscreverRecado corretamente', async () => {
	let tree;
  
	await act(async () => {
		const clientContext = {
			apiRequest: mockApiRequest, // Substitua pelo mock da sua função apiRequest
		};

		tree = renderer.create(
			<ClientContext.Provider value={clientContext}>
				<EscreverRecado />
			</ClientContext.Provider>
		);
	});
  
	expect(tree.toJSON()).toMatchSnapshot();
});
