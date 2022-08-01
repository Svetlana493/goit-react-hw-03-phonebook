import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';

const ContactListItem = props => {
  const { contacts, deleteContact } = props;
  const { id, name, number } = contacts;

  return (
    <li className={styles.item}>
      <span className={styles.span}>
        {name}: {number}
      </span>
      <button
        className={styles.btn}
        onClick={() => {
          deleteContact(id);
        }}
        onMouseDown={e => {
          e.target.style.backgroundColor = '#0a95ff';
        }}
        onMouseUp={e => {
          e.target.style.backgroundColor = 'transparent';
        }}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contacts: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),

  deleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
