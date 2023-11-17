import React from 'react';
import ClientContext from '../../src/contexts/ClientContext';

import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';
import { styled } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, tableCellClasses, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TablePaginationActions from "../components/TablePaginationActionsComponent";
import ReportsDashPaper from "../components/ReportsDashPaper";
// import { formatCurrency } from '../util/Util';
import styles from './TabelaAdmin.module.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function TabelaAdmin() {
    const { apiRequest } = React.useContext(ClientContext);

    const [data, setData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    
    const [text, setText] = React.useState("")
    const [selectValueType, setSelectValueType] = React.useState("Todos")
    const [selectValueCategory, setSelectValueCategory] = React.useState("Todos")

    const [rows, setRows] = React.useState([]);
    const [rowsFiltered, setRowsFiltered] = React.useState([]);

    //início relacionado ao passar página
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsFiltered.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return <section className={styles.container} id="tabela">
        <Grid style={{marginTop:'3vh'}} container spacing={2}>
            {/* <Grid item md={4} xs={12}>
                <ReportsDashPaper 
                    title={"Saldo"} 
                    background={"#64b084"} 
                    bodyTitle={"algum title"}
                    // bodyTitle={formatCurrency(0)}
                    bodySubtitle={"Total do saldo"} 
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <ReportsDashPaper 
                    title={"Gastos"} 
                    background={"#eb5757"} 
                    bodyTitle={"algum title"}
                    // bodyTitle={formatCurrency(0)}
                    bodySubtitle={"Total dos gastos"} 
                />
            </Grid>
            <Grid item md={4} xs={12}>
                <ReportsDashPaper 
                    title={"Somatória"} 
                    background={"#057dc1"}
                    bodyTitle={"algum title"}
                    // bodyTitle={formatCurrency(0)}
                    bodySubtitle={"Total do saldo e gasto"} 
                />
            </Grid> */}
            <Grid item xs={12}></Grid>
            <div className={styles.whiteBox}>
                <Grid style={{marginTop:'1vh'}} container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            value={text}
                            name="titulo"
                            // variant="standard"
                            label="Busca por título"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <FormControl
                            fullWidth
                            // variant="outlined"
                        >
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                fullWidth
                                label="Categoria"
                                value={selectValueCategory}
                                onChange={(e) => setSelectValueCategory(e.target.value)}
                            >
                                {/* {listCategory.map((item, index) => 
                                    <MenuItem 
                                        key={`${item.id};;${index}`}
                                        value={item.nome}
                                    > {item.nome} </MenuItem> 
                                )} */}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <FormControl
                            fullWidth
                            // variant="outlined"
                        >
                            <InputLabel>Tipo</InputLabel>
                            <Select
                                fullWidth
                                label="Tipo"
                                value={selectValueType}
                                onChange={(e) => setSelectValueType(e.target.value)}
                            >
                                {[
                                    {id: 1, nome: "Todos"},
                                    {id: 2, nome: "Ganhos"},
                                    {id: 3, nome: "Despesas"}
                                ].map((item, index) => 
                                    <MenuItem 
                                        key={`${item.id};;${index}`}
                                        value={item.nome}
                                    > {item.nome} </MenuItem> 
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={2} xs={12}>
                        <Button
                            fullWidth
                            variant="contained" 
                            startIcon={<AddIcon />}
                            className={styles.buttontr}
                            onClick={() => {
                                handleClickOpen()
                            }} 
                        >
                            Cadastrar Transação
                        </Button>
                    </Grid>
                </Grid>


                <TableContainer style={{margin: "3vh", minHeight: '50vh'}} component={Paper}>
                    <Table style={{width: "100%"}} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Título</StyledTableCell>
                                <StyledTableCell align="center">Tipo</StyledTableCell>
                                <StyledTableCell align="center">Categoria</StyledTableCell>
                                <StyledTableCell align="center">Valor</StyledTableCell>
                                <StyledTableCell align="center">Data</StyledTableCell>
                                <StyledTableCell align="center">Editar</StyledTableCell>
                                <StyledTableCell align="center">Deletar</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (rowsPerPage > 0
                                    ? rowsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rowsFiltered
                                ).map((row) => (
                                <StyledTableRow
                                    key={row.titulo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <StyledTableCell component="th" scope="row"> {row.titulo} </StyledTableCell>
                                <StyledTableCell align="center">{row.tipo}</StyledTableCell>
                                <StyledTableCell align="center">{row.categoria}</StyledTableCell>
                                <StyledTableCell align="center">{formatCurrency(row.valor)}</StyledTableCell>
                                <StyledTableCell align="center">{row.data}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => {
                                                setEdit(true) 
                                                setData({...row})
                                                handleClickOpen()
                                            }}
                                        >
                                            <Edit fontSize="medium" />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip title="Deletar">
                                        <IconButton onClick={() => handleTransactionDelete(row)}>
                                            <Delete fontSize="medium" />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {emptyRows > 0 && (
                                <StyledTableRow style={{ height: 73 * emptyRows }}>
                                    <StyledTableCell colSpan={6} />
                                </StyledTableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={7}
                                    count={rowsFiltered.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                        'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </Grid>
    </section>
}