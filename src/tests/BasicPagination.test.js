import renderer from 'react-test-renderer';
import BasicPagination from '../components/BasicPagination';

jest.mock('@mui/material/Pagination', () => {
    return (props) => (
      <div onClick={props.onChange}>
        {props.page}
        {props.count}
      </div>
    );
});

it('renderiza corretamente', () => {
    const handleChange = jest.fn();
    const tree = renderer.create(
        <BasicPagination page={1} count={10} handleChange={handleChange} />
    ).toJSON();

    // Verifica se o snapshot corresponde ao esperado
    expect(tree).toMatchSnapshot();
});
