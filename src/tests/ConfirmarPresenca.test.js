import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import ConfirmarPresenca from '../screens/ConfirmarPresenca';

const mockApiRequest = jest.fn((config) => {
	// Simule o comportamento da sua API
	return Promise.resolve({
	  item: {
		collection: 'confirmar_presenca',
		key: '200e1d4af3cf5c8525e87fb0aa4056bb',
		props: {
			updated: '2023-12-17T00:00:23.745Z',
			created: '2023-12-17T00:00:23.745Z',
			nome: 'lucas augsue testinho',
			id: '200e1d4af3cf5c8525e87fb0aa4056bb',
			celular: '(61)98114-6060',
			idade: '21',
		},
	  },
	  message: 'Criado com sucesso!',
	});
});
  
test('Renderiza ConfirmarPresenca corretamente', async () => {
	let tree;
  
	await act(async () => {
		const clientContext = {
			apiRequest: mockApiRequest, // Substitua pelo mock da sua função apiRequest
		};

		tree = renderer.create(
			<ClientContext.Provider value={clientContext}>
				<ConfirmarPresenca />
			</ClientContext.Provider>
		);
	});
  
	expect(tree.toJSON()).toMatchSnapshot();
});
