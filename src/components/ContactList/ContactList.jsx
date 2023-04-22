import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ data, onDeleteContact }) => {
  if (!data) return;
  else {
    return (
      <ul className={css.contacts_box}>
        {data.map(({ id, name, number }) => (
          <li key={id} className={css.contacts_item}>
            <span key={id} className={css.contacts_text}>
              {name}: {number}
            </span>
            <button className={css.del_btn} onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

ContactList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape),
  onDeleteContact: PropTypes.func,
};

export default ContactList;
