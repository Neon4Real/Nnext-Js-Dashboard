import { Box, Center } from '@chakra-ui/layout';
import AppLayout from '../app';
import { ReactNode } from 'react';
import GuildNavbar from './guild-navbar';
import { InGuildSidebar } from './guild-sidebar';

export default function getGuildLayout({
  back,
  children,
}: {
  back?: boolean;
  children: ReactNode;
}) {
  return (
    <AppLayout navbar={<GuildNavbar back={back} />} sidebar={back ? <InGuildSidebar /> : undefined}>
      <Center w="full" h="full">
        <Box w="full" maxW={{ base: 'none', xl: '1200px' }} h="full">
          {children}
        </Box>
      </Center>
    </AppLayout>
  );
}
