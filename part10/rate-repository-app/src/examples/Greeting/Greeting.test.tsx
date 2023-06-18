import { render, screen } from "@testing-library/react-native";
import Greeting from ".";

describe("Greeting", () => {
  it("renders a greeting message based on the name prop", () => {
    render(<Greeting name="Kalle" />);
    screen.debug();
    expect(screen.getByText("Hello Kalle!")).toBeDefined();
  });
});
