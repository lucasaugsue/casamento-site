import renderer from 'react-test-renderer';
import SobreOCasal from '../screens/SobreOCasal';

// Caso de teste atualizado com um Link para um endereço diferente
it('renderiza corretamente', () => {
    const tree = renderer
      .create(<SobreOCasal/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });