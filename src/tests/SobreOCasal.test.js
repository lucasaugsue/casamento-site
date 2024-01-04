import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import SobreOCasal from '../screens/SobreOCasal';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { extractToTime as realExtractToTime } from '../util/ExtractToTime'
import moment from "moment-timezone";

/**
 * @jest-environment jsdom
 */

// Mock para a função extractToTime
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
			// Verifica se a função extractToTime foi chamada
			expect(realExtractToTime).toHaveBeenCalled();

			// Pode adicionar mais verificações conforme necessário
			expect(screen.getByText('Dias')).toBeInTheDocument();
			expect(screen.getByText('Horas')).toBeInTheDocument();
			expect(screen.getByText('Minutos')).toBeInTheDocument();
		});
	})
	
})