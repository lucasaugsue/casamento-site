import renderer from 'react-test-renderer';
import Header from '../screens/Header';

test('Renderiza Header corretamente', async () => {
    const tree = renderer
      .create(<Header/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});