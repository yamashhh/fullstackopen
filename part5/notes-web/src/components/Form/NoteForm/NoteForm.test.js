import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm/> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<NoteForm createNote={createNote} />);

  const input = screen.getByTestId("noteInput");
  const saveButton = screen.getByTestId("saveButton");
  const testString = "tesing a form...";

  await user.type(input, testString);
  await user.click(saveButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe(testString);
});
