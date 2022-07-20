import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { Container, Title, Subtitle } from './App.styled.jsx';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    this.checkContactName(name)
      ? Notify.failure(`${name} is already in contacts`)
      : this.setState(prevState => {
          return {
            contacts: [
              ...prevState.contacts,
              {
                id: nanoid(10),
                name,
                number,
              },
            ],
          };
        });
  };

  checkContactName = name => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    return contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  handleChangeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  contactDelete = contactId => {
    this.setState(prevState => {
      const savedContacts = prevState.contacts.filter(
        contact => contact.id !== contactId
      );
      return { contacts: [...savedContacts] };
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />

        <Subtitle>Contacts</Subtitle>
        <Filter onChange={this.handleChangeFilter} filterValue={filter} />
        <ContactList
          contacts={this.visibleContacts()}
          onDeleteContact={this.contactDelete}
        />
      </Container>
    );
  }
}
