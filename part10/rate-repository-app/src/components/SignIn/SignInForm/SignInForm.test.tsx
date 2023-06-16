import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { type ComponentPropsWithoutRef } from "react";
import SignInForm, { PLACEHOLDER, SIGN_IN_TEXT } from ".";

const MOCK_DATA = {
  USERNAME: "test_username",
  PASSWORD: "test_password",
} as const;

describe("SignInForm", () => {
  it("calls handleSubmit function with correct arguments when a valid form is submitted", async () => {
    const signIn = jest.fn<
      // XXX
      ReturnType<ComponentPropsWithoutRef<typeof SignInForm>["signIn"]>,
      Parameters<ComponentPropsWithoutRef<typeof SignInForm>["signIn"]>,
      ComponentPropsWithoutRef<typeof SignInForm>["signIn"]
    >();

    render(<SignInForm {...{ signIn, loading: false }} />);

    fireEvent.changeText(
      screen.getByPlaceholderText(PLACEHOLDER.USERNAME),
      MOCK_DATA.USERNAME
    );
    fireEvent.changeText(
      screen.getByPlaceholderText(PLACEHOLDER.PASSWORD),
      MOCK_DATA.PASSWORD
    );
    fireEvent.press(screen.getByText(SIGN_IN_TEXT));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(1);
      expect(signIn.mock.calls[0][0]).toEqual({
        username: MOCK_DATA.USERNAME,
        password: MOCK_DATA.PASSWORD,
      });
    });
  });
});
