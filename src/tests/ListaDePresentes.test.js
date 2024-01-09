import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import ListaDePresentes from '../screens/ListaDePresentes';
import mockApiRequest from '../util/mockApiRequest';

jest.mock('../components/BasicPagination', () => {
    return jest.fn((props) => (
        <div data-testid="mocked-pagination">
            {props.page}
            {props.count}
            <button data-testid="pagination-button" onClick={() => props.handleChange({}, props.page + 1)} />
        </div>
    ));
});  

describe('<ListaDePresentes/>', () => {
    describe('Renderização', () => {
        test('deve renderizar ListaDePresentes corretamente', async () => {
            let tree;
        
            await act(async () => {
                const clientContext = { apiRequest: mockApiRequest };

                tree = renderer.create(
                    <ClientContext.Provider value={clientContext}>
                        <ListaDePresentes />
                    </ClientContext.Provider>
                );
            });
        
            expect(tree.toJSON()).toMatchSnapshot();
        });
    });

    describe('Interações', () => {
        const clientContext = { apiRequest: mockApiRequest };

        beforeEach(async () => {
            await act(async () => {
                render(<ClientContext.Provider value={clientContext}>
                    <ListaDePresentes />
                </ClientContext.Provider>);
            });
        });

        it('deve testar o retorno de getPresentes', async () => {
            await waitFor(() => {
                expect(mockApiRequest).toHaveBeenCalledWith("GET", "/presentes/list");
            });
    
            await waitFor(() => {
                expect(screen.getAllByTestId('item-presente')).toHaveLength(2); 
            });
        });

        it('deve testar a paginação', async () => {
            await waitFor(() => {
                expect(screen.getByTestId('mocked-pagination')).toBeInTheDocument();
            });
        
            expect(screen.getByTestId('mocked-pagination')).toHaveTextContent('11');
        
            fireEvent.click(screen.getByTestId('pagination-button'));
            await waitFor(() => {
                expect(screen.getByTestId('mocked-pagination')).toHaveTextContent('21');
            });
        });
    });
});