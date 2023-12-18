import renderer from 'react-test-renderer';
import PixDialog from '../components/PixDialog';

test('Renderiza PixDialog corretamente', async () => {
    const tree = renderer
      .create(<PixDialog/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});