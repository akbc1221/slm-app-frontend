import ListItem from "./ListItem";

const List = ({ data, getId, indexOfFirstPost, indexOfLastPost, makeClone }) => {
  return (
    <div className="accordion" id="list">
      {Object.keys(data)
        .slice(indexOfFirstPost, indexOfLastPost)
        .reverse()
        .map((id) => {
          return <ListItem item={data[id]} getId={getId} key={id} makeClone={makeClone} />;
        })}
    </div>
  );
};

export default List;
