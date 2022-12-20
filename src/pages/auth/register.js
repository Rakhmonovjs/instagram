import { useEffect, useRef, useState } from "react";
import { AiFillFacebook } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { register } from "../../firebase";
import {Formik, Form } from "formik";
import Button from "../../components/Button";
import Separator from "../../components/Separator";
import { RegisterSchema } from "../../validation";


export default function Register(){
    
  
    const navigate = useNavigate()
    const location = useLocation()

    //  const handleSubmit = async(values, e) => {
    //   e.preventDefault();
    //   console.log(values)
    //   // e.preventDefault();
    //   // console.log(values)
    //   const response = await register(values.email, values.password, values.full_name, values.username )
    //     // await login(...values)
    //     // alert('ee?')
    //     navigate(location.state?.return_url || '/', {
    //       replace: true
    //     })
    //     // if(response){
          
    //   // }
    // }

    const handleSubmit = async (values, e) => {
      
      const response =await register(values.email, values.password, values.full_name, values.username)
      console.log(values)
      if(response) {
        navigate(location.state?.return_url || '/',{
          replace: true
        })
      }
    }

  return (
    <div className="w-[350px] grid gap-y-3">
      <div className="bg-white border px-[40px] pt-10 pb-6">
        <a href="#" className="flex justify-center mb-4">
          <img className="h-[51px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>
        </a>
        <p className="text-[17px] font-semibold text-[#8e8e8e] text-center mb-6">
        Register to see photos and videos of your friends.
        </p>
        < Button>
            <AiFillFacebook size={20}/>
            Login with Facebook
        </Button>
        <Separator/>
        <Formik 
          validationSchema={RegisterSchema}
          initialValues={{
            email: '',
            full_name: '',
            username: '',
            password: ''
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({isSubmitting, isValid, dirty, values}) => (
            <Form className="grid gap-y-1.5" onSubmit={(e) => handleSubmit(values, e)}>              
              <Input name="email"  label="Email"/>
              <Input name="full_name"  label="Full name"/>
              <Input name="username"  label="Username"/>
              <Input type="password" name="password" label="Password"/>
              <p className="text-xs text-[#8e8e8e] py-2">
                People who use our service may have uploaded your contact information to Instagram. <a href="#" className="font-semibold">Read more</a> 
                    <br/> <br/>
                By registering, you agree to our  <a href="#" className="font-semibold">Terms</a> ,  <a href="#" className="font-semibold">Privacy Policy</a> and<a href="#" className="font-semibold"> Cookies Policy</a>  
              </p>
              <Button type="sumbit"  disabled={!isValid || !dirty || isSubmitting} >Registration</ Button>

            </Form>
          )}

        </Formik>
        
      </div>
      <div className="bg-white border p-4 text-sm text-center">
      Have an account? <Link to="/auth/login" className="font-semibold text-brand"> Log in </Link>
      </div>
    </div> 
  );
}


