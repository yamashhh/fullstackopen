import {
  useApolloClient,
  type ApolloCache,
  type DocumentNode,
} from "@apollo/client";
import { type MouseEventHandler, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneForm from "./components/PhoneForm";
import {
  useAllPersonsQuery,
  usePersonAddedSubscription,
  AllPersonsDocument,
  type PersonAddedSubscription,
} from "./generated/graphql";

export const updateCache = (
  cache: ApolloCache<object>,
  query: {
    query: DocumentNode;
  },
  addedPerson: PersonAddedSubscription["personAdded"]
): void => {
  const uniqByName = (a: any): any => {
    const seen = new Set();
    return a.filter((item: any) => {
      const k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
};

const App = (): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, data } = useAllPersonsQuery();
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("part8-phonebook-user-token");
    if (token !== null) {
      setToken(token);
    }
  }, []);

  usePersonAddedSubscription({
    onData({ data }) {
      const addedPerson = data.data?.personAdded;
      if (addedPerson == null) {
        return;
      }
      notify(`${String(addedPerson?.name)} added`);
      updateCache(client.cache, { query: AllPersonsDocument }, addedPerson);
    },
  });

  if (loading) {
    return <h2>loading...</h2>;
  }

  const notify = (message: string): void => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 10_000);
  };

  const logout: MouseEventHandler<HTMLButtonElement> = async () => {
    setToken(null);
    localStorage.clear();
    await client.resetStore();
  };

  if (token === null) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      {data?.allPersons !== undefined && <Persons persons={data.allPersons} />}
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
};

export default App;
