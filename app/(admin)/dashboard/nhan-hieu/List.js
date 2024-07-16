import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const List = ({
  current,
  selectAll,
  handleSelect,
  handleSelectAll,
  handleOpenDialogEdit,
  deleteItem,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {current.map((cur, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                data-id={cur._id}
                onChange={handleSelect}
              />{" "}
            </td>
            <td>{index + 1}</td>
            <td>{cur.brandName}</td>
            <td>
              <FontAwesomeIcon
                className="admin__icon"
                onClick={() => handleOpenDialogEdit(cur)}
                icon={faPencil}
              />
              <FontAwesomeIcon
                className="admin__icon"
                onClick={() => deleteItem(cur._id)}
                icon={faTrash}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
