const Message = ({ message, isError }) => {
  return (
    message && (
      <p className={`message-component${isError ? " -error" : ""}`}>
        {message}
      </p>
    )
  );
};

export default Message;
