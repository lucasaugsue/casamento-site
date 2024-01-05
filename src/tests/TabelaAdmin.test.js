import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import TabelaAdmin from '../screens/TabelaAdmin';
import mockApiRequest from '../util/mockApiRequest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('@mui/material', () => {
	const originalModule = jest.requireActual('@mui/material');

	return {
		...originalModule,
		Select: jest.fn((props) => <div {...props} />),
		MenuItem: jest.fn((props) => <div {...props} />),
	};
});

jest.mock('@mui/material/Dialog');

jest.mock('@mui/material/TablePagination', () => jest.fn((props) => <div {...props} />));

describe('<TabelaAdmin/>', () => {
    describe('Renderização', () => {
        test('deve renderizar TabelaAdmin corretamente', async () => {
			let tree;
			
			await act(async () => {
				const clientContext = { apiRequest: mockApiRequest };

				tree = renderer.create(
				<ClientContext.Provider value={clientContext}>
					<TabelaAdmin />
				</ClientContext.Provider>
				);
			});
			
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});
	
    describe('Interações', () => {
		
	});
});
