import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = !filter
    ? persons
    : persons.filter((person) => {
        return person.name.toUpperCase().includes(filter.toUpperCase());
      });

  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
  };

  const handleNameChange = ({ target }) => {
    setNewName(target.value);
  };

  const handlePhoneChange = ({ target }) => {
    setNewPhone(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isInvalidName = persons.find((person) => person.name === newName);

    if (isInvalidName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, phone: newPhone }]);
    setNewName("");
    setNewPhone("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
