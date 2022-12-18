import * as yup from "yup"

yup.setLocale({
    mixed: {
        required: "This field is required!"
    },
    string: {
        email: "Please enter your email"
    }
})

export default yup