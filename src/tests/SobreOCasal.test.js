import renderer from 'react-test-renderer';
import SobreOCasal from '../screens/SobreOCasal';

test('Renderiza SobreOCasal corretamente', async () => {
    const tree = renderer
      .create(<SobreOCasal/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});