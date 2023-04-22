import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const LS_KEY = 'saved_contacts';

export default function App() {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? defaultContacts;
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const addContact = data => {
    const contact = {
      id: data.id,
      name: data.name,
      number: data.number,
    };

    if (contacts.map(contact => contact.name).includes(contact.name)) {
      alert(contact.name + ' is already in contacts');
      return;
    } else {
      setContacts(contacts => [contact, ...contacts]);
    }
  };

  const formSubmitHandler = data => {
    addContact(data);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    const contArr = contacts.filter(contact => contact.id !== contactId);
    setContacts(contacts => [...contArr]);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList data={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
