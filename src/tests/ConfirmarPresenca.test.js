import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import ConfirmarPresenca from '../screens/ConfirmarPresenca';
import mockApiRequest from '../util/mockApiRequest';

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
				expect(screen.queryByTestId('dialog-mui')).not.toBeInTheDocument();
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
