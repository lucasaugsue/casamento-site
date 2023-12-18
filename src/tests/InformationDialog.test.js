import renderer from 'react-test-renderer';
import InformationDialog from '../components/InformationDialog';

// Define o mock para o Dialog
jest.mock('@mui/material/Dialog');

test('Renderiza InformationDialog corretamente', async () => {
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