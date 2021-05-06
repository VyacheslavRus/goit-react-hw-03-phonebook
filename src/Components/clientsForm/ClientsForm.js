import React, { Component } from 'react'

class ClientsForm extends Component {

    state = {
        name: "",
        number: "",
    }

    changeInput = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.onCheckRepeated(this.state.name)) {
            alert(`${this.state.name} is already in contacts.`);
            return
        };
        this.props.addClient(this.state);
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                Name:
                <input
                    onChange={this.changeInput}
                    type="text"
                    name="name"
                    value={this.state.name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                />
          Number:
                <input
                    onChange={this.changeInput}
                    type="tel"
                    name="number"
                    value={this.state.number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                />
                <button type="submit">Add</button>
            </form>
        );
    }
}

export default ClientsForm;