import ListItem from "./ListItem";

const List = ({ data, getId }) => {
  return (
    <div className="accordion" id="list">
      {Object.keys(data)
        .reverse()
        .map((id) => {
          return <ListItem item={data[id]} getId={getId} key={id} />;
        })}
    </div>
  );
};

export default List;
