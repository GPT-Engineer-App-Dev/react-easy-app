import React, { useState } from 'react';
import { Container, Heading, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Select, FormControl, FormLabel } from '@chakra-ui/react';
import { useAnimals, useAddAnimal, useUpdateAnimal, useDeleteAnimal } from '../integrations/supabase/index.js';

const Animals = () => {
  const { data: animals, isLoading, isError } = useAnimals();
  const addAnimal = useAddAnimal();
  const updateAnimal = useUpdateAnimal();
  const deleteAnimal = useDeleteAnimal();

  const [newAnimal, setNewAnimal] = useState({
    name: '',
    type: '',
    size: '',
    country_of_origin: '',
    average_lifetime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnimal = () => {
    addAnimal.mutate(newAnimal);
    setNewAnimal({
      name: '',
      type: '',
      size: '',
      country_of_origin: '',
      average_lifetime: ''
    });
  };

  const handleUpdateAnimal = (id, updatedFields) => {
    updateAnimal.mutate({ id, ...updatedFields });
  };

  const handleDeleteAnimal = (id) => {
    deleteAnimal.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading animals</div>;

  return (
    <Container maxW="container.lg" mt={10}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Manage Animals</Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={newAnimal.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input name="type" value={newAnimal.type} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Size</FormLabel>
          <Input name="size" value={newAnimal.size} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Country of Origin</FormLabel>
          <Input name="country_of_origin" value={newAnimal.country_of_origin} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Average Lifetime</FormLabel>
          <Input name="average_lifetime" value={newAnimal.average_lifetime} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleAddAnimal}>Add Animal</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Size</Th>
              <Th>Country of Origin</Th>
              <Th>Average Lifetime</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {animals.map((animal) => (
              <Tr key={animal.id}>
                <Td><Input defaultValue={animal.name} onBlur={(e) => handleUpdateAnimal(animal.id, { name: e.target.value })} /></Td>
                <Td><Input defaultValue={animal.type} onBlur={(e) => handleUpdateAnimal(animal.id, { type: e.target.value })} /></Td>
                <Td><Input defaultValue={animal.size} onBlur={(e) => handleUpdateAnimal(animal.id, { size: e.target.value })} /></Td>
                <Td><Input defaultValue={animal['country of origin']} onBlur={(e) => handleUpdateAnimal(animal.id, { 'country of origin': e.target.value })} /></Td>
                <Td><Input defaultValue={animal['average lifetime']} onBlur={(e) => handleUpdateAnimal(animal.id, { 'average lifetime': e.target.value })} /></Td>
                <Td><Button colorScheme="red" onClick={() => handleDeleteAnimal(animal.id)}>Delete</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Animals;