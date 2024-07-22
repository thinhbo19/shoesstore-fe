import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const List = ({
  current,
  selectAll,
  handleSelect,
  handleSelectAll,
  deleteItem,
  formatVocher,
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
          <th>Tên</th>
          <th>Giảm %</th>
          <th>Tổng tiền tối thiểu</th>
          <th>Hết hạn</th>
          <th>Hành động</th>
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
            <td>{cur.name}</td>
            <td>{cur.discount} %</td>
            <td>{cur.exclusive} VNĐ</td>
            <td>{formatVocher(cur.expiry)}</td>
            <td>
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
