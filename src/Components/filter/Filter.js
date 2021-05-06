import React from "react";

const Filter = ({ filter, doFilter }) => {
  return (
    <input
      type="text"
      name="filter"
      onChange={doFilter}
      value={filter}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
      required
    />
  );
};

export default Filter;
