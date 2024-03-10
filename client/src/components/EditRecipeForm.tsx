import { useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { Textarea, TextInput, Button, Group, Box } from '@mantine/core';
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

  // TODO: Change the actual API endpoint to a correct for editing (handle the comma separation on the backend)
  axios.post("https://localhost:8080/edit", recipeData)
    .then((response) => {
      console.log(response.status, response.data.token)
    })
    .catch((error) => {
      console.log("Error:", error)
    })
}

export default function EditRecipeForm() {

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
      <form onSubmit={form.onSubmit(() => handleOnSubmit(form.values))}>
        <TextInput mt="md" withAsterisk value={"test"} label="Recipe Name" placeholder="Apple Pie" {...form.getInputProps('name')} />
        <TextInput mt="md" withAsterisk label="Ingredients (comma-separated)" placeholder="Apple, Flour, Cinnamon" {...form.getInputProps('ingredients')} />
        <Textarea mt="md" withAsterisk autosize minRows={4} label="Directions" placeholder="1. Preheat oven to 375 F..." {...form.getInputProps('directions')} />
        
        <Group justify="left" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Box>
  )
}