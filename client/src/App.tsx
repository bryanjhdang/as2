import { useState } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Box, SimpleGrid } from '@mantine/core';
import TitleInfo from './components/TitleInfo';
import NewRecipeForm from './components/forms/NewRecipeForm';
import RecipesDisplay from './components/RecipesDisplay';
import { Recipe } from './components/classes/RecipeData';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  return (
    <MantineProvider>
      <Box mt="3rem" maw={1000} mx="auto">
        <TitleInfo />
        <SimpleGrid cols={2}>
          <NewRecipeForm setRecipes={setRecipes} />
          <RecipesDisplay recipes={recipes} setRecipes={setRecipes} />
        </SimpleGrid>
      </Box>
    </MantineProvider>
  )
}

export default App
