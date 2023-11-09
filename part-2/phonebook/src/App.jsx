import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "./services/persons";
import Message from "./Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  //fetch all data once
  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  //filter persons
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

  //add new person
  const handleSubmit = (event) => {
    event.preventDefault();
    //validate unique names or to change
    const personFound = persons.find((person) => person.name === newName);
    if (personFound) {
      const replace = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (!replace) return;

      const personChanged = { ...personFound, number: newPhone };
      personsService.update(personFound.id, personChanged).then((response) => {
        setPersons(
          persons.map((person) =>
            person.id !== personFound.id ? person : response
          )
        );
        setMessage(`updated ${personChanged.name}`);
        setNewName("");
        setNewPhone("");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }).catch(error => {
         setMessage(`${error.response.data.error}`);
         setError(true);
         setTimeout(() => {
           setMessage(null);
           setError(false);
         }, 5000);
      });
      return;
    }

    const person = { name: newName, number: newPhone };

    //post new person
    personsService
      .create(person)
      .then((response) => {
        setPersons([...persons, response]);
        setNewName("");
        setMessage(`Created ${response.name}`);
        setNewPhone("");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage(`${error.response.data.error}`);
        setError(true);
        setTimeout(() => {
          setMessage(null);
          setError(false);
        }, 5000);
      });
  };

  const handleDelete = (id, name) => {
    const result = confirm(`Delete ${name}?`);
    if (!result) return;

    personsService
      .deletePerson(id)
      .then(() => {
        setMessage(`${name} has been deleted`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage(
          `Information of ${name} has already been removed from server`
        );
        setError(true);
        setTimeout(() => {
          setMessage(null);
          setError(false);
        }, 5000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Message message={message} error={error} />}
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
