import { Box, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close"
import { createTodo, deleteTodo, showTodo, updateTodo } from "@/features/todo/todoSlice";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import TurnedInOutlinedIcon from '@mui/icons-material/TurnedInOutlined';
import Navbar from "../Navbar/Navbar";


interface Todo {
    id: string;
    title: string;
    status: boolean;
}

const TodoList = () => {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'title', name: 'Title' },
        { id: 'status', name: 'Status' },
        { id: 'action', name: 'Actions' }
    ]

    const dispatch = useDispatch();
    const allTodos = useSelector((state: { todo: { allTodos: Todo[] } }) => state.todo.allTodos);
    const loading = useSelector((state: { todo: { loading: boolean } }) => state.todo.loading);

    useEffect(() => {
        //@ts-ignore
        dispatch(showTodo());
    }, [dispatch]);

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(false);
    const [isedit, iseditchange] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [titleDialog, setTitleDialog] = useState('Add Todo');

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        clearState()
        setDialogOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todoData = { title };
        if (isedit) {
            //@ts-ignore
            dispatch(updateTodo({ id, ...todoData }));
        } else {
            //@ts-ignore
            dispatch(createTodo(todoData));
        }

        closeDialog();
    };

    const handleEdit = (id: string, title: string) => {
        setId(id);
        setTitle(title);
        setStatus(status);
        setTitleDialog('Edit Todo');
        iseditchange(true);
        openDialog();
    };

    const handleRemove = (id: string) => {
        if (window.confirm('Do you want to remove?')) {
            //@ts-ignore
            dispatch(deleteTodo(id));
        }
    };
    const handleStatusChange = (id: string, status: boolean) => {
        //@ts-ignore
        dispatch(updateTodo({ id, status }));
    };

    const clearState = () => {
        setId('');
        setTitle('');
        setStatus(false);
        setTitleDialog('Add Todo');
        iseditchange(false);
    };


    return (
        <>
            <Navbar />
            <Box >
                {loading ? <h2>Loading...</h2> :
                    <>
                        <Typography variant="body1">{allTodos.length === 0 && 'No todos available. Click "Add New" to create a todo.'}</Typography>
                        <Box style={{ margin: '2%' }}>
                            <Button onClick={openDialog} variant="contained" color="success" endIcon={<AddCircleSharpIcon />}>Add New</Button>
                        </Box>
                        {allTodos.length > 0 && (
                            <Paper sx={{ margin: '1%' }}>
                                <Box style={{ margin: '2%' }}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow style={{ backgroundColor: '#607d8b' }}>
                                                    {columns.map((column) =>
                                                        <TableCell key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                                                    )}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {allTodos
                                                    .map((row, i) => {
                                                        return (
                                                            <TableRow key={i}>
                                                                <TableCell sx={{ width: '15%' }}>{row.id}</TableCell>
                                                                <TableCell sx={{ width: '35%', wordWrap: 'break-word' }}>{row.title}</TableCell>
                                                                <TableCell sx={{ width: '20%' }}>
                                                                    <FormControlLabel
                                                                        control={<Switch checked={row.status} onChange={() => handleStatusChange(row.id, !row.status)} color="success" />}
                                                                        label={row.status ? 'Completed' : 'Pending'}
                                                                    />
                                                                </TableCell>
                                                                <TableCell sx={{ width: '20%' }}>
                                                                    <Button onClick={() => handleEdit(row.id, row.title)} variant="contained" style={{ backgroundColor: '#009688' }} sx={{ marginRight: '8px' }} endIcon={<SyncAltIcon />}>Edit</Button>
                                                                    <Button onClick={() => handleRemove(row.id)} variant="contained" color="error" endIcon={<DeleteForeverIcon />}>Delete</Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Paper>
                        )}
                        <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                            <DialogTitle>
                                <span>{titleDialog}</span>
                                <IconButton style={{ float: 'right' }} onClick={closeDialog}><CloseIcon /></IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={2} margin={2}>
                                        <TextField required value={title} onChange={e => setTitle(e.target.value)} variant="outlined" label="Title" />
                                        <Button variant="contained" type="submit" color="success" endIcon={<TurnedInOutlinedIcon />}>Submit</Button>
                                    </Stack>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </>
                }
            </Box>
        </>
    );
}

export default TodoList;
