import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../screens/Header';

/**
 * @jest-environment jsdom
 */

describe('Header', () => {
	it('testar as funções dentro de Header', () => {
		render(<Header />);
	
		// Agora você pode usar getByTestId do @testing-library/react
		expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
	});
});

test('Renderiza Header corretamente', async () => {
    const tree = renderer
      .create(<Header/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});