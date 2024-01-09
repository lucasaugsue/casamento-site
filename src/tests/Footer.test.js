import '@testing-library/jest-dom';
import Footer from '../screens/Footer';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import mockApiRequest from '../util/mockApiRequest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('<Footer/>', () => {
    describe('Renderização', () => {
        test('deve renderizar Footer corretamente', async () => {
            let tree;
        
            await act(async () => {
                const clientContext = { apiRequest: mockApiRequest };

                tree = renderer.create(
                    <ClientContext.Provider value={clientContext}>
                        <Footer />
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
                    <Footer />
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
    });
});