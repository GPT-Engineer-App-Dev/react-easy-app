import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Your Simple React App</Heading>
        <Text fontSize="xl">This is a simple React application built with Chakra UI.</Text>
        <Button leftIcon={<FaRocket />} colorScheme="teal" size="lg">
          <Link to="/animals">Manage Animals</Link>
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;