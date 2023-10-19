import Person from "./Person";

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id, person.name)}/>
      ))}
    </>
  );
};

export default Persons;
