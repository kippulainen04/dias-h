// import { getRedirectResult } from "firebase/auth";
// import { useEffect } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import styled from "styled-components"

const AuthenticationContainer = styled.div `
display: flex;
width: 900px;
justify-content: space-between;
margin: 30px auto;
`

const Authentication = () => {

    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
        
    //     if(response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user)
    //     }
    // }, []);

    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication;