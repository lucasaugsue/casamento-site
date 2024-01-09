import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PixDialog from '../components/PixDialog';

jest.mock('@mui/material/Dialog', () => {
    return {
        __esModule: true,
        default: ({ children, maxWidth, TransitionComponent, open, ...other }) => (
            <div>
                {open && (
                    <div 
                        {...other}
                        data-testid="pix-dialog"
                    >
                        <div style={{ maxWidth: maxWidth === 'lg' ? 'lg' : 'md' }}>
                            {TransitionComponent && <TransitionComponent>{children}</TransitionComponent>}
                        </div>
                    </div>
                )}
            </div>
        ),
    };
});

describe('<PixDialog/>', () => {

    describe('Renderização', () => {
        test('deve renderizar PixDialog corretamente', async () => {
            const handleClose = jest.fn();

            const tree = renderer
            .create(<PixDialog
                open={true} 
                handleClose={() => handleClose()} 
            />)
            .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interações', () => {
        it('deve iniciar com o dialog aberto', async () => {
            const handleClose = jest.fn();

            render(<PixDialog open={true} handleClose={() => handleClose()} />);

            await waitFor(() => {
                expect(screen.getByTestId('pix-dialog')).toBeInTheDocument(),
                expect(screen.getByTestId('pix-dialog')).toHaveAttribute('data-open', 'true')
            })
		});
    });

})
