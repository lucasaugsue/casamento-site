import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import BasicPagination from '../components/BasicPagination';

jest.mock('@mui/material/Pagination', () => {
    return (props) => (
      	<div
			data-testid="pagination-text"
			onClick={props.onChange}
		>
			{props.page}
			{props.count}
      	</div>
    );
});

describe('<BasicPagination/>', () => {
    describe('Renderização', () => {
        test('deve renderizar BasicPagination corretamente', async () => {
			const handleChange = jest.fn();
			const tree = renderer.create(
				<BasicPagination page={1} count={10} handleChange={handleChange} />
			).toJSON();

			expect(tree).toMatchSnapshot();
		});
	});
    
	describe('Interações', () => {
		test('deve chamar handleChange ao clicar na paginação', async () => {
			const handleChange = jest.fn();
	
			render(<BasicPagination page={1} count={10} handleChange={handleChange} />);
	
			fireEvent.click(screen.getByTestId('pagination-text'));
			await waitFor(() => {
				expect(handleChange).toHaveBeenCalled();
			});
		});
	});
});
