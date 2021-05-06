import React from "react";

const ClientList = ({ clients, deleteClient }) => {
  return (
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          <p>
            {client.name}:{client.number}
          </p>
          <button type="button" onClick={deleteClient} id={client.id}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ClientList;
