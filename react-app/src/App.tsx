import './App.css'
import { useEffect, useState } from 'react'
// IMPORTAÇÃO DOS COMPONENTES
import { UserComponent } from './components/UserComponent'
import { PostComponent } from './components/PostComponent'
// IMPORTAÇÃO DAS INTERFACES
import type { Posts } from './interfaces/IPosts'
import type { User } from './interfaces/IUser'

function App() {

  const [userId, setUserId] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Posts[]>([])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.loggedUserId) {
        const id = event.data.loggedUserId;
        setUserId(id);
      }
    };

    window.addEventListener('message', handleMessage);

    window.parent.postMessage('getLoggedUserId', '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(setUser);

      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => res.json())
        .then(setPosts);
    }
  }, [userId]);


  return (
    <>
      <div className='tela'>
        <UserComponent id={userId} name={user?.name || ''} email={user?.email || ''} />  

        <div className='container-posts'>
          {
            posts ?
              posts.map(card => <PostComponent key={card.id} id={card.id} title={card.title} body={card.body} />) :
              <div>Usuário não possui posts</div>
          }
        </div>
      </div>
    </>
  )
}

export default App
