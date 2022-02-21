const Tag = ({ tag }) => {
  return (
    <>
      <span className="badge rounded-pill bg-secondary" title={tag.trim()}>
        {tag.trim()}
      </span>
      &nbsp;
    </>
  );
};

export default Tag;
