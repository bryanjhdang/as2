import { useState, useEffect } from 'react';
import { Text, Title, Box, Accordion, ActionIcon, Center, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { Recipe } from './classes/RecipeData'
import EditRecipeForm from './forms/EditRecipeForm'

interface Props {
  recipes: Recipe[]
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

function AccordionControl({ recipe, onEdit, onDelete }: { recipe: Recipe; onEdit: (recipe: Recipe) => void; onDelete: (id: string) => void }) {
  const handleEditClick = () => {
    onEdit(recipe)
  }

  const handleDeleteClick = () => {
    onDelete(recipe._id)
  }

  return (
    <>
      <Center>
        <Accordion.Control>
          <Text>{recipe.name}</Text>
        </Accordion.Control>
        <Tooltip label="Edit">
          <ActionIcon onClick={handleEditClick} size="lg" variant="subtle" color="gray" mr="5">
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

export default function RecipesDisplay({ recipes, setRecipes }: Props) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    axios.get<Recipe[]>('http://localhost:3000/recipes')
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

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
  }

  const items = recipes.map((recipe) => (
    <Accordion.Item key={recipe._id} value={recipe.name}>
      <AccordionControl recipe={recipe} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />
      <Accordion.Panel>
        <Text c='gray' pb="10">Last Modified: {recipe.lastModified}</Text>
        <Box pb="10">
          <Text fw={700}>Ingredients</Text>
          <Text>{recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</Text>
        </Box>
        <Box pb="10">
          <Text fw={700}>Directions</Text>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{recipe.directions}</Text>
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

      {selectedRecipe && (
        <EditRecipeForm
          recipe={selectedRecipe}
          setRecipes={setRecipes}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </Box>
  )
}