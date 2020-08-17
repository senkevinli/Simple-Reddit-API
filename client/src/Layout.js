import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import PostForm from './PostForm';

const useStyles = makeStyles(theme => ({
    grid: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: 'blue',
        color: 'white',
        letterSpacing: '2px'
    },
    outer: {
        margin: '5px'
    }
}));

function Layout() {
    const classes = useStyles();
    const [info, setInfo] = useState({});

    function Row(){
        return(
            <React.Fragment>
                <Grid item xs={2} justify='center'>
                    <Paper className={classes.paper}>ACTIONS</Paper>
                </Grid>
                <Grid item xs={10} justify='center'>
                    <Paper className={classes.paper}>INFO</Paper>
                </Grid>
            </React.Fragment>
        )
    } 
    return (
        <div className={classes.grid}>
            <Grid className={classes.outer} container spacing={3}>
                <Grid item justify="center" xs={12}>
                    <Typography variant='h2' gutterBottom align='center'>A Reddit Bot?</Typography>
                </Grid>
                <Grid container xs={2} spacing={3}>
                    <Grid item xs={12} justify='center'>
                        <Paper className={classes.paper}>
                            <Typography variant='h5'>ACTIONS</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} justify='center'>
                        <Posts func={setInfo} state={info}/>
                    </Grid>
                </Grid>
                <Grid container xs={10} spacing={3} justify='center'>
                    <Grid item justify='center' xs={12}> 
                    { info.createPost ? <PostForm/> : null }
                    </Grid>
                </Grid>
                

            </Grid>
        </div>
    )
}


const useStylesPosts = makeStyles(theme => ({
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

function Posts(props) {
    const classes = useStylesPosts();

    const makeNewPost = (e)=>{
        e.preventDefault();
        props.func({...props.state, createPost: true});
    }

    return (
        <div className={classes.text}>
            <Card variant='outlined' className={classes.card}>
                <Typography variant='subtitle1' className={classes.smallHeader} gutterBottom>Post Actions</Typography>
                <Button onClick={makeNewPost} className={classes.button} size ='small' variant='outlined' color='primary'>new post</Button>
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
    );
}



export default Layout
