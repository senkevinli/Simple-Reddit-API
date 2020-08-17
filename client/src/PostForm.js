import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

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
    card: {
        marginLeft: '10px',
        textAlign: 'center',
        backgroundColor: '#ebeff7'
    },
    title: {
        marginTop: '10px',
        marginBottom: '20px',
        letterSpacing: '2px'
    }, 
}));


function PostForm() {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card} justify='center'>
                <form>
                    <Typography className={classes.title} variant='h5'>Post Submission Form</Typography>
                    <Box m={2}>
                        <TextField label='Subreddit Name' variant='outlined'></TextField>
                    </Box>
                    <Box m={2}>
                        <TextField label='Title' variant='outlined'></TextField>
                    </Box>
                    <Box m={2}>
                        <TextField multiline rows={10} size='large' variant='outlined' label='Description' style={{ width: '500px' }}></TextField>
                    </Box>
                    <Box m={2}>
                        <Button>Submit</Button>
                    </Box>
                </form>
                
            </Card>
        </div>
    )
}

export default PostForm
