import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const List = ({
  current,
  selectAll,
  handleSelect,
  handleSelectAll,
  deleteItem,
  handleChangeIsBlocked,
  handleChangeRole,
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
          <th>Avatar</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {current.map((user, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                data-id={user._id}
                onChange={handleSelect}
              />{" "}
            </td>
            <td>{index + 1}</td>
            <td className="img__field">
              {user.Avatar ? (
                <img className="img__td" src={user.Avatar} alt="img" />
              ) : (
                "No Avatar"
              )}
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>
              <select
                onChange={(event) =>
                  handleChangeRole(user._id, event.target.value)
                }
                name="userRole"
                value={user.role}
                id="userRole"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Staff">Staff</option>
              </select>
            </td>
            <td>
              {user.role === "Admin" ? (
                <></>
              ) : (
                <input
                  type="checkbox"
                  className="round-checkbox"
                  checked={user.isBlocked}
                  onChange={() =>
                    handleChangeIsBlocked(user._id, user.isBlocked)
                  }
                />
              )}
            </td>
            <td>
              <FontAwesomeIcon
                className="admin__icon"
                onClick={() => deleteItem(user._id)}
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
