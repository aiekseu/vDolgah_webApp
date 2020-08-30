import React, {  useRef } from 'react';
import { useSnackbar } from 'notistack';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    AppBar,
    Tab,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { getData, storeData } from '../data/localStorage';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
}));


const DialogToAdd = ({ handleClose, open }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = React.useState('tome');


    let tome_name_tf = useRef(null);
    let tome_sum_tf = useRef(null);
    let tome_email_tf = useRef(null);
    let tome_date_tf = useRef(null);

    let meto_name_tf = useRef(null);
    let meto_sum_tf = useRef(null);
    let meto_email_tf = useRef(null);
    let meto_date_tf = useRef(null);

    var listOfNotes = getData('notes')

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tryAdd = () => {
        switch (value) {
            case 'tome': {
                let name = tome_name_tf.current.value;
                let sum = tome_sum_tf.current.value;
                let email = tome_email_tf.current.value;
                let date = tome_date_tf.current.value;

                listOfNotes.unshift({ID: 'tome', NAME: name, SUM: sum, EMAIL: email, DATE: date})
                storeData('notes', listOfNotes)
                handleClose()
                break;
            }
            case 'meto':{
                let name = meto_name_tf.current.value;
                let sum = meto_sum_tf.current.value;
                let email = meto_email_tf.current.value;
                let date = meto_date_tf.current.value;

                listOfNotes.push({ID: 'meto', NAME: name, SUM: sum, EMAIL: email, DATE: date})
                storeData('notes', listOfNotes)
                handleClose()
                break;
            }
        }
        enqueueSnackbar('Запись успешно создана', {variant: 'success'})
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{ paddingBottom: '0px', textAlign: 'center' }}>
                Добавить запись
            </DialogTitle>
            <DialogContent>
                <TabContext value={value}>
                    <AppBar position="static" >
                        <TabList
                            onChange={handleChange}
                            className={classes.root}
                            aria-label="simple tabs example"
                            variant='fullWidth'
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Мне должны" value="tome" />
                            <Tab label="Я должен" value="meto" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="tome">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="Введите имя"
                            type="text"
                            fullWidth
                            inputRef={tome_name_tf}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="sum"
                            label="Введите сумму"
                            type="number"
                            fullWidth
                            inputRef={tome_sum_tf}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Введите email"
                            type="email"
                            fullWidth
                            inputRef={tome_email_tf}
                        />
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            margin="dense"
                            id="date"
                            label="Введите дату"
                            type="date"
                            fullWidth
                            inputRef={tome_date_tf}
                        />
                    </TabPanel>
                    <TabPanel value="meto">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Введите имя"
                            type="text"
                            fullWidth
                            inputRef={meto_name_tf}
                        />
                        <TextField
                            margin="dense"
                            id="sum"
                            label="Введите сумму"
                            type="number"
                            fullWidth
                            inputRef={meto_sum_tf}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Введите email"
                            type="email"
                            fullWidth
                            inputRef={meto_email_tf}
                        />
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            margin="dense"
                            id="date"
                            label="Введите дату"
                            type="date"
                            fullWidth
                            inputRef={meto_date_tf}
                        />
                    </TabPanel>
                </TabContext>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                    </Button>
                <Button onClick={tryAdd} color="primary">
                    Добавить
                    </Button>
            </DialogActions>
        </Dialog>
    )


}

export default DialogToAdd