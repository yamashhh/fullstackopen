import { FormEventHandler, useState } from "react";
import { useEditNumberMutation } from "../generated/graphql";

interface Props {
  setError: (arg0: string) => void;
}

const PhoneForm = ({ setError }: Props): JSX.Element => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [changeNumber] = useEditNumberMutation();

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await changeNumber({
      variables: { name, phone },
      onError(error) {
        setError(error.graphQLErrors[0].message);
      },
    });
    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>change number</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        onSubmit={submit}
      >
        <label>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label>
          phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </label>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
