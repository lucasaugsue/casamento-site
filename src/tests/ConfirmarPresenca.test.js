import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import ConfirmarPresenca from '../screens/ConfirmarPresenca';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */

const mockApiRequest = jest.fn((config) => {
	// Simule o comportamento da API
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
  
describe('<ConfirmarPresenca/>', () => {
	describe('Renderização', () => {
		test('deve renderizar ConfirmarPresenca corretamente', async () => {
			let tree;
  
			await act(async () => {
				const clientContext = { apiRequest: mockApiRequest };

				tree = renderer.create(
					<ClientContext.Provider value={clientContext}>
						<ConfirmarPresenca />
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
				<ConfirmarPresenca />
			</ClientContext.Provider>);
		});

		const abrirDialog = async () => {
			await waitFor(() => {
				expect(screen.getByTestId('button-mantine')).toBeInTheDocument();
			});

			fireEvent.click(screen.getByTestId('button-mantine'));

			await waitFor(() => {
				expect(screen.getByTestId('dialog-mui')).toHaveAttribute('data-open', 'true');
			});
		}

		it('deve abrir o dialog', async () => {
			await abrirDialog()
		});

		it('deve fechar o dialog', async () => {
			await abrirDialog()

			await waitFor(() => {
				expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
			});

			fireEvent.click(screen.getByTestId('cancel-button'));

			await waitFor(() => {
				expect(screen.getByTestId('dialog-mui')).toBeEnabled()
			});
		});

		it('deve usar a funcao confirmar', async () => {
			await abrirDialog()

			const nomeInput = screen.getByLabelText('Nome');
			const idadeInput = screen.getByLabelText('Idade');
			const celularInput = screen.getByLabelText('Celular');

			fireEvent.change(nomeInput, { target: { value: 'Seu Nome' } });
			fireEvent.change(idadeInput, { target: { value: '25' } });
			fireEvent.change(celularInput, { target: { value: '(12) 3456-7890' } });

			expect(nomeInput).toHaveValue('Seu Nome');
			expect(idadeInput).toHaveValue('25');
			expect(celularInput).toHaveValue('(12) 3456-7890');

			await act(async () => {
				fireEvent.click(screen.getByText('finalizar'));
			});

			await waitFor(() => {
				expect(screen.getByTestId('dialog-mui')).toBeEnabled()
			});
		});
	});
});
