export default function Button({type= 'button',children, ...props}){
    return (
        <button type={type} {...props} 
        className="h-[30px] mt-1 w-full flex items-center justify-center gap-x-2 rounded bg-brand font-semibold text-white text-sm disabled:opacity-50">
        {children}</button>
    )
}

{/* <button type="sumbit"  disabled={!isValid || !dirty || isSubmitting} className="h-[30px] mt-1 rounded bg-brand font-semibold text-white text-sm disabled:opacity-50">Log In</button> */}
