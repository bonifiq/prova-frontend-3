export async function fetchUser(id: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!response.ok) throw new Error("Erro ao buscar usuário");
  return response.json();
}

export async function fetchPosts(id: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  if (!response.ok) throw new Error("Erro ao buscar posts");
  return response.json();
}
