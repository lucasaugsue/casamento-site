import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import ImagemDoCasal from '../screens/ImagemDoCasal';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */

describe('<ImagemDoCasal/>', () => {
	describe('Renderização', () => {
		test('deve renderizar ImagemDoCasal corretamente', async () => {
			const tree = renderer
			.create(<ImagemDoCasal/>)
			.toJSON();
			expect(tree).toMatchSnapshot();
      	});
  	});
	  
	describe('Interações', () => {
		beforeEach(() => {
			render(<ImagemDoCasal />);
		});

		it('deve renderizar os elementos da função textRotate corretamente', async () => {
			const letras = screen.queryAllByText(/^[L|u|c|a|s|&|V|i|c|t|ó|r|i|a]$/i);
			expect(letras).toHaveLength(14);
		});
	});
});