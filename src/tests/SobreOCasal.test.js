import renderer from 'react-test-renderer';
import SobreOCasal from '../screens/SobreOCasal';

// Mock para a função extractToTime
jest.mock("../util/ExtractToTime", () => ({
	extractToTime: jest.fn(() => ({
		days: "246",
		hour: "16",
		min: "12",
		sec: "23",
	})),
}));

test('Renderiza SobreOCasal corretamente', async () => {
    const tree = renderer
      .create(<SobreOCasal/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});