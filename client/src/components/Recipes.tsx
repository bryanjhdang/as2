import { Text, Title, Anchor, Modal, Box, Divider, Accordion, ActionIcon, AccordionControlProps, Center, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

function AccordionControl(props: AccordionControlProps) {
  return (
    <Center>
      <Accordion.Control {...props} />
      <Tooltip label="Edit">
        <ActionIcon onClick={EditRecipe} size="lg" variant="subtle" color="gray" mr="5">
          <IconEdit size="1rem" />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon onClick={DeleteRecipe} size="lg" variant="subtle" color="gray" mr="10">
          <IconTrash size="1rem" />
        </ActionIcon>
      </Tooltip>
    </Center>
  );
}

function EditRecipe() {


  alert("edit");
  // open a modal and fill it with the details from the recipe that was clicked
}

function DeleteRecipe() {
  alert("delete");
  // make the api call to delete
  // refresh the recipes list
}

export default function Recipes() {
  const dummyItems = [
    { value: 'Item 1', emoji: '🍎', description: 'Description for Item 1' },
    { value: 'Item 2', emoji: '🍌', description: 'Description for Item 2' },
    { value: 'Item 3', emoji: '🍇', description: 'Description for Item 3' },
  ];

  // Map through the dummy data to generate Accordion items
  const items = dummyItems.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div>
      <Box m="1rem">
        <Title order={3} pb="15">Saved Recipes</Title>

        {/* <Accordion variant="separated" defaultValue={"Test"}> */}
        {/* {items} */}
        {/* </Accordion> */}

        <Accordion variant="separated" chevronPosition="left">
          <Accordion.Item value="item-1">
            <AccordionControl>Recipe 1</AccordionControl>
            <Accordion.Panel>
              <Text color='gray' pb="10">Date: 4/15/2023</Text>

              <Box pb="10">
                <Title order={5}>Ingredients</Title>
                <Text>Ingredients...</Text>
              </Box>

              <Box pb="10">
                <Title order={5}>Directions</Title>
                <Text>Directions...</Text>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="item-2">
            <AccordionControl>Recipe 2</AccordionControl>
            <Accordion.Panel>Description 2</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="item-3">
            <AccordionControl>Recipe 3</AccordionControl>
            <Accordion.Panel>Description 3</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
    </div>
  )
}