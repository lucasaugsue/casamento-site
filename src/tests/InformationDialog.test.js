import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';
import InformationDialog from '../components/InformationDialog';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
 * @jest-environment jsdom
 */

jest.mock('@mui/material/Dialog', () => {
	return {
		__esModule: true,
		default: ({ children, open, style, TransitionComponent, maxWidth, ...other }) => (
			<div>
			{open && (
				<div 
					{...other}
					data-testid="dialog-mui"
					style={{ maxWidth, ...style }}
				>
				<div>
					{children}
				</div>
				</div>
			)}
			</div>
		),
	};
});
 
describe('<InformationDialog/>', () => {
    describe('Renderização', () => {

        test('deve renderizar InformationDialog corretamente', async () => {
			const handleClose = jest.fn();
			const handleFunction = jest.fn();

			const tree = renderer
			.create(<InformationDialog
				open={true} 
				loading={false}
				title={"algum title"} 
				textButton={"cancelar"} 
				textFunction={"confirmar"}
				textContent={"algum texto"} 
				handleClose={() => handleClose()} 
				handleFunction={() => handleFunction()}
			/>)
			.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});

	describe('Interações', () => {
		const handleClose = jest.fn();
		const handleFunction = jest.fn();
		
		beforeEach(async () => {
			render(
				<InformationDialog
					open={true}
					loading={false}
					title="algum title"
					textButton="cancelar"
					textFunction="confirmar"
					textContent="algum texto"
					handleClose={() => handleClose()}
					handleFunction={() => handleFunction()}
				/>
			);
        });

		test('deve iniciar com o diálogo aberto', async () => {
			await waitFor(() => {
				expect(screen.getByTestId('dialog-mui')).toBeInTheDocument();
				expect(screen.getByTestId('dialog-mui')).toHaveAttribute('data-open', 'true');
			});
		});
		
    });
});