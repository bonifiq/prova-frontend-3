import { Paper, Text, Group, Skeleton } from "@mantine/core";

type HeaderProps = {
  name?: string;
  email?: string;
  loading?: boolean;
};

export const Header = ({ name, email, loading }: HeaderProps) => {
  if (loading) {
    return (
      <Paper p="md" shadow="xs" withBorder>
        <Group gap="sm">
          <Skeleton height={40} circle />
          <div style={{ flex: 1 }}>
            <Skeleton height={16} width="60%" mb={4} />
            <Skeleton height={12} width="80%" />
          </div>
        </Group>
      </Paper>
    );
  }

  return (
    <Paper p="md" shadow="xs" withBorder>
      <Group gap="sm">
        <div>
          <Text size="sm" fw={600} c="dark.9">
            {name || "Nome não informado"}
          </Text>
          <Text size="xs" c="dimmed">
            {email || "Email não informado"}
          </Text>
        </div>
      </Group>
    </Paper>
  );
};
