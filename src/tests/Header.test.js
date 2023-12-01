import renderer from 'react-test-renderer';
import Header from '../screens/Header';

// Caso de teste atualizado com um Link para um endereço diferente
it('renderiza corretamente', () => {
    const tree = renderer
      .create(<Header/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });