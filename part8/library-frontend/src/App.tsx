import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

export const PAGE_TYPE = {
  AUTHORS: "authors",
  BOOKS: "books",
  ADD: "add",
} as const;

const App = () => {
  const [page, setPage] =
    useState<typeof PAGE_TYPE[keyof typeof PAGE_TYPE]>("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
