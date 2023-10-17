const Persons = ({filteredPersons}) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
    </>
  );
}

export default Persons;