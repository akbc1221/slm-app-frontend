import ListItem from "./ListItem";

const List = ({ data, getId, indexOfFirstPost, indexOfLastPost }) => {
  return (
    <div className="accordion" id="list">
      {Object.keys(data)
        .slice(indexOfFirstPost, indexOfLastPost)
        .reverse()
        .map((id) => {
          return <ListItem item={data[id]} getId={getId} key={id} />;
        })}
    </div>
  );
};

export default List;
