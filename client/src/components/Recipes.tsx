import { useDisclosure } from '@mantine/hooks';
import { Text, Title, Anchor, Modal, Box, Divider } from '@mantine/core';

export default function Recipes() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Box m="1rem">
        <Title order={3}>Saved Recipes</Title>

        <Modal opened={opened} onClose={close} title="Recipe Name" centered>

          <Text color='gray'>Date: January 8 2004</Text>

          <Divider my="md"></Divider>

          <Title order={5}>Ingredients</Title>
          <Text>Ingredients go here...</Text>

          <Divider my="md"></Divider>

          <Title order={5}>Directions</Title>
          <Text>Directions go here...</Text>

        </Modal>

        {/* This should be auto generated from localStorage (or from the PostgreSQL db) */}
        <Text mt="xs"><Anchor onClick={open}>Recipe One</Anchor></Text>
        <Text mt="xs"><Anchor onClick={open}>Recipe Two</Anchor></Text>
      </Box>
    </div>
  )
}