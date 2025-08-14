import useUserData from '../hooks/useUserData'
// import type { Post } from '../types.d'
export default function PostsList({ userId }: { userId: number | null }){

  const { posts } = useUserData(userId)

  return (
    <div className="p-4 space-y-3 overflow-auto scroll-style bg-violet-700 scroll-m-40 -scroll-ml-1.5">
      {posts.map(p => (
        <article key={p.id} className=" p-3 bg-violet-900 rounded-xl">
          <h5 className="font-semibold text-white">{p.title}</h5>
          <p className="text-sm text-gray-400">{p.body}</p>
        </article>
      ))}
    </div>
  )
}