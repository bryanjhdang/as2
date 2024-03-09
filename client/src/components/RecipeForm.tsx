import { isNotEmpty, useForm } from '@mantine/form';
import { Title, Textarea, TextInput, Button, Group, Box } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid'
import axios from "axios";

interface FormData {
  name: string;
  ingredients: string;
  directions: string;
}

function handleOnSubmit(formData: FormData) {
  const recipeData = {
    id: uuidv4(),
    timeLastModified: new Date().toLocaleString(),
    recipeName: formData.name,
    recipeIngredients: formData.ingredients,
    recipeDirections: formData.directions
  }

  // TODO: Change the actual API endpoint to a correct one (handle the comma separation on the backend)
  axios.post("https://localhost:8080/add", recipeData).then((response) => {
    console.log(response.status, response.data.token)
  })
  .catch((error) => {
    console.log("Error:", error)
  })
}

export default function RecipeForm() {
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

  return (
    <Box m="1rem">
      <Title order={3}>Add a New Recipe</Title>
      <form onSubmit={form.onSubmit(() => handleOnSubmit(form.values))}>
        <TextInput mt="md" withAsterisk label="Recipe Name" placeholder="Apple Pie" {...form.getInputProps('name')} />
        <Textarea mt="md" withAsterisk label="Ingredients (comma-separated)" placeholder="Apple, Flour, Cinnamon" {...form.getInputProps('ingredients')} />
        <Textarea mt="md" withAsterisk label="Directions" placeholder="1. Preheat oven to 375 F..." {...form.getInputProps('directions')} />

        <Group justify="left" mt="md">
          <Button color="gray" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">
            Save
          </Button>
        </Group>
      </form>
    </Box>
  )
}