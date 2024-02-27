import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useLocalStorage, useDisclosure } from '@mantine/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import { Text, Title, TextInput, Anchor, Modal, Button, Group, Box, Divider } from '@mantine/core';
import { randomId } from '@mantine/hooks';

function App() { 
  const [recipes, setRecipes] = useLocalStorage('recipes', []);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: '',
      ingredients: '',
      directions: '',
    },
    validate: {
      name: isNotEmpty('Recipe is required'),
      ingredients: isNotEmpty("Ingredients are required"),
      directions: isNotEmpty("Directions are required"),
    },
  });

  return (
    <MantineProvider>

      <Box mt="3rem" maw={600} mx="auto">
        <Title order={1}>Recipe App</Title>

        {/* This should be in a component */}
        <Box mt="2rem" maw={500} mx="auto">
          <Title order={3}>New Recipe</Title>

          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput mt="md" withAsterisk label="Recipe Name" placeholder="Recipe Name" {...form.getInputProps('name')} />
            <TextInput mt="md" withAsterisk label="Ingredients" placeholder="Ingredients" {...form.getInputProps('ingredients')} />
            <TextInput mt="md" withAsterisk label="Directions" placeholder="Directions" {...form.getInputProps('directions')} />

            <Group justify="left" mt="md">
              <Button color="gray" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>

        <Divider my="md"></Divider>

        {/* This should be in a component */}
        <Box mt="2rem" maw={500} mx="auto">
    
          <Title order={3}>Saved Recipes</Title>

            {/* This should be in a component */}
            <Modal opened={opened} onClose={close} title="Recipe Name" centered>

              <Title order={5}>Ingredients</Title>
              <Text>Ingredients go here...</Text>
              
              <Divider my="md"></Divider>
              
              <Title order={5}>Directions</Title>
              <Text>Directions go here...</Text>

              <Group justify="left" mt="md">
                <Button color="red">Delete</Button>
                <Button>Edit</Button>
              </Group>
              
            </Modal>

            {/* This should be auto generated from localStorage (or from the PostgreSQL db) */}
            <Text mt="xs"><Anchor onClick={open}>Recipe One</Anchor></Text>
            <Text mt="xs"><Anchor onClick={open}>Recipe Two</Anchor></Text>            
        </Box>      
      </Box>
    </MantineProvider>
  )
}

export default App
