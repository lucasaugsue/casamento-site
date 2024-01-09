import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SobreOCasal from '../screens/SobreOCasal';
import { extractToTime as realExtractToTime } from '../util/ExtractToTime';

jest.mock("../util/ExtractToTime", () => ({
	extractToTime: jest.fn(() => ({
		days: "246",
		hour: "16",
		min: "12",
		sec: "23",
	})),
}));

describe('<SobreOCasal/>', () => {

	describe('Renderização', () => {
		test('deve renderizar SobreOCasal corretamente', async () => {
			const tree = renderer
			.create(<SobreOCasal/>)
			.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});

	describe('Interações', () => {
		beforeEach(() => {
			render(<SobreOCasal />);
		});

		test('deve interagir corretamente com a função extractToTime', () => {
			expect(realExtractToTime).toHaveBeenCalled();

			expect(screen.getByText('Dias')).toBeInTheDocument();
			expect(screen.getByText('Horas')).toBeInTheDocument();
			expect(screen.getByText('Minutos')).toBeInTheDocument();
		});
	})
	
})