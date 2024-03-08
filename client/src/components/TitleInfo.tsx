import { Title, Text } from '@mantine/core';

export default function TitleInfo() {
  return (
    <>
      <Title mb="10" order={1}>Recipe App</Title>
      <Text mb="10">Add a new recipe on the left, or check a saved recipe by clicking on one from the right. This pulls up a modal with information for the date created, ingredients, and directions.</Text>
      <Text mb="10">You can delete or edit recipes by clicking on the corresponding button.</Text>
    </>
  )
}