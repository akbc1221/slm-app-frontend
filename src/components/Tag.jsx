const Tag = ({ tag }) => {
  return (
    <>
      <span className="badge rounded-pill bg-secondary">{tag.trim()}</span>
      &nbsp;
    </>
  );
};

export default Tag;
