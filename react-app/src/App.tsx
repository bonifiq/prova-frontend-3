import { useEffect, useState } from 'react'
import UserView from './components/UserView'
import PostsList from './components/PostsList'

export default function App(){
  const [userId, setUserId] = useState<number | null>(null)
  const [initReceived, setInitReceived] = useState(false)

  useEffect(() => {
    try {
      window.parent.postMessage(JSON.stringify({ type: 'IFRAME_READY' }), '*')
    } catch (e) {}

    function onMessage(ev: MessageEvent){
      
      let data: any = ev.data
     
      try { if (typeof data === 'string') data = JSON.parse(data) } catch (e) { return }
      if (!data || !data.type) return

      if (data.type === 'INIT'){
        setInitReceived(true)
        setUserId(typeof data.userId === 'number' ? data.userId : null)
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  function requestClose(){
    try { window.parent.postMessage(JSON.stringify({ type: 'CLOSE_WIDGET' }), '*') } catch(e) {}
  }

  return (
    <div className="h-full max-w-[320px] min-h-[300px] flex flex-col bg-white">
      <header className="flex items-center justify-between p-3 bg-violet-700 text-white">
       <UserView userId={userId} />
        <button aria-label="Fechar" onClick={requestClose} className="text-2xl leading-none">×</button>
      </header>

      {!initReceived ? (
        <div className="p-4">Aguardando dados do host...</div>
      ) : (
        <div className="flex-1 overflow-auto">
        <PostsList userId={userId}/>
      </div>
      )}
    </div>
  )
}