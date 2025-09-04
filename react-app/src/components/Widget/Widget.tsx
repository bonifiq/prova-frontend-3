import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Text,
  Alert,
  ActionIcon,
  Group,
  ScrollArea,
} from "@mantine/core";
import { IconX, IconAlertCircle } from "@tabler/icons-react";
import { Header } from "../Header/Header";
import { Card } from "../Card/Card";
import { useUserQuery, useUserPostsQuery } from "../../services";

export const Widget = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [hasTriedToGetUserId, setHasTriedToGetUserId] = useState(false);

  // Queries para buscar dados do usuário e posts
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUserQuery(userId);

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useUserPostsQuery(userId);

  // Escutar mensagens do widget principal (postMessage)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Mensagem recebida no React:", event.data);

      if (event.data.type === "SET_USER_ID" && event.data.userId) {
        setUserId(Number(event.data.userId));
        setHasTriedToGetUserId(true);
      }

      if (event.data.type === "WIDGET_OPENED") {
        // Quando o widget é reaberto, resetar e tentar novamente
        setHasTriedToGetUserId(false);
        tryToGetUserIdFromParent();
      }
    };

    window.addEventListener("message", handleMessage);

    // Tentar pegar do window.parent na inicialização
    setTimeout(() => {
      tryToGetUserIdFromParent();
    }, 100); // Pequeno delay para garantir que o DOM esteja pronto

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Função para tentar pegar o userId do parent
  const tryToGetUserIdFromParent = () => {
    console.log("Tentando pegar userId do parent...");

    if (window.parent && window.parent !== window) {
      try {
        type ParentWindowWithUserId = Window & {
          loggedUserId?: number | string;
        };
        const parentWindow = window.parent as ParentWindowWithUserId;
        const parentUserId = parentWindow.loggedUserId;

        console.log("UserId encontrado no parent:", parentUserId);

        if (parentUserId) {
          setUserId(Number(parentUserId));
          setHasTriedToGetUserId(true);
        } else {
          // Se não encontrou userId no parent, aguardar possível postMessage
          setTimeout(() => {
            console.log("Timeout: marcando como tentativa concluída");
            setHasTriedToGetUserId(true);
          }, 3000); // Aumentamos para 3 segundos
        }
      } catch (error) {
        console.warn("Não foi possível acessar loggedUserId do parent:", error);
        setTimeout(() => {
          setHasTriedToGetUserId(true);
        }, 1000);
      }
    } else {
      // Se não há parent, aguardar um pouco para possível postMessage
      console.log("Não há parent, aguardando postMessage...");
      setTimeout(() => {
        console.log("Timeout: marcando como tentativa concluída (sem parent)");
        setHasTriedToGetUserId(true);
      }, 3000);
    }
  };

  // Função para fechar o widget
  const handleClose = () => {
    console.log("Fechando widget do React");
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "CLOSE_WIDGET" }, "*");
    }
  };

  // Log para debug
  console.log("Estado atual:", {
    userId,
    hasTriedToGetUserId,
    userLoading,
    userError,
  });

  // Se ainda não tentou pegar o userId OU está carregando dados do usuário, mostrar skeleton
  if (!hasTriedToGetUserId || (userId && userLoading)) {
    return (
      <Container
        size="xs"
        p="md"
        style={{
          maxWidth: 320,
          height: "100vh",
          maxHeight: 600,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header com botão de fechar */}
        <Group justify="space-between" mb="md">
          <Text size="sm" fw={600}>
            Widget do Usuário
          </Text>
          <ActionIcon variant="subtle" color="gray" onClick={handleClose}>
            <IconX size={16} />
          </ActionIcon>
        </Group>

        {/* Header com skeleton */}
        <Header loading={true} />

        {/* Lista de posts com skeletons */}
        <ScrollArea style={{ flex: 1 }} mt="md">
          <Stack gap="sm">
            <Text size="sm" fw={500} c="dark.7">
              Posts do usuário
            </Text>

            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`skeleton-${index}`}
                title=""
                content=""
                loading={true}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Container>
    );
  }

  // Se não tiver userId após tentar pegar, mostrar erro
  if (!userId) {
    return (
      <Container
        size="xs"
        p="md"
        style={{ maxWidth: 320, height: "100vh", maxHeight: 600 }}
      >
        <Group justify="space-between" mb="md">
          <Text size="sm" fw={600}>
            Widget do Usuário
          </Text>
          <ActionIcon variant="subtle" color="gray" onClick={handleClose}>
            <IconX size={16} />
          </ActionIcon>
        </Group>

        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Erro ao carregar conteúdo"
          color="yellow"
        >
          Não foi possível carregar o conteúdo do widget. Tente novamente.
        </Alert>
      </Container>
    );
  }

  // Se houver erro na busca do usuário na API
  if (userError) {
    return (
      <Container
        size="xs"
        p="md"
        style={{ maxWidth: 320, height: "100vh", maxHeight: 600 }}
      >
        <Group justify="space-between" mb="md">
          <Text size="sm" fw={600}>
            Widget do Usuário
          </Text>
          <ActionIcon variant="subtle" color="gray" onClick={handleClose}>
            <IconX size={16} />
          </ActionIcon>
        </Group>

        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Erro ao carregar conteúdo"
          color="red"
        >
          Não foi possível carregar o conteúdo do widget. Tente novamente.
        </Alert>
      </Container>
    );
  }

  // Renderização normal com dados
  return (
    <Container
      size="xs"
      p="md"
      style={{
        maxWidth: 320,
        height: "100vh",
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header com botão de fechar */}
      <Group justify="space-between" mb="md">
        <Text size="sm" fw={600}>
          Widget do Usuário
        </Text>
        <ActionIcon variant="subtle" color="gray" onClick={handleClose}>
          <IconX size={16} />
        </ActionIcon>
      </Group>

      {/* Header do usuário */}
      <Header name={user?.name} email={user?.email} loading={userLoading} />

      {/* Lista de posts com scroll */}
      <ScrollArea style={{ flex: 1 }} mt="md">
        <Stack gap="sm">
          <Text size="sm" fw={500} c="dark.7">
            Posts do usuário ({posts?.length || 0})
          </Text>

          {postsLoading && (
            // Skeleton cards para loading
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={`skeleton-${index}`}
                  title=""
                  content=""
                  loading={true}
                />
              ))}
            </>
          )}

          {postsError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Erro ao carregar conteúdo"
              color="orange"
            >
              Não foi possível carregar o conteúdo do widget. Tente novamente.
            </Alert>
          )}

          {posts && posts.length === 0 && (
            <Text size="sm" c="dimmed" ta="center" py="xl">
              Nenhum post encontrado para este usuário.
            </Text>
          )}

          {posts?.map((post) => (
            <Card key={post.id} title={post.title} content={post.body} />
          ))}
        </Stack>
      </ScrollArea>
    </Container>
  );
};
