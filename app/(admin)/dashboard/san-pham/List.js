import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
const List = ({
  current,
  selectAll,
  handleSelect,
  handleSelectAll,
  deleteItem,
  getBrandName,
  getCategoryName,
  handleEditformPage,
}) => {
  const curData = current.reverse();
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
          <th>Hình</th>
          <th>Tên</th>
          <th>Nhãn Hiệu</th>
          <th>Danh mục</th>
          <th>Giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {curData.map((cur, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                data-id={cur._id}
                onChange={handleSelect}
              />{" "}
            </td>
            <td>{index + 1}</td>
            <td className="img__field">
              <img className="img__td" src={cur.images[0]} alt="img" />
            </td>
            <td>{cur.productName}</td>
            <td>{getBrandName(cur.brand)}</td>
            <td>{getCategoryName(cur.category)}</td>
            <td>{cur.price} VNĐ</td>
            <td>
              <FontAwesomeIcon
                className="admin__icon"
                icon={faPencil}
                onClick={() => handleEditformPage(cur._id)}
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
