import { isNotEmpty, useForm } from '@mantine/form';
import { Group, TextInput, Textarea, Modal, Button } from '@mantine/core';
import { Recipe } from '../classes/RecipeData';
import axios from "axios";

interface Props {
  recipe: Recipe
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
  onClose: () => void
}

interface FormData {
  name: string;
  ingredients: string;
  directions: string;
}

export default function EditRecipeForm({ recipe, setRecipes, onClose }: Props) {
  const form = useForm({
    initialValues: {
      name: recipe.name,
      ingredients: recipe.ingredients.map(ingredient => ingredient.name).join(', '),
      directions: recipe.directions,
    },
    validate: {
      name: isNotEmpty('Recipe name is required'),
      ingredients: isNotEmpty("Ingredients are required"),
      directions: isNotEmpty("Directions are required"),
    },
  });

  const handleOnSubmit = (formData: FormData) => {
    const recipeData = {
      name: formData.name,
      lastModified: new Date().toLocaleString(),
      directions: formData.directions,
      ingredients: formData.ingredients
    }

    axios.put(`http://localhost:3000/recipes/${recipe._id}`, recipeData)
      .then((response) => {
        console.log(response.status, response.data.token)
        setRecipes((prevRecipes) => {
          const updatedRecipes = prevRecipes.map((r) => {
            if (r._id === recipe._id) {
              return response.data
            }
            return r
          })
          return updatedRecipes
        })
        onClose()
      })
      .catch((error) => {
        console.log("Error:", error)
      })
  }

  return (
    <>
      <Modal opened={!!recipe} onClose={onClose} title="Edit Recipe">
        <form onSubmit={form.onSubmit(() => handleOnSubmit(form.values))}>
          <TextInput mt="md" withAsterisk label="Recipe Name" placeholder="Apple Pie" {...form.getInputProps('name')} />
          <TextInput mt="md" withAsterisk label="Ingredients (comma-separated)" placeholder="Apple, Flour, Cinnamon" {...form.getInputProps('ingredients')} />
          <Textarea mt="md" withAsterisk autosize minRows={4} label="Directions" placeholder="1. Preheat oven to 375 F..." {...form.getInputProps('directions')} />

          <Group justify="left" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}