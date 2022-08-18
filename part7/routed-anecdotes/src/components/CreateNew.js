import useField from "../hooks/useField";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const contentAttributes = {
    name: "content",
    type: content.type,
    value: content.value,
    onChange: content.onChange,
  };

  const authorAttributes = {
    name: "author",
    type: author.type,
    value: author.value,
    onChange: author.onChange,
  };

  const infoAttributes = {
    name: "info",
    type: info.type,
    value: info.value,
    onChange: info.onChange,
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...contentAttributes} />
        </div>
        <div>
          author
          <input {...authorAttributes} />
        </div>
        <div>
          url for more info
          <input {...infoAttributes} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
