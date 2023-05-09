import { useSelector } from 'react-redux';
import { useGetContactQuery } from '../../redux/ContactsApi';
import ContactListItem from '../ContactListItem';
import { Spinner } from '@chakra-ui/react';
import s from './ContactList.module.css';

function ContactList() {
  const { data, isFetching } = useGetContactQuery();
  const filter = useSelector(state => state.filter);

  const contacts =
    data && data.filter(contact => contact.name.toLowerCase().includes(filter));
  return (
    <>
      {data && data.length !== 0 && (
        <ul className={s.contactList}>
          {contacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
        </ul>
      )}
      {data && data.length === 0 && <p>'You have no contacts'</p>}
      {isFetching && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </>
  );
}

export default ContactList;
