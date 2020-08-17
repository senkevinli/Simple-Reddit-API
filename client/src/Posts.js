import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles(theme => ({
    text: {
        fontSize: '12px',
        letterSpacing: '2px'
    },
    smallHeader: {
        letterSpacing: '2px',
        textAlign: 'center',
        marginBottom: "20px"
    },
    card: {
        textAlign: 'center',
        padding: '10px'
    },
    button: {
        maxHeight: '30px',
        marginBottom: '20px',
        fontSize: '10px'
    },
    idInput: {
        height: '3px',
        width: '6px',
        fontSize: '12px'
    },
    idText: {
        fontSize: '12px'
    },
}));

function Posts() {
    const classes = useStyles();
    return (
        <div className={classes.text}>
            <Card variant='outlined' className={classes.card}>
                <Typography variant='subtitle1' className={classes.smallHeader} gutterBottom>Post Actions</Typography>
                <Button className={classes.button} size ='small' variant='outlined' color='primary'>new post</Button>
                <Box m={1}>
                    <TextField label="ID" 
                    InputLabelProps={{ classes: {root: classes.idText}}} 
                    InputProps={{ classes: {input: classes.idInput} }}  
                    variant='outlined'>
                    </TextField>
                </Box>
                <Button className={classes.button} size='small' variant='outlined' color='primary'>search post</Button>
                <Box>
                    total: {0}
                </Box>
            </Card>
        </div>
    )
}

export default Posts
