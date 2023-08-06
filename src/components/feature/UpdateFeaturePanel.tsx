import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import { Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/layout';
import { ButtonGroup, Button, Icon } from '@chakra-ui/react';
import { SlideFade } from '@chakra-ui/react';
import { FeatureConfig, FormRender, CustomFeatures } from '@/config/types';
import { IoSave } from 'react-icons/io5';
import { useUpdateFeatureMutation } from '@/api/hooks';
import { Params } from '@/pages/guilds/[guild]/features/[feature]';
import { feature as view } from '@/config/translations/feature';
import { useRouter } from 'next/router';

export function UpdateFeaturePanel<K extends keyof CustomFeatures>({
  feature,
  config,
}: {
  id: K;
  feature: CustomFeatures[K];
  config: FeatureConfig<K>;
}) {
  const result = config.useRender(feature);

  return (
    <>
      <Flex direction="column" gap={5} w="full" h="full">
        <Heading ml={5} size="lg">
          {config.name}
        </Heading>
        {result.component}
      </Flex>
      <Savebar result={result} />
    </>
  );
}

function Savebar({ result: { canSave, reset, onSubmit } }: { result: FormRender<any> }) {
  const { guild, feature } = useRouter().query as Params;
  const mutation = useUpdateFeatureMutation();
  const t = view.useTranslations();

  const breakpoint = '3sm';
  const onSave = () => {
    onSubmit?.(async (data) => {
      return await mutation.mutateAsync({
        guild,
        feature,
        options: data,
      });
    });
  };

  return (
    <HStack
      as={SlideFade}
      in={canSave}
      bg="CardBackground"
      rounded="3xl"
      zIndex="sticky"
      pos="sticky"
      bottom={{ base: 2, [breakpoint]: '10px' }}
      w="full"
      p={{ base: 1, [breakpoint]: '15px' }}
      shadow="normal"
      mt={2}
    >
      <Icon
        as={WarningIcon}
        _light={{ color: 'orange.400' }}
        _dark={{ color: 'orange.300' }}
        w="30px"
        h="30px"
      />
      <Text fontSize={{ base: 'md', [breakpoint]: 'lg' }} fontWeight="500">
        {t.unsaved}
      </Text>
      <Spacer />
      <ButtonGroup isDisabled={mutation.isLoading} size={{ base: 'sm', [breakpoint]: 'md' }}>
        <Button
          variant="action"
          rounded="full"
          leftIcon={<IoSave />}
          isLoading={mutation.isLoading}
          onClick={onSave}
        >
          {t.bn.save}
        </Button>
        <Button rounded="full" onClick={reset}>
          {t.bn.discard}
        </Button>
      </ButtonGroup>
    </HStack>
  );
}
