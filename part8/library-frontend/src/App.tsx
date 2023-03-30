import { useApolloClient } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import { PAGE_TYPE, LOCAL_STORAGE_KEY } from "./constants";
import {
  useBookAddedSubscription,
  AllBooksDocument,
} from "./generated/graphql";

/* eslint-disable */
export const uniqByAuthorId = (a: any) => {
  let seen = new Set();
  return a.filter((item: any) => {
    let k = item.author.id;
    return seen.has(k) ? false : seen.add(k);
  });
};
/* eslint-enable */

const App = (): JSX.Element => {
  const [page, setPage] = useState<(typeof PAGE_TYPE)[keyof typeof PAGE_TYPE]>(
    PAGE_TYPE.AUTHORS
  );
  const [token, setToken] = useState<string | null>(null);
  const client = useApolloClient();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token != null) {
      setToken(token);
    }
  }, []);

  const { data } = useBookAddedSubscription({
    onData({ data, client }) {
      const addedBook = data.data?.bookAdded;
      if (addedBook == null) {
        return;
      }
      client.cache.updateQuery(
        {
          query: AllBooksDocument,
        },
        (data) => {
          if (data != null) {
            return {
              allBooks: uniqByAuthorId(data.allBooks.concat(addedBook)),
            };
          }
        }
      );
      if (dialogRef.current?.open == null) {
        return;
      }
      if (dialogRef.current.open) {
        dialogRef.current.close();
        return;
      }
      dialogRef.current?.showModal();
    },
  });

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
              <button
                onClick={() => {
                  setPage(PAGE_TYPE.AUTHORS);
                }}
              >
                {PAGE_TYPE.AUTHORS}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setPage(PAGE_TYPE.BOOKS);
                }}
              >
                {PAGE_TYPE.BOOKS}
              </button>
            </li>
            {token != null ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      setPage(PAGE_TYPE.ADD);
                    }}
                  >
                    {PAGE_TYPE.ADD}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setPage(PAGE_TYPE.RECOMMEND);
                    }}
                  >
                    {PAGE_TYPE.RECOMMEND}
                  </button>
                </li>
                <li>
                  <button onClick={logout}>logout</button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    setPage(PAGE_TYPE.LOGIN);
                  }}
                >
                  {PAGE_TYPE.LOGIN}
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <dialog ref={dialogRef}>
        <form
          method="dialog"
          style={{ display: "flex", flexDirection: "column", rowGap: "24px" }}
        >
          added {data?.bookAdded?.title} by {data?.bookAdded?.author.name}
          <button>OK</button>
        </form>
      </dialog>
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
            case PAGE_TYPE.RECOMMEND: {
              return <Recommend />;
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
