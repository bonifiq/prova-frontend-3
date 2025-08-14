import { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { User, Post } from '../types.d'

export default function useUserData(userId: number | null) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userId === null) {
      setUser(null); setPosts([]); setError('ID do usuário não informado');
      return;
    }

    let active = true
    setLoading(true)
    setError(null)

    Promise.all([
      api.get<User>(`/users/${userId}`).then(r => r.data),
      api.get<Post[]>(`/posts`, { params: { userId } }).then(r => r.data)
    ])
      .then(([u, ps]) => {
        if (!active) return
        setUser(u)
        setPosts(ps.slice(0, 20))
      })
      .catch(err => { if (!active) return; setError(err.message || 'Erro'); setUser(null); setPosts([]) })
      .finally(() => { if (!active) return; setLoading(false) })

    return () => { active = false }
  }, [userId])

  return { user, posts, loading, error }
}