import useUserData from '../hooks/useUserData'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
// import PostsList from './PostsList'

export default function UserView({ userId }: { userId: number | null }){
  const { user, loading, error } = useUserData(userId)

  if (loading) return <Loader />
  if (error) return <ErrorMessage>{error}</ErrorMessage>
  if (!user) return <div className="p-4">Nenhum usuário</div>

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div ><b>Nome: </b>{user.name}</div>
        <div ><b>Email: </b>{user.email}</div>
      </div>
    </div>
  )
}