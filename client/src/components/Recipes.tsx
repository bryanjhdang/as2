import { useState, useEffect } from 'react';
import { Text, Title, Modal, Box, Accordion, ActionIcon, AccordionControlProps, Center, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import EditRecipeForm from './EditRecipeForm';

function AccordionControl(props: AccordionControlProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Recipe" centered>
        <EditRecipeForm></EditRecipeForm>
      </Modal>

      <Center>
        <Accordion.Control {...props} />
        <Tooltip label="Edit">
          <ActionIcon onClick={open} size="lg" variant="subtle" color="gray" mr="5">
            <IconEdit size="1rem" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon onClick={DeleteRecipe} size="lg" variant="subtle" color="gray" mr="10">
            <IconTrash size="1rem" />
          </ActionIcon>
        </Tooltip>
      </Center>
    </>
  );
}

function EditRecipe() {

  alert("edit");
  // open a modal and fill it with the details from the recipe that was clicked
  // recipes list
  // i need all of the information here
  // i could just get the id, and then it'd be a simple GET request, and save wwould be another POST request
}

function DeleteRecipe() {
  alert("delete");
  // i just need the id here
  // make the api call to delete
  // refresh the recipes list
}

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:8080/recipes')
      .then(response => {
        setRecipes(response.data)
      })
      .catch((error) => {
        console.log("Error:", error)
      })
  })

  const dummyItems = [
    { id: 123, value: 'Item 1', date: '3/8/2024, 12:08:46 PM', ingredients: 'Ingredients for Item 1', directions: 'Directions for Item 1' },
    { id: 325, value: 'Item 2', date: '1/31/2020, 05:41:35 AM', ingredients: 'Ingredients for Item 2', directions: 'Directions for Item 2' },
    { id: 355, value: 'Item 3', date: '8/04/1997, 10:28:23 AM', ingredients: 'Ingredients for Item 3', directions: 'Directions for Item 3' },
  ];

  // Map through the dummy data to generate Accordion items - need to change this to grab from the API
  const items = dummyItems.map((item) => (
    <Accordion.Item key={item.id} value={item.value}>
      <AccordionControl>{item.value}</AccordionControl>
      <Accordion.Panel>
        <Text c='gray' pb="10">Last Modified: {item.date}</Text>
        <Box pb="10">
          <Text fw={700}>Ingredients</Text>
          <Text>{item.ingredients}</Text>
        </Box>
        <Box pb="10">
          <Text fw={700}>Directions</Text>
          <Text>{item.directions}</Text>
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