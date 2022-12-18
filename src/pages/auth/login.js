import { useEffect, useRef, useState } from "react";
import { AiFillFacebook } from 'react-icons/ai';
import { useLocation, useNavigate,Link } from "react-router-dom";
import Input from "../../components/input";
import { login } from "../../firebase";
import {Formik, Form } from "formik";
import { LoginSchema } from "../../validation/login-schema";
import Button from "../../components/Button";
import Separator from "../../components/Separator";


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

    const images = [
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot1.png?__d=www',
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot2.png?__d=www',
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot4.png?__d=www',
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot3.png?__d=www'
    ]


    const handleSubmit = async(values, actions) => {
      // e.preventDefault();
      // console.log(values)
      const response = await login(values.username, values.password)
        // await login(...values)
        // alert('ee?')
        if(response){
          navigate(location.state?.return_url || '/', {
            replace: true
          })
      }
    }

  return (
    <div className="h-full w-full flex flex-wrap overflow-auto items-center gap-x-8 justify-center">
      <div className="hidden md:block w-[380px] h-[581px]  bg-logo-pattern relative bg-[length:468.32px_634.15px] bg-[top_left_-46px] ">
        <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={ref}>
          {images.map((image, key) => (
            <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
            src={images}
            alt=""/>
          ))}
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({isSubmitting, isValid, dirty, values}) => (
            <Form className="grid gap-y-1.5" onSubmit={(e) => handleSubmit(values, e)}>
              {/* <peer>{JSON.stringify(dirty)}</peer> */}
              <Input name="username"  label="Phone number, username or email"/>
              <Input type="password" name="password" label="Password"/>
              <Button type="sumbit"  disabled={!isValid || !dirty || isSubmitting} >Log In</ Button>
              <Separator/>
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
        Don't have an account? <Link to="/auth/register" className="font-semibold text-brand"> Sign up </Link>
      </div>
    </div> 
    </div>
  );
}


