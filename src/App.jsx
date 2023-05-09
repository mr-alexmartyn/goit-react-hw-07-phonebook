import React from 'react';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './Components/ContactForm';
import Filter from './Components/Filter';
import ContactList from './Components/ContactList';
import Container from './Components/Container';
import { ChakraProvider, Heading } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className={s.App}>
        <Container>
          <Heading mb={5}>Phonebook</Heading>
          <ContactForm />
          <Heading mb={5}>Contacts</Heading>
          <Filter />
          <ContactList />
        </Container>
        <ToastContainer
          autoClose={2000}
          position="top-right"
          hideProgressBar={true}
        />
      </div>
    </ChakraProvider>
  );
}

export default App;
