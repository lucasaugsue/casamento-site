import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';
import ClientContext from '../contexts/ClientContext';
import TabelaAdmin from '../screens/TabelaAdmin';
import mockApiRequest from '../util/mockApiRequest';

jest.mock('@mui/material', () => {
	const React = require('react');
    const originalModule = jest.requireActual('@mui/material');

    return {
        ...originalModule,
        Select: jest.fn(({ children, onChange, ...props }) => {
            const [value, setValue] = React.useState(props.value);

            const handleChange = (e) => {
                setValue(e.target.value);
                onChange(e);
            };

            return (
                <select
                    data-select={value}
                    data-testid="select-table"
                    value={value}
                    onChange={handleChange}
                >
                    {children}
                </select>
            );
        }),
        MenuItem: jest.fn((props) => <option {...props} />)
    };
});


jest.mock('@mui/material/Dialog', () => {
	return {
		__esModule: true,
		default: ({ children, open, style, TransitionComponent, maxWidth, ...other }) => (
			<div>
			{open && (
				<div 
					{...other}
					data-open={open}
					data-testid="dialog-mui"
					style={{ maxWidth, ...style }}
				>
				<div>
					{children}
				</div>
				</div>
			)}
			</div>
		),
	};
});

const clientContext = { apiRequest: mockApiRequest };

describe('<TabelaAdmin/>', () => {
    describe('Renderização', () => {
        test('deve renderizar TabelaAdmin corretamente', async () => {
			let tree;
			
			await act(async () => {

				tree = renderer.create(
				<ClientContext.Provider value={clientContext}>
					<TabelaAdmin />
				</ClientContext.Provider>
				);
			});
			
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});
	
    describe('Interações', () => {
		beforeEach(async () => {
            await act(async () => {
				render(
					<ClientContext.Provider value={clientContext}>
						<TabelaAdmin />
					</ClientContext.Provider>
				);
			});
		});

		const selecionarTabela = async ({ table_name }) => {
			await act(async () => {
				fireEvent.change(screen.getByTestId('select-table'), { target: { value: table_name } });
			});
		
			await waitFor(() => {
				expect(screen.getByTestId('select-table')).toHaveAttribute('data-select', table_name);
			});
		}

		const confirmarRetorno = async ({ route, testId }) => {
			await waitFor(() => {
                expect(mockApiRequest).toHaveBeenCalledWith("GET", route);
            });
    
            await waitFor(() => {
                expect(screen.getAllByTestId(testId)).toHaveLength(2); 
            });
		}

		const abrirDialog = async () => {
			await waitFor(() => {
				expect(screen.getByTestId('button-cadastro')).toBeInTheDocument();
			});

			fireEvent.click(screen.getByTestId('button-cadastro'));

			await waitFor(() => {
				expect(screen.getByTestId('dialog-mui')).toHaveAttribute('data-open', 'true');
			});
		}

		it('deve selecionar uma tabela', async () => {
			await selecionarTabela({ table_name: 'Recados' })
			await selecionarTabela({ table_name: 'Lista de presença' })
		});
		
		it('deve testar o retorno das rotas tipo get', async () => {
			// troca de tabela para 'Recados'
			await selecionarTabela({ table_name: 'Recados' })
			await waitFor(() => confirmarRetorno({ route: '/recados/list', testId: 'item-recado' }));
			
			// troca de tabela para 'Lista de presença'
			await selecionarTabela({ table_name: 'Lista de presença' })
			await waitFor(() => confirmarRetorno({ route: '/confirmar-presenca/list', testId: 'item-confirmado' }));

			// troca de tabela para 'Presentes'
			await selecionarTabela({ table_name: 'Presentes' })
			await waitFor(() => confirmarRetorno({ route: '/presentes/list', testId: 'item-presente' }));
        });

		it('deve abrir o dialog', async () => {
			await abrirDialog()
		});

		it('deve usar a função createPresente', async () => {
			await abrirDialog();
		
			const nomeInput = screen.getByLabelText('Nome');
			const precoInput = screen.getByLabelText('Preço');
			const urlInput = screen.getByLabelText('Url da imagem');
			const informacoesInput = screen.getByLabelText('Mais informações');
			const descricaoInput = screen.getByLabelText('Descrição');
		
			fireEvent.change(nomeInput, { target: { value: 'Calphalon Conjunto de assadeiras antiaderentes, conjunto de 6 peças' } });
			fireEvent.change(precoInput, { target: { value: '494.50' } });
			fireEvent.change(urlInput, { target: { value: 'https://m.media-amazon.com/images/I/81SJ7sZHKYL._AC_UF894,1000_QL80_FMwebp_.jpg' } });
			fireEvent.change(informacoesInput, { target: { value: 'https://www.amazon.com.br/dp/B001BSX1EM?ref_=cm_sw_r_apan_dp_20ZZWBH7X76K0ENAKVDQ&language=pt-BR' } });
			fireEvent.change(descricaoInput, { target: { value: 'O núcleo de aço de calibre pesado não deforma e aquece uniformemente sem pontos quentes para que seus biscoitos e bolos saiam do forno perfeitamente e uniformemente dourados.' } });
		
			expect(nomeInput).toHaveValue('Calphalon Conjunto de assadeiras antiaderentes, conjunto de 6 peças');
			expect(precoInput).toHaveValue(494.50);
			expect(urlInput).toHaveValue('https://m.media-amazon.com/images/I/81SJ7sZHKYL._AC_UF894,1000_QL80_FMwebp_.jpg');
			expect(informacoesInput).toHaveValue('https://www.amazon.com.br/dp/B001BSX1EM?ref_=cm_sw_r_apan_dp_20ZZWBH7X76K0ENAKVDQ&language=pt-BR');
			expect(descricaoInput).toHaveValue('O núcleo de aço de calibre pesado não deforma e aquece uniformemente sem pontos quentes para que seus biscoitos e bolos saiam do forno perfeitamente e uniformemente dourados.');
		
			await act(async () => {
				await waitFor(() => {
					expect(screen.getByTestId('button-actions')).toBeInTheDocument();
				});
		
				fireEvent.click(screen.getByTestId('button-actions'));
			});
		
			await waitFor(() => {
				expect(screen.queryByTestId('dialog-mui')).not.toBeInTheDocument();
			});
		});
	});
});
