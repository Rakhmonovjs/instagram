import yup from "./validate"

// export const LoginSchema = ()=> Yup.object.shape({
//     username: Yup.string()
//     .required(),
//     password: Yup.string()
//     .required()
// })

// export default LoginSchema
export const LoginSchema =()=> yup.object().shape({
    username: yup.string().username(),
    password: yup.string().min(6).max(225).required(),
  });