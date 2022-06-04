import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import Button from "../button/button.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
  const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          alert('passwords do not match');
          return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();    
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
              alert('Cannot create user, email already in use');
            } else {
              console.log('user creation encountered an error', error);
            }
          }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormFields({ ...formFields, [name]: value });
      };

    return (
        <div>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <Typography variant="h5" style={{ fontWeight: 700 }} gutterBottom> Sign Up</Typography>
                <Box sx={{mb: 1}}>
                <TextField size="small" label="Display Name" type="text" required name="displayName" onChange={handleChange} value={displayName}/>
                </Box>
                <Box sx={{mb: 1}}>
                  <TextField size="small" label="Email" type="email" required name="email" onChange={handleChange} value={email}/>
                </Box>
                <Box sx={{mb: 1}}>
                  <TextField size="small" label="Password" type="password" required name="password" onChange={handleChange} value={password}/>
                </Box>
                <Box sx={{mb: 1}}>
                  <TextField size="small" label="Confirm Password" type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                </Box>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm