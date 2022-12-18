import Yup from "./validate"

export const RegisterSchema = ()=> Yup.object.shape({
    email: Yup.string()
    .required()
    .email(),
    full_name: Yup.string()
    .required(),
    username: Yup.string()
    .required(),
    password: Yup.string()
    .required()
})

// export default RegisterSchema
// export const LoginSchema =()=> yup.object().shape({
//     username: yup.string().required(),
//     password: yup.string().min(6).max(225).required(),
// });