import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { useForm } from '@mantine/form';
import { Text, Title, TextInput, Button, Group, Box, Divider } from '@mantine/core';
import { randomId } from '@mantine/hooks';

function App() {
  const form = useForm({
    initialValues: {
      name: '',
      ingredients: '',
      directions: '',
    },
  });

  return (
    <MantineProvider>

      <Box mt="3rem" maw={600} mx="auto">
        <Title order={1}>Recipe App</Title>
        
        <Box mt="2rem" maw={500} mx="auto">
          <Title order={3}>New Recipe</Title>

          <TextInput mt="md" label="Recipe Name" placeholder="Recipe Name" {...form.getInputProps('name')} />
          <TextInput mt="md" label="Ingredients" placeholder="Ingredients" {...form.getInputProps('ingredients')} />
          <TextInput mt="md" label="Directions" placeholder="Directions" {...form.getInputProps('directions')} />

          <Group justify="left" mt="md">
            <Button onClick={() => form.reset()}>
              Clear
            </Button>
            <Button
              onClick={() =>
                form.setValues({
                  name: randomId(),
                  ingredients: randomId(),
                  directions: randomId(),
                })
              }
            >
              Submit
            </Button>
          </Group>
        </Box>

        <Divider my="md"></Divider>

        <Box mt="2rem" maw={500} mx="auto">
          <Title order={3}>Saved Recipes</Title>
          <Group justify="left" mt="md">
            <Text>Looks like there are no recipes!</Text>
          </Group>
        </Box>
      </Box>

    </MantineProvider>
  )
}

export default App
