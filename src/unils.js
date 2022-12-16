import { setUser } from "./store/auth"
import store from "./store";


export const userHandle = data => {
    store.dispatch(setUser(data))
}