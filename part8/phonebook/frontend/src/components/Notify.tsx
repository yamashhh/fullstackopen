interface Props {
  errorMessage: string;
}

const Notify = ({ errorMessage }: Props): JSX.Element | null => {
  if (errorMessage === "") {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default Notify;
