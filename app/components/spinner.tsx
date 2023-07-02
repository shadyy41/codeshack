const Spinner = ({ sizeclass="h-4 w-4", borderclass="border-2", color="text-slate-300" } : { sizeclass?:string, borderclass?:string, color?:string }) => {
  return (
    <div className={`animate-spin inline-block ${sizeclass} ${borderclass} ${color} border-current border-t-transparent rounded-full`} role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
    )
}

export default Spinner