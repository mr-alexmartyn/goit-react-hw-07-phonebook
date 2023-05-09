import { useState, useEffect } from 'react';
import {
  useAddContactsMutation,
  useGetContactQuery,
} from '../../redux/ContactsApi';
import { toast } from 'react-toastify';
import s from './ContactForm.module.css';

function ContactForm() {
  const [addContacts, { isLoading, isSuccess, error }] =
    useAddContactsMutation();
  const { data } = useGetContactQuery();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameForToast, setnameForToast] = useState('');

  useEffect(() => {
    isSuccess &&
      toast.success(` ${nameForToast} added to contact book`, {
        autoClose: 800,
      });
    error && toast.error('oops something went wrong');
  }, [error, isSuccess, nameForToast]);

  const handleInputChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setnameForToast(name);

    data.every(item => item.name.toLowerCase() !== name.toLowerCase())
      ? addContacts({
          name: name,
          phone: number,
        })
      : toast.error(`${name} is alredy in contacts!!!`);

    setName('');
    setNumber('');
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label className={s.form}>
        <p>Name</p>
        <input
          onChange={handleInputChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={s.input}
        />
        <p>Number</p>
        <input
          onChange={handleInputChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className={s.input}
        />
        <button
          className={s.button}
          type="submit"
          disabled={number && name ? false : true}
        >
          {isLoading ? 'Add Contact...' : 'Add'}
        </button>
      </label>
    </form>
  );
}

export default ContactForm;
