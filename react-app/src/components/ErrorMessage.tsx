export default function ErrorMessage({ children }: { children: React.ReactNode }){
  return <div className="p-4 text-sm text-red-600">{children}</div>
}