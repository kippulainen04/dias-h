import Spinner from "../spinner/spinner.component";
import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";


export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
[BUTTON_TYPE_CLASSES.base] : BaseButton,
[BUTTON_TYPE_CLASSES.google] : GoogleSignInButton,
[BUTTON_TYPE_CLASSES.inverted] : InvertedButton,
}[buttonType]
)

const Button = ({children, buttonType, isLoading, ...otherProps}) => {
    const CustomeButton = getButton(buttonType);
    return (
        <CustomeButton type="submit" variant="contained" color="primary" disabled={isLoading} {...otherProps}>
            {isLoading ? <Spinner /> : children}
        </CustomeButton>
    )
}

export default Button;