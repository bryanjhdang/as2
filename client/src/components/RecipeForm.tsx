import { isNotEmpty, useForm } from '@mantine/form';
import { Title, Textarea, TextInput, Button, Group, Box } from '@mantine/core';

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
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput mt="md" withAsterisk label="Recipe Name" placeholder="Recipe Name" {...form.getInputProps('name')} />
        <Textarea mt="md" withAsterisk label="Ingredients" placeholder="Ingredients" {...form.getInputProps('ingredients')} />
        <Textarea mt="md" withAsterisk label="Directions" placeholder="Directions" {...form.getInputProps('directions')} />

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