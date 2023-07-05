const FeatureCard = ({ title, content, icon } : { title: string, content: string, icon: any }) => {
  return (
    <div className="bg-neutral-900/20 flex flex-col items-center justify-center gap-2 border border-white border-opacity-20 rounded p-2 ">
      <h3 className="text-xl flex items-center justify-center gap-2">{icon}{title}</h3>
      <p className="text-md text-slate-300">{content}</p>
    </div>
  )
}

export default FeatureCard