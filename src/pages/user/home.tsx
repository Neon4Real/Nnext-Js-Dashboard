import {
  Heading,
  Button,
  Card,
  CardHeader,
  Avatar,
  Flex,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { dashboard } from '@/config/translations/dashboard';
import { useGuilds } from '@/api/hooks';
import HomeView from '@/config/example/HomeView';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layout/app';
import { iconUrl } from '@/api/discord';
import Link from 'next/link';

const HomePage: NextPageWithLayout = () => {
  const t = dashboard.useTranslations();

  //used for example only, you should remove it
  return <HomeView />;

  return <GuildSelect />;
};

export function GuildSelect() {
  const guilds = useGuilds();

  if (guilds.status === 'success')
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        {guilds.data
          ?.filter((guild) => config.guild.filter(guild))
          .map((guild) => (
            <Card key={guild.id} variant="primary" as={Link} href={`/guilds/${guild.id}`}>
              <CardHeader as={Flex} flexDirection="row" gap={3} pb={4}>
                <Avatar src={iconUrl(guild)} name={guild.name} size="md" />
                <Heading size="md" fontWeight="600">
                  {guild.name}
                </Heading>
              </CardHeader>
            </Card>
          ))}
      </SimpleGrid>
    );

  if (guilds.status === 'error')
    return (
      <Button w="fit-content" variant="danger" onClick={() => guilds.refetch()}>
        Try Again
      </Button>
    );

  if (guilds.status === 'loading')
    return (
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={3}>
        <Skeleton minH="104px" rounded="2xl" />
        <Skeleton minH="104px" rounded="2xl" />
        <Skeleton minH="104px" rounded="2xl" />
        <Skeleton minH="104px" rounded="2xl" />
        <Skeleton minH="104px" rounded="2xl" />
      </SimpleGrid>
    );

  return <></>;
}

HomePage.auth = true;
HomePage.getLayout = (c) => <AppLayout>{c}</AppLayout>;
export default HomePage;
