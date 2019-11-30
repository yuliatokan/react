import React from 'react';
import {
    makeStyles, Typography, Container,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {
        paddingBottom: theme.spacing(10),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="sm">
                <Typography variant="h3" className={classes.title}>
                    404: Student not found
                </Typography>
            </Container>
        </>
    );
};