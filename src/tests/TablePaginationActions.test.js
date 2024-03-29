import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import TablePaginationActions from '../components/TablePaginationActionsComponent';

describe('<TablePaginationActions/>', () => {
    describe('Renderização', () => {
        test('deve renderizar TablePaginationActions corretamente', async () => {
			const tree = renderer
				.create(<TablePaginationActions/>)
				.toJSON();
			expect(tree).toMatchSnapshot();
		});	
	});	

    describe('Interações', () => {
		test('deve chamar onPageChange ao clicar no botão de primeira página', async () => {
			const onPageChangeMock = jest.fn();
			render(
				<TablePaginationActions
					count={10}
					page={2}
					rowsPerPage={5}
					onPageChange={onPageChangeMock}
				/>
			);
	  
			fireEvent.click(screen.getByLabelText('first page'));
	  
			await waitFor(() => {
			  	expect(onPageChangeMock).toHaveBeenCalledWith(expect.anything(), 0);
			});
		});
	});	
});