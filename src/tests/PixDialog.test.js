import renderer from 'react-test-renderer';
import PixDialog from '../components/PixDialog';

// Define o mock para o Dialog
jest.mock('@mui/material/Dialog');

test('Renderiza PixDialog corretamente', async () => {
    const handleClose = jest.fn();

    const tree = renderer
	.create(<PixDialog
        open={true} 
        handleClose={() => handleClose()} 
	/>)
	.toJSON();
    expect(tree).toMatchSnapshot();
});