import { Paper, Text, Skeleton } from "@mantine/core";

type CardProps = {
  title: string;
  content: string;
  loading?: boolean;
};

export const Card = ({ title, content, loading }: CardProps) => {
  if (loading) {
    return (
      <Paper p="md" shadow="xs" withBorder mb="sm">
        <Skeleton height={16} mb={8} width="70%" />
        <Skeleton height={12} mb={4} />
        <Skeleton height={12} mb={4} />
        <Skeleton height={12} width="90%" />
      </Paper>
    );
  }

  return (
    <Paper p="md" shadow="xs" withBorder mb="sm">
      <Text size="sm" fw={600} mb={8} c="dark.8">
        {title}
      </Text>
      <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>
        {content}
      </Text>
    </Paper>
  );
};
