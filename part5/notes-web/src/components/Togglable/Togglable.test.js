import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";

describe("<Togglable/>", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div data-testid="testDiv">togglable content</div>
      </Togglable>
    );
  });

  test("renders its children", async () => {
    await screen.findByTestId("toggleButton");
  });

  test("at start the children are not displayed", () => {
    const element = container.getByTestId("togglableContent");
    expect(element).not.toHaveTextContent("togglable content");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByTestId("toggleButton");
    await user.click(button);

    const element = container.queryByTestId("testDiv");
    expect(element).not.toBeNull();
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();

    const openButton = screen.getByTestId("toggleButton");
    await user.click(openButton);

    const closeButton = screen.getByTestId("toggleButton");
    await user.click(closeButton);

    const descendant = container.queryByTestId("testDiv");
    expect(descendant).toBeNull();
  });
});
