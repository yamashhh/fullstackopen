import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import { PAGE_TYPE, LOCAL_STORAGE_KEY } from "./constants";

const App = (): JSX.Element => {
  const [page, setPage] = useState<typeof PAGE_TYPE[keyof typeof PAGE_TYPE]>(
    PAGE_TYPE.AUTHORS
  );
  const [token, setToken] = useState<string | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token != null) {
      setToken(token);
    }
  }, []);

  const logout = async (): Promise<void> => {
    setToken(null);
    localStorage.clear();
    await client.resetStore();
    setPage("authors");
  };

  return (
    <>
      <header>
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              columnGap: "16px",
              paddingInline: "unset",
            }}
          >
            <li>
              <button onClick={() => setPage(PAGE_TYPE.AUTHORS)}>
                {PAGE_TYPE.AUTHORS}
              </button>
            </li>
            <li>
              <button onClick={() => setPage(PAGE_TYPE.BOOKS)}>
                {PAGE_TYPE.BOOKS}
              </button>
            </li>
            {token != null ? (
              <>
                <li>
                  <button onClick={() => setPage(PAGE_TYPE.ADD)}>
                    {PAGE_TYPE.ADD}
                  </button>
                </li>
                <li>
                  <button onClick={logout}>logout</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => setPage(PAGE_TYPE.LOGIN)}>
                  {PAGE_TYPE.LOGIN}
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        {(() => {
          switch (page) {
            case PAGE_TYPE.AUTHORS: {
              return <Authors token={token} />;
            }
            case PAGE_TYPE.BOOKS: {
              return <Books />;
            }
            case PAGE_TYPE.ADD: {
              return <NewBook />;
            }
            case PAGE_TYPE.LOGIN: {
              return <Login setToken={setToken} setPage={setPage} />;
            }
            default: {
              return null;
            }
          }
        })()}
      </main>
    </>
  );
};

export default App;
