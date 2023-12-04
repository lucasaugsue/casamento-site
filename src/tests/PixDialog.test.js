import renderer from 'react-test-renderer';
import PixDialog from '../components/PixDialog';

// Caso de teste atualizado com um Link para um endereço diferente
it('renderiza corretamente', () => {
    const tree = renderer
      .create(<PixDialog/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });