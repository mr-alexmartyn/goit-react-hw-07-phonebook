import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './ContactListItem.module.css';
import { useDeleteContactsMutation } from '../../redux/ContactsApi';

function ContactListItem({ name, phone, id }) {
  const [deleteContacts, { isLoading: isDeleting, isSuccess, error }] =
    useDeleteContactsMutation();

  useEffect(() => {
    isSuccess && toast.info(` ${name} was removed from the phone book`);
    error && toast.error('oops something went wrong');
  }, [isSuccess, name, error]);

  return (
    <li className={s.contact} key={id}>
      <p>
        {name}: {phone}
      </p>
      <button
        className={s.button}
        type="button"
        onClick={() => deleteContacts(id)}
        disabled={isDeleting}
      >
        {isDeleting ? 'Delete...' : 'Delete'}
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ContactListItem;
