import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import TabelaAdmin from '../screens/TabelaAdmin';
import mockApiRequest from '../util/mockApiRequest';

// Mock do @mui/material
jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material');

  return {
    ...originalModule,
    Select: jest.fn((props) => <div {...props} />),
    MenuItem: jest.fn((props) => <div {...props} />),
  };
});

// Mock do Dialog
jest.mock('@mui/material/Dialog');


// Mock do TablePagination
jest.mock('@mui/material/TablePagination', () => jest.fn((props) => <div {...props} />));


test('Renderiza TabelaAdmin corretamente', async () => {
  let tree;
  
  await act(async () => {
    const clientContext = {
      apiRequest: mockApiRequest, // Substitua pelo mock da função apiRequest
    };

    tree = renderer.create(
      <ClientContext.Provider value={clientContext}>
        <TabelaAdmin />
      </ClientContext.Provider>
    );
  });
  
  expect(tree.toJSON()).toMatchSnapshot();
});
