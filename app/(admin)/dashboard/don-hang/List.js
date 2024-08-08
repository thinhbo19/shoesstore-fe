import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/hooks/useFormatTime";

const List = ({
  currentOrders,
  selectAll,
  handleSelect,
  handleSelectAll,
  deleteItem,
  returnValue,
  selectedOption,
  hanldePaymentMethod,
  hanleSetShipping,
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
          <th>STT</th>
          <th>Người đặt</th>
          <th>Số lượng sản phẩm</th>
          <th>Tổng tiền</th>
          <th>Thanh toán</th>
          <th>Phương thức</th>
          <th>Ngày tạo</th>
          <th>Trạng thái</th>
          {selectedOption === "Success" ? null : <th>Hành động</th>}
        </tr>
      </thead>
      <tbody>
        {currentOrders?.map((order, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                data-id={order._id}
                onChange={handleSelect}
              />{" "}
            </td>
            <td>{index + 1}</td>
            <td>{order.username}</td>
            <td>{order.products.length} đôi</td>
            <td>{order.totalPrice.toLocaleString()} VNĐ</td>
            <td>{hanldePaymentMethod(order.paymentMethod)}</td>
            <td>{formatDate(order.createdAt)}</td>
            <td>{returnValue(order.status)}</td>
            {selectedOption === "Processing" ? (
              <td>
                <button
                  onClick={() => hanleSetShipping(order._id)}
                  className="btn__orderAdmin processing"
                >
                  Xác nhận giao
                </button>
              </td>
            ) : null}

            <td>
              <FontAwesomeIcon className="admin__icon" icon={faPencil} />
              <FontAwesomeIcon
                className="admin__icon"
                onClick={() => deleteItem(order._id)}
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
