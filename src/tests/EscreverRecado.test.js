import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import EscreverRecado from '../screens/EscreverRecado';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */

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

describe('<EscreverRecado/>', () => {
	describe('Renderização', () => {
		test('deve renderizar EscreverRecado corretamente', async () => {
			let tree;
		
			await act(async () => {
				const clientContext = { apiRequest: mockApiRequest };

				tree = renderer.create(
					<ClientContext.Provider value={clientContext}>
						<EscreverRecado />
					</ClientContext.Provider>
				);
			});
		
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	describe('Interações', () => {
		const clientContext = { apiRequest: mockApiRequest };

		beforeEach(() => {
			render(<ClientContext.Provider value={clientContext}>
				<EscreverRecado />
			</ClientContext.Provider>);
		});

		it('deve usar a funcao sendMessage', async () => {
			const nomeInput = screen.getByPlaceholderText('Seu nome');
			const emailInput = screen.getByPlaceholderText('Seu email');
			const recadoInput = screen.getByPlaceholderText('Escreva o recado');

			fireEvent.change(nomeInput, { target: { value: 'Lucas' } });
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(recadoInput, { target: { value: 'Teste de recado' } });

			expect(nomeInput).toHaveValue('Lucas');
			expect(emailInput).toHaveValue('test@example.com');
			expect(recadoInput).toHaveValue('Teste de recado');

			await act(async () => {
				fireEvent.click(screen.getByText('Enviar'));
			});

			expect(nomeInput).toHaveValue('');
		});
	});
});

