import React, { Component } from "react";
import ClientList from "../clientList/ClientList";
// import { v4 as uuid } from "uuid";
import ClientsForm from "../clientsForm/ClientsForm";
import Filter from "../filter/Filter";
import axios from "axios";

class Clients extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://shop-a2177-default-rtdb.firebaseio.com/clients.json`
      );
      if (response.data) {
        const contactsObj = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));
        console.log(contactsObj);
        this.setState({ contacts: contactsObj });
      } else return;
    } catch (error) {}
  }

  addClient = async (client) => {
    try {
      const response = await axios.post(
        `https://shop-a2177-default-rtdb.firebaseio.com/clients.json`,
        client
      );
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          { ...client, id: response.data.name },
        ],
      }));
    } catch (error) {}
  };

  getFilter = () =>
    this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  doFilter = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  deleteClient = async (e) => {
    try {
      let { id } = e.target;
      await axios.delete(
        `https://shop-a2177-default-rtdb.firebaseio.com/clients/${id}.json`
      );
      this.setState({
        contacts: this.state.contacts.filter((el) => el.id !== id),
      });
    } catch (error) {}
  };

  onCheckRepeated = (name) => {
    return this.state.contacts.some((contact) => contact.name === name);
  };

  render() {
    return (
      <>
        <ClientsForm
          addClient={this.addClient}
          onCheckRepeated={this.onCheckRepeated}
        />
        <h2>Phonebook</h2>

        <Filter doFilter={this.doFilter} filter={this.state.filter} />
        <h2>Contacts</h2>
        <ClientList
          clients={this.getFilter()}
          deleteClient={this.deleteClient}
        />
      </>
    );
  }
}

export default Clients;
