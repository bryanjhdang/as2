import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Box, SimpleGrid } from '@mantine/core';
import TitleInfo from './components/TitleInfo';
import RecipeForm from './components/RecipeForm';
import Recipes from './components/Recipes';

function App() {
  return (
    <MantineProvider>
      <Box mt="3rem" maw={1000} mx="auto">
        <TitleInfo />
        <SimpleGrid cols={2}>
          <RecipeForm />
          <Recipes />
        </SimpleGrid>
      </Box>
    </MantineProvider>
  )
}

export default App
