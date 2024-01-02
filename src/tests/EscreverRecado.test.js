import { render } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import EscreverRecado from '../screens/EscreverRecado';

const mockApiRequest = jest.fn(() =>
    Promise.resolve({
        item: {
            id: 3,
            nome: 'lucas augsue',
            email: 'lucasaugsue7@gmail.com',
            recado: 'lorem ipslum texto hehe',
            created: '2024-01-02T18:50:52.642Z',
            updated: '2024-01-02T18:50:52.642Z',
        },
        message: 'Criado com sucesso!',
    })
);

test('Renderiza EscreverRecado corretamente', async () => {
	let tree;
  
	await act(async () => {
		const clientContext = {
			apiRequest: mockApiRequest, // Substitua pelo mock da função apiRequest
		};

		tree = renderer.create(
			<ClientContext.Provider value={clientContext}>
				<EscreverRecado />
			</ClientContext.Provider>
		);
	});
  
	expect(tree.toJSON()).toMatchSnapshot();
});

