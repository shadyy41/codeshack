import Link from 'next/link';
 
export default function NotFound() {
  return (
    <div className='svg-background h-full w-full flex items-center justify-center px-8 sm:px-0 text-center'>
      <h2 className="text-3xl font-medium font-mono text-slate-300">404: Page not found</h2>
    </div>
  );
}