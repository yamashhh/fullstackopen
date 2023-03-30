import { Person as P } from "../generated/graphql";

interface Props {
  person: Partial<P>;
  onClose: () => void;
}

const Person = ({ person, onClose }: Props): JSX.Element => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person?.address?.street} {person?.address?.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

export default Person;
