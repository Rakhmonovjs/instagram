import { useEffect, useRef, useState } from "react";
import { AiFillFacebook } from 'react-icons/ai';
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { login } from "../firebase";
import {Formik, Form } from "formik";
import { LoginSchema } from "../validation/login-schema";


export default function Login(){
    
  
    const navigate = useNavigate()
    const location = useLocation()
    const ref = useRef()

    // const enable = username && password
  
    useEffect(() => {
      let images = ref.current.querySelectorAll('img'),
        total = images.length,
        current = 0
      const imageSlider = () => {
       images[(current > 0 ? current : total) - 1].classList.add('opacity-0')
       images[current].classList.remove('opacity-0')
       current = current === total - 1 ? 0 : current + 1;
      }
      imageSlider()
      let interval = setInterval(imageSlider, 3000)
      return () => {
        clearInterval(interval)
      }
      
    }, [ref])  

    const handleSubmit = async (values, actions) => {
      await login(values.username, values.password)
        // await login(...values)
        // alert('ee?')
        navigate(location.state?.return_url || '/', {
          replace: true
        })
    }

  return (
    <div className="h-full w-full flex flex-wrap overflow-auto items-center gap-x-8 justify-center">
      <div className="hidden md:block w-[380px] h-[581px]  bg-logo-pattern relative bg-[length:468.32px_634.15px] bg-[top_left_-46px] ">
        <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={ref}>
          <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot1.png?__d=www" alt=""/>
          <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot2.png?__d=www" alt=""/>
          <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot4.png?__d=www" alt=""/>
          <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot3.png?__d=www" alt=""/>
        </div>
      </div>
    <div className="w-[350px] grid gap-y-3">
      <div className="bg-white border px-[40px] pt-10 pb-6">
        <a href="#" className="flex justify-center mb-8">
          <img className="h-[51px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>
        </a>
        <Formik 
          validationSchema={LoginSchema}
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={handleSubmit}
        >
          {({isSubmitting, isValid,dirty, values}) => (
            <Form className="grid gap-y-1.5">
              {/* <peer>{JSON.stringify(dirty)}</peer> */}
              <Input name="username"  label="Phone number, username or email"/>
              <Input type="password" name="password" label="Password"/>
              <button type="sumbit"  disabled={!isValid || !dirty || isSubmitting} className="h-[30px] mt-1 rounded bg-brand font-semibold text-white text-sm disabled:opacity-50">Log In</button>
              <div className="flex items-center my-2.5 mb-3.5">
                <div className="h-px bg-gray-300 flex-1"/>
                <span className="px-4 text-[13px] text-gray-500 font-semibold">OR</span>
                <div className="h-px bg-gray-300 flex-1"/>
              </div>
              <a href="#" className="flex justify-center items-center gap-x-2 text-sm font-semibold text-facebook">
                <AiFillFacebook size={20}/>
                Log in with Facebook
              </a>
              <a href="#" className="text-xs flex items-center justify-center text-link">
                Forget password?
              </a>
            </Form>
          )}

        </Formik>
        
      </div>
      <div className="bg-white border p-4 text-sm text-center">
        Don't have an account? <a href="#" className="font-semibold text-brand"> Sing up </a>
      </div>
    </div> 
    </div>
  );
}


