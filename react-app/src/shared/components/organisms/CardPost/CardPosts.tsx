import { ContenCard } from "./style";

interface PostProps {
  title: string;
  body: string;
  postid: number;
}

export default function CardPost({ title, body, postid }: PostProps) {
  return (
    <ContenCard key={postid}>
      <h3>{title}</h3>
      <p>{body}</p>
    </ContenCard>
  );
}
