import { useState } from "react";
import Notify from "./components/Notify";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneForm from "./components/PhoneForm";
import { useAllPersonsQuery } from "./generated/graphql";

const App = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, data } = useAllPersonsQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  const notify = (message: string): void => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 10_000);
  };

  return (
    <>
      <Notify errorMessage={errorMessage} />
      {data?.allPersons !== undefined && <Persons persons={data.allPersons} />}
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
};

export default App;
