import { isNotEmpty, useForm } from '@mantine/form';
import { Box, Title, Textarea, TextInput, Button, Group } from '@mantine/core';
import axios from "axios";
import { Recipe } from '../classes/RecipeData';

interface Props {
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

interface FormData {
  name: string;
  ingredients: string;
  directions: string;
}

export default function NewRecipeForm({ setRecipes }: Props) {
  const form = useForm({
    initialValues: {
      name: '',
      ingredients: '',
      directions: '',
    },
    validate: {
      name: isNotEmpty('Recipe name is required'),
      ingredients: isNotEmpty("Ingredients are required"),
      directions: isNotEmpty("Directions are required"),
    },
  });

  const handleOnSubmit = (formData: FormData, form: any) => {
    const recipeData = {
      name: formData.name,
      lastModified: new Date().toLocaleString(),
      directions: formData.directions,
      ingredients: formData.ingredients
    }

    axios.post("http://localhost:3000/recipes", recipeData)
      .then((response) => {
        console.log(response.status, response.data.token)
        setRecipes(prevRecipes => [...prevRecipes, response.data])
        form.reset()
      })
      .catch((error) => {
        console.log("Error:", error)
      })
  }

  return (
    <Box m="1rem">
      <Title order={3}>Add a New Recipe</Title>
      <form onSubmit={form.onSubmit(() => handleOnSubmit(form.values, form))}>
        <TextInput mt="md" withAsterisk label="Recipe Name" placeholder="Apple Pie" {...form.getInputProps('name')} />
        <TextInput mt="md" withAsterisk label="Ingredients (comma-separated)" placeholder="Apple, Flour, Cinnamon" {...form.getInputProps('ingredients')} />
        <Textarea mt="md" withAsterisk autosize minRows={4} label="Directions" placeholder="1. Preheat oven to 375 F..." {...form.getInputProps('directions')} />

        <Group justify="left" mt="md">
          <Button color="gray" onClick={() => form.reset()}>Reset</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Box>
  )
}