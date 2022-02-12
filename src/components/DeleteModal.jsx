const DeleteModal = ({ deleteById, itemId, deleteAll, deleteAllFlag }) => {
  return (
    <>
      <div className="modal" tabIndex={-1} id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`Delete ${deleteAllFlag ? "all" : "recent"}`}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p>{`Are you sure you want to delete ${deleteAllFlag ? "all items" : "this item"}?`}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {!deleteAllFlag ? (
                <button
                  onClick={async () => {
                    await deleteById(itemId);
                  }}
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal">
                  Delete
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await deleteAll();
                  }}
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal">
                  Delete all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
