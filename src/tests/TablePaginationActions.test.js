import renderer from 'react-test-renderer';
import TablePaginationActions from '../components/TablePaginationActionsComponent';

test('Renderiza TablePaginationActions corretamente', async () => {
    const tree = renderer
      .create(<TablePaginationActions/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});