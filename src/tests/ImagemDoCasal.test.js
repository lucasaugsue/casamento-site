import renderer from 'react-test-renderer';
import ImagemDoCasal from '../screens/ImagemDoCasal';

test('Renderiza ImagemDoCasal corretamente', async () => {
    const tree = renderer
      .create(<ImagemDoCasal/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });