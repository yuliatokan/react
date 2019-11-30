import React, {useEffect, useState, useCallback} from 'react';
import * as APIService from '../../services/APIService';
import {
    Container,
    Typography,
    Button,
    TextField,
    makeStyles,
} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import {Form, Field} from 'react-final-form';
import {isStudent} from "../../services/APIService";


const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(4),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginBottom: theme.spacing(2),
    },
}));

const StudentScreen = ({match, history}) => {
    const studentId = match.params.studentId;
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (studentId) {
            const currentStudent = APIService.getStudent(studentId);

            setStudent(currentStudent);
        }
    }, [studentId]);

    const handleFormSubmit = useCallback(
        values => {
            if (studentId) {
                APIService.updateStudent(studentId, values);
            } else {
                APIService.addStudent(values);
            }

            history.push('/students');
        },
        [studentId, history]
    );

    const validate = async values => {
        const errors = {};
        const name = new RegExp('[a-zA-Z]');
        const address = new RegExp('[A-Za-z0-9\'\\.\\-\\s\\,]');

        if (!values.avatar) {
            errors.avatar = 'Required avatar';
        }

        if (!values.name) {
            errors.name = 'Required name';
        } else {
            if (values.name.length < 2) {
                errors.name = 'Your name is too short';
            } else if (values.name.size > 20) {
                errors.name = 'Your name is too long';
            } else if (!name.test(values.name)) {
                errors.name = 'Enter valid name';
            }
        }

        if (!values.address) {
            errors.address = 'Required address';
        } else {
            if (values.name.length < 2) {
                errors.name = 'Your address is too short';
            } else if (!address.test(values.address)) {
                errors.name = 'Enter valid address';
            }
        }
        return errors;
    };

    const classes = useStyles();

    if (studentId) {
        if (!isStudent(studentId)) {
            return (
                <Redirect to="/student-not-found"/>
            );
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" className={classes.title}>
                {studentId ? 'Update Student' : 'Create Student'}
            </Typography>
            <Form onSubmit={handleFormSubmit} initialValues={student} validate={validate}>
                {({handleSubmit, reset, submitting, pristine, values}) => (
                    <>
                        <Field name="avatar">
                            {({input, meta}) => (
                                <TextField
                                    className={classes.field}
                                    label="Avatar URL"
                                    variant="outlined"
                                    fullWidth
                                    {...input}
                                    error={meta.error && meta.touched}
                                    helperText={meta.touched ? meta.error : ''}
                                />

                            )}

                        </Field>
                        <Field name="name">
                            {({input, meta}) => (
                                <TextField
                                    className={classes.field}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    {...input}
                                    error={meta.error && meta.touched}
                                    helperText={meta.touched ? meta.error : ''}
                                />
                            )}
                        </Field>
                        <Field name="address">
                            {({input, meta}) => (
                                <TextField
                                    className={classes.field}
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    {...input}
                                    error={meta.error && meta.touched}
                                    helperText={meta.touched ? meta.error : ''}
                                />
                            )}
                        </Field>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            color="primary"
                            variant="contained"
                            size="large"
                            className={classes.submitButton}
                        >
                            Submit
                        </Button>
                        {studentId && (
                            <Button
                                component={Link}
                                to={`/students/delete/${studentId}`}
                                fullWidth
                                color="secondary"
                                variant="outlined"
                                size="large"
                            >
                                Delete student
                            </Button>
                        )}
                    </>
                )}
            </Form>
        </Container>
    );
};

export default StudentScreen;