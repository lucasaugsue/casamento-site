import React from 'react';
import ClientContext from '../../src/contexts/ClientContext';
import { Button, Input } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Delete, Edit } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Skeleton, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip, tableCellClasses } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import InformationDialog from "../components/InformationDialog";
import TablePaginationActions from "../components/TablePaginationActionsComponent";
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
                height={"8vh"} 
                width={"auto"} 
                animation="wave"
            />
            {[1,2,3,4,5].map((item, index) => {
                return <Skeleton 
                    key={`${item};;${index}`}
                    style={{margin: "2vh 1vw"}}
                    variant="rectangular" 
                    height={"12vh"} 
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
    const [selectTable, setSelectTable] = React.useState("Presentes")
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
        apiRequest("PATCH", `/presentes/edit/${data.id}`, {...data})
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
        apiRequest("DELETE", `/presentes/delete/${data.id}`, {...data})
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

    // get recados 
    const [recados, setRecados] = React.useState([]);

    const getRecados = () => {
        setLoading(true)
        apiRequest("GET", "/recados/list")
        .then((res) => {
            setRecados(res)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    const createRecado = () => {
        setLoadingButton(true)
        apiRequest("POST", "/recados/create", {...data})
        .then((res) => {
            getRecados()
            setLoadingButton(false)
            handleClose()
        })
        .catch((err) => {
            setLoadingButton(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    const editRecado = () => {
        setLoadingButton(true)
        apiRequest("PATCH", `/recados/edit/${data.id}`, {...data})
        .then((res) => {
            getRecados()
            setLoadingButton(false)
            handleClose()
        })
        .catch((err) => {
            setLoadingButton(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }

    const deleteRecado = () => {
        setLoadingButton(true)
        apiRequest("DELETE", `/recados/delete/${data.id}`, {...data})
        .then((res) => {
            getRecados()
            setLoadingButton(false)
            handleCloseDelete()
        })
        .catch((err) => {
            setLoadingButton(false)
            showNotification({message: err.message, color: 'red', autoClose: true})
        });
    }


    React.useEffect(() => {
        getRecados()
        getPresentes()
    }, []);

    // parte da lista que vai ser renderizada na tabela

    const getRowsFiltered = () => {
        let list

        if(selectTable === "Presentes") list = presentes
        else if(selectTable === "Recados") list = recados

        //filtro por nome
        var rowsFilteredByName = text.length > 1
        ? list.filter((i) =>
            i.nome.toLowerCase().includes(text.toLowerCase())
        )
        : list;

        setRowsFiltered([
            ...rowsFilteredByName.sort((a,b) => a.created < b.created ? 1 : -1)
        ])
    }

    React.useEffect(() => {
        getRowsFiltered()
        // eslint-disable-next-line
    }, [selectTable, recados, presentes, text])

    // parte do return DOM
    
    const renderTableHead = () => {
        const listHeadPresentes = [
            "ID", "Nome", "Preço", "Descrição", "Imagem", "Mais informações", "Editar", "Deletar"
        ]
    
        const listHeadRecados = [
            "ID", "Nome", "Email", "Recado", "Editar", "Deletar"
        ]

        let list

        if(selectTable === "Presentes") list = listHeadPresentes
        else if(selectTable === "Recados") list = listHeadRecados

        return <TableRow>
            {list.map((item, index) => (
                <StyledTableCellHead 
                    key={`${item};;${index}`} 
                    align="center"
                > {item} </StyledTableCellHead>
            ))}
        </TableRow>
    }

    const renderTableBody = (row) => {

        const bodyPresentes = () =>  ( 
            <StyledTableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <StyledTableCell align="center"> {row.id} </StyledTableCell>
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
        )

        const bodyRecados = () => (
            <StyledTableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <StyledTableCell align="center"> {row.id} </StyledTableCell>
                <StyledTableCell align="center"> {row.nome} </StyledTableCell>
                <StyledTableCell align="center"> {row.email} </StyledTableCell>
                <StyledTableCell align="center">
                    {
                        (row.recado && row.recado.length > 30)
                        ?`${row.recado.slice(0, 24)}...`
                        :row.recado
                    } 
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
        )

        if(selectTable === "Presentes") return bodyPresentes()
        else if(selectTable === "Recados") return bodyRecados()
    }

    const handleTitle = () => {
        let title

        if(selectTable === "Presentes") {
            if(edit) title = "Editar presente" 
            else title = "Cadastro de presente"
        
        }  else if(selectTable === "Recados") {

            if(edit) title = "Editar recado" 
            else title = "Cadastro de recado"
        }

        return title
    }

    const renderDialogContent = () => {

        const contentPresentes = () => (
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
        )

        const contentRecados = () => (
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
                        type="text"
                        name="email"
                        label="Email"
                        value={{...data}.email ? {...data}.email : ""}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        type="text"
                        name="recado"
                        label="Recado"
                        value={{...data}.recado ? {...data}.recado : ""}
                        onChange={(e) => handleChange(e)}
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>
        )

        if(selectTable === "Presentes") return contentPresentes()
        else if(selectTable === "Recados") return contentRecados()
    }

    const handleFunction = () => {
        if(selectTable === "Presentes") {
            if(edit) editPresente() 
            else createPresente()

        }  else if(selectTable === "Recados") {
            if(edit) editRecado() 
            else createRecado()
        }
    }

    const handleDelete = () => {
        if(selectTable === "Presentes") deletePresente()
        else if(selectTable === "Recados") deleteRecado()
    }

    return <section className={styles.container} id="tabela">
        <Grid style={{marginTop:'3vh'}} container spacing={2}>
            <div className={styles.whiteBox}>
                <Grid 
                    container 
                    spacing={2}
                    alignContent="center"
                    flexDirection="row"
                    alignItems="center"
                    className={styles.containerActions}
                >
                    <Grid item md={6} xs={12}>
                        <Input
                            size="md"
                            radius="sm"
                            value={text}
                            name="text"
                            disabled={
                                (selectTable === "Presentes") ? false : true
                                // será q vale a pena deixar disabled?
                                // vou ter que melhorar esse if else caso tenhao mais de 2 variaveis
                            }
                            className={styles.input}
                            placeholder="Buscar por nome"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
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
                    
                    <Grid item md={3} xs={12}>
                        <FormControl
                            fullWidth
                            variant="outlined"
                        >
                            <InputLabel>A tabela que deseja ver</InputLabel>
                            <Select
                                fullWidth
                                value={selectTable}
                                label="A tabela que deseja ver"
                                onChange={(e) => {
                                    setText("")
                                    setSelectTable(e.target.value)
                                }}
                            >
                                {[
                                    {id: 1, nome: "Presentes"},
                                    {id: 2, nome: "Recados"},
                                    {id: 3, nome: "Lista de presença"}
                                ].map((item, index) => 
                                    <MenuItem 
                                        key={`${item.id};;${index}`}
                                        value={item.nome}
                                    > {item.nome} </MenuItem> 
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <TableContainer 
                    className={styles.containerTable}
                    component={Paper}
                >
                    {
                        loading 
                        ? loadingTable()
                        : <Table 
                            style={{width: "100%"}} 
                            aria-label="custom pagination table"
                        >
                            <TableHead>
                                {renderTableHead()}
                            </TableHead>
                            <TableBody>
                                {
                                    (rowsPerPage > 0
                                        ? [...rowsFiltered].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : [...rowsFiltered]
                                    || [] ).map((row) => renderTableBody(row)
                                )}
                                {emptyRows > 0 && (
                                    <StyledTableRow 
                                        style={{ 
                                            width: '100%', 
                                            height: `${16 * emptyRows}vh` 
                                        }}
                                    >
                                        <StyledTableCell colSpan={10} />
                                    </StyledTableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        colSpan={10}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        count={rowsFiltered.length}
                                        onPageChange={handleChangePage}
                                        ActionsComponent={TablePaginationActions}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
            <DialogTitle> {handleTitle()} </DialogTitle>
            <DialogContent> {renderDialogContent()} </DialogContent>
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
                    onClick={() => handleFunction()}
                    gradient={{ from: '#f16352', to: '#ec8c69', deg: 35 }}
                >
                    {edit ? "Editar" : "Cadastrar"}
                </Button>
            </DialogActions>
        </Dialog>
    
        <InformationDialog
            open={openDelete} 
            handleClose={() => handleCloseDelete()} 
            title={"Deletar item"} 
            textContent={"O item sera permanentemente removido do banco de dados, você tem certeza que deseja excluir?"} 
            textButton={"cancelar"} 
            loading={loadingButton}
            handleFunction={() => handleDelete()}
            textFunction={"deletar"}
        />
    </section>
}