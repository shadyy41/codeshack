const FormHeader = ({ text }:{ text:string }) => {
  return (
    <h1 className="w-full text-xl font-semibold sm:text-2xl">{ text }</h1>
  )
}

export default FormHeader