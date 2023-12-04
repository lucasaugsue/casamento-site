import renderer from 'react-test-renderer';
import ImagemDoCasal from '../screens/ImagemDoCasal';

// Caso de teste atualizado com um Link para um endereço diferente
it('renderiza corretamente', () => {
    const tree = renderer
      .create(<ImagemDoCasal/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });