import{ Navigate, useRoutes } from "react-router-dom";
import routes from "./routes";
import {Toaster} from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";

function App() {

   const user = useSelector(state => state.auth.user)
   const showRoutes = useRoutes(routes)
   // const [redirect, setRedirect] = useState(false)

   // useEffect(() => {
   //    let timeout = setTimeout(() => {
   //       setRedirect(true)
   //    }, 1000)
   //    return () => {
   //       clearTimeout(timeout)
   //    }
   // }, []);

   // console.log(
   //    /^[a-z0-9\.\_]+$/i.test('hello_attempt')
   // )

   if(user === null){
      return <Loader/>
   }

   return (
      <>
         {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
         <Toaster position="top-right"/>
         {showRoutes}
      </>
   )
    
}     
export default App;
