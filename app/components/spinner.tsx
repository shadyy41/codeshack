const Spinner = ({ sizeclass="h-5 w-5 sm:h-6 sm:w-6", borderclass="border-2" } : { sizeclass?:string, borderclass?:string}) => {
  return (
  <div className={`inline-block ${sizeclass} animate-spin rounded-full ${borderclass} border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`} role="status">
    <span className="sr-only">Loading...</span>
  </div>
  )
}

export default Spinner