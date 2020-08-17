import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Dialog } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function Header (onNewPost) {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='headline'>
                    Simple Reddit Bot
                </Typography>
                <CustomDialog onCreate={onNewPost}/>
            </Toolbar>
        </AppBar>
    );
}




const CustomDialog = () => {
   const [open, toggle] = useState(false); 
   const toggleDialog = (e) => {
        toggle(!open);
    }
    

    return(
        <React.Fragment>
            <Button variant='fab' aria-label='add' mini onClick={toggleDialog}>
                <Add/>
            </Button>
            <Dialog open={open} onClose={toggleDialog}>
                <DialogTitle> Create new post </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default Header;