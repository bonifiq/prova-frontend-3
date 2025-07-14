import { useEffect, useState } from "react";
import { fetchUser, fetchPosts } from "../../shared/services/api";
import type { Post } from "../../shared/types/Post";
import type { User } from "../../shared/types/User";
import Header from "../../shared/components/organisms/Header/Header";
import CardPost from "../../shared/components/organisms/CardPost/CardPosts";
import { Close, ContPosts, ContainerPage, TitleContPosts } from "./style";
import { X } from "phosphor-react";
import Loading from "../../shared/components/organisms/Loading/Loading";

export default function WidgetButton() {
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.userId) {
        setUserId(event.data.userId);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    async function fetchUserData(id: number) {
      try {
        const userData = await fetchUser(id);
        setUser(userData);
        const postsData = await fetchPosts(id);
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const handleClose = () => {
    window.parent.postMessage("close-widget", "*");
  };

  if (!user) return <Loading />;

  return (
    <ContainerPage>
      <Close onClick={handleClose}>
        <X size={24} />
      </Close>
      <Header name={user.name} email={user.email} />
      <TitleContPosts>Posts</TitleContPosts>
      <ContPosts>
        {posts.map((post) => (
          <CardPost title={post.title} body={post.body} postid={post.id} />
        ))}
      </ContPosts>
    </ContainerPage>
  );
}
