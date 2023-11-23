import React from 'react';
import ClientContext from '../../src/contexts/ClientContext';

import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';
import { styled } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mantine/core';
import { Skeleton, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, tableCellClasses, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TablePaginationActions from "../components/TablePaginationActionsComponent";
import ReportsDashPaper from "../components/ReportsDashPaper";
import InformationDialog from "../components/InformationDialog";
import styles from './TabelaAdmin.module.css';

const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#a9a39e',
        // background: 'linear-gradient(180deg, #525775, #bea181)',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

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

const formatReais = (value) => {
    return `R$ ${parseFloat(value ? value : 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}`
}

const loadingTable = () => {
    return (
        <div>
            <Skeleton 
                style={{margin: "2vh 1vw"}}
                variant="rectangular" 
                height={"4vh"} 
                width={"auto"} 
                animation="wave"
            />
            {[1,2,3,4,5].map((item, index) => {
                return <Skeleton 
                    style={{margin: "2vh 1vw"}}
                    variant="rectangular" 
                    height={"6vh"} 
                    width={"auto"} 
                    animation="wave"
                />
            })}
        </div>
    )
}

export default function TabelaAdmin() {
    const { apiRequest } = React.useContext(ClientContext);

    const [data, setData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    
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

    const handleChange = (e) => setData(params => ({
        ...params, [e.target.name]: e.target.value
    }))

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setData({})
        setEdit(false)
        setOpen(false);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setData({})
        setOpenDelete(false);
    };

    // get presentes
    const [presentes, setPresentes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const [loadingButton, setLoadingButton] = React.useState(false);

    const getPresentes = () => {
        setLoading(true)
        apiRequest("GET", "/presentes/list")
        .then((res) => {
            setPresentes(res)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    const createPresente = () => {
        setLoadingButton(true)
        apiRequest("POST", "/presentes/create", {...data})
        .then((res) => {
            getPresentes()
            setLoadingButton(false)
            handleClose()
        })
        .catch((err) => {
            setLoadingButton(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    const editPresente = () => {
        setLoadingButton(true)
        apiRequest("PATCH", `/presentes/edit/${data.key}`, {...data})
        .then((res) => {
            getPresentes()
            setLoadingButton(false)
            handleClose()
        })
        .catch((err) => {
            setLoadingButton(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    const deletePresente = () => {
        setLoadingButton(true)
        apiRequest("DELETE", `/presentes/delete/${data.key}`, {...data})
        .then((res) => {
            getPresentes()
            setLoadingButton(false)
            handleCloseDelete()
        })
        .catch((err) => {
            setLoadingButton(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    React.useEffect(() => {
        getPresentes()
    }, []);

    const getRowsFiltered = () => {
        //filtro por título
        var rowsFilteredByName = text.length > 1
        ? rows.filter((i) =>
            i.nome.toLowerCase().includes(text.toLowerCase())
        )
        : rows;

        //filtro por tipo
        // var rowsFilteredByType = selectValueType !== "Todos"
        // ? rowsFilteredByTitle.filter((i) => i.tipo === selectValueType)
        // : rowsFilteredByTitle;

        //filtro por categoria
        // var rowsFilteredByCategory = selectValueCategory !== "Todos"
        // ? rowsFilteredByType.filter((i) => i.categoria === selectValueCategory)
        // : rowsFilteredByType;

        // getFinancialData(rowsFilteredByCategory)

        setRowsFiltered([
            ...rowsFilteredByName.sort((a,b) => a.created < b.created ? 1 : -1)
            // ...rowsFilteredByCategory.sort((a,b) => a.data < b.data ? 1 : -1)
        ])
    }

    React.useEffect(() => {
        getRowsFiltered()
        // eslint-disable-next-line
    }, [rows, text])

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
                <Grid 
                    container 
                    spacing={2}
                    className={styles.containerActions}
                >

                    <Grid item md={4} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            value={text}
                            name="titulo"
                            // variant="standard"
                            label="Busca por nome"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        {/* <FormControl
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
                                {listCategory.map((item, index) => 
                                    <MenuItem 
                                        key={`${item.id};;${index}`}
                                        value={item.nome}
                                    > {item.nome} </MenuItem> 
                                )}
                            </Select>
                        </FormControl> */}
                    </Grid>

                    <Grid item md={3} xs={12}>
                        {/* <FormControl
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
                        </FormControl> */}
                    </Grid>

                    <Grid item md={2} xs={12}>
                        <Button
                            fullWidth
                            radius="sm"
                            variant="gradient"
                            gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                            className={styles.buttontr}
                            onClick={() => {
                                handleClickOpen()
                            }} 
                        >
                            Cadastrar
                        </Button>
                    </Grid>
                </Grid>


                <TableContainer 
                    className={styles.containerTable}
                    component={Paper}
                >
                    {
                        loading 
                        ? <Table style={{width: "100%"}} aria-label="custom pagination table">
                            {loadingTable()}
                        </Table> 
                        : <Table style={{width: "100%"}} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCellHead align="center">Key</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Nome</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Preço</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Descrição</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Imagem</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Mais informações</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Editar</StyledTableCellHead>
                                    <StyledTableCellHead align="center">Deletar</StyledTableCellHead>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (rowsPerPage > 0
                                        // ? rowsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        // : rowsFiltered
                                        ? [...presentes].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : [...presentes]
                                    || [] ).map((row) => (
                                    <StyledTableRow
                                        key={row.key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <StyledTableCell align="center"> {row.key} </StyledTableCell>
                                    <StyledTableCell align="center"> {row.nome} </StyledTableCell>
                                    <StyledTableCell align="center"> {formatReais(parseFloat(row.preco))} </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {
                                            (row.descricao && row.descricao.length > 30)
                                            ?`${row.descricao.slice(0, 24)}...`
                                            :row.descricao
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <img
                                            src={row.url}
                                            alt={`imagem ${row.nome}`}
                                            className={styles.imagem}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <a
                                            target="_blank"
                                            href={row.mais_informacoes}
                                        >
                                            Link das informações
                                        </a>
                                    </StyledTableCell>
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
                                            <IconButton onClick={() => {
                                                setData({...row})
                                                handleOpenDelete()
                                            }}>
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
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    }
                </TableContainer>
            </div>
        </Grid>

        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {edit ? "Editar presente" : "Cadastro de presente"}
            </DialogTitle>
            <DialogContent>

                <Grid 
                    container 
                    spacing={2}
                >
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="nome"
                            label="Nome"
                            value={{...data}.nome ? {...data}.nome : ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            name="preco"
                            label="Preço"
                            value={{...data}.preco ? {...data}.preco : ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="url"
                            label="Url da imagem"
                            value={{...data}.url ? {...data}.url : ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="mais_informacoes"
                            label="Mais informações"
                            value={{...data}.mais_informacoes ? {...data}.mais_informacoes : ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            name="descricao"
                            label="Descrição"
                            value={{...data}.descricao ? {...data}.descricao : ""}
                            onChange={(e) => handleChange(e)}
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>


            </DialogContent>
            <DialogActions style={{
                padding: "0.5vh 1.5vw 2vh 0"
            }}>
                <Button
                    color="red" 
                    variant="outline"
                    onClick={handleClose}
                > Fechar </Button>
                <Button 
                    radius="sm"
                    variant="gradient"
                    loading={loadingButton}
                    gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                    onClick={
                        edit
                        ? () => editPresente()
                        : () => createPresente()
                    }
                >
                    {edit ? "Editar" : "Cadastrar"}
                </Button>
            </DialogActions>
        </Dialog>
    
        <InformationDialog
            open={openDelete} 
            handleClose={() => handleCloseDelete()} 
            title={"Deletar presente"} 
            textContent={"O produto sera permanentemente removido do banco de dados, você tem certeza que deseja excluir?"} 
            textButton={"cancelar"} 
            loading={loadingButton}
            handleFunction={() => deletePresente()}
            textFunction={"deletar"}
        />
    </section>
}