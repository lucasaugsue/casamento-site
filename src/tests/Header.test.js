import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../screens/Header';

/**
 * @jest-environment jsdom
 */

describe('<Header/>', () => {
	describe('Renderização', () => {
		test('deve renderizar Header corretamente', async () => {
			const tree = renderer.create(<Header />).toJSON();
			expect(tree).toMatchSnapshot();
		});
	});

	describe('Interações', () => {
		beforeEach(() => {
			render(<Header />);
		});

		it('deve iniciar com o menu fechado', () => {
			expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
			expect(screen.getByTestId('menu-icon')).toHaveAttribute('data-open', 'false');
		});

		it('deve abrir o menu ao clicar no ícone do menu', async () => {
			fireEvent.click(screen.getByTestId('menu-icon'));
			await waitFor(() => {
				expect(screen.getByTestId('menu-icon')).toHaveAttribute('data-open', 'true');
			});
		});

		it('deve fechar o menu ao clicar na letra "L"', async () => {
			fireEvent.click(screen.getByTestId('menu-icon'));
			await waitFor(() => {
				fireEvent.click(screen.getByText('L'));
				expect(screen.getByText('L')).toHaveAttribute('data-open', 'false');
			});
		});

		it('deve abrir o menu ao clicar no ícone e fechar ao clicar em "Início"', async () => {
			fireEvent.click(screen.getByTestId('menu-icon'));
			await waitFor(() => {
				expect(screen.getByTestId('menu-icon')).toHaveAttribute('data-open', 'true');
			});

			fireEvent.click(screen.getByText('Início'));
			await waitFor(() => {
				expect(screen.getByTestId('menu-icon')).toHaveAttribute('data-open', 'false');
			});
		});
	});
});
