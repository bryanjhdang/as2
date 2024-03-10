import { useState, useEffect } from 'react';
import { Text, Title, Modal, Box, Accordion, ActionIcon, Center, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import EditRecipeForm from './EditRecipeForm';

interface Ingredient {
  _id: string
  name: string
}

interface Recipe {
  _id: string
  name: string
  lastModified: Date
  directions: string
  ingredients: Ingredient[]
}

function AccordionControl({ recipe, onDelete }: { recipe: Recipe; onDelete: (id: string) => void }) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDeleteClick = () => {
    onDelete(recipe._id)
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Recipe" centered>
        <EditRecipeForm></EditRecipeForm>
      </Modal>

      <Center>
        <Accordion.Control>
          <Text>{recipe.name}</Text>
        </Accordion.Control>
        <Tooltip label="Edit">
          <ActionIcon onClick={open} size="lg" variant="subtle" color="gray" mr="5">
            <IconEdit size="1rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon onClick={handleDeleteClick} size="lg" variant="subtle" color="gray" mr="10">
            <IconTrash size="1rem" />
          </ActionIcon>
        </Tooltip>
      </Center>
    </>
  );
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.get<Recipe[]>('http://localhost:3000/recipes')
      .then(response => {
        const updatedRecipes = response.data.map(recipe => ({
          ...recipe,
          lastModified: new Date(recipe.lastModified)
        }));
        setRecipes(updatedRecipes)
      })
      .catch((error) => {
        console.log("Error:", error)
      })
  }, []);

  const handleDeleteRecipe = (id: string) => {
    axios.delete(`http://localhost:3000/recipes/${id}`)
      .then(() => {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id))
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }

  const items = recipes.map((recipe) => (
    <Accordion.Item key={recipe._id} value={recipe.name}>
      <AccordionControl recipe={recipe} onDelete={handleDeleteRecipe} />
      <Accordion.Panel>
        <Text c='gray' pb="10">Last Modified: {recipe.lastModified.toLocaleString()}</Text>
        <Box pb="10">
          <Text fw={700}>Ingredients</Text>
          <Text>{recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</Text>
        </Box>
        <Box pb="10">
          <Text fw={700}>Directions</Text>
          <Text>{recipe.directions}</Text>
        </Box>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box m="1rem">
      <Title order={3} pb="15">Saved Recipes</Title>
      <Accordion variant="separated" chevronPosition="left">
        {items}
      </Accordion>
    </Box>
  )
}