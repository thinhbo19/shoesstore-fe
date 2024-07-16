import ControlInfor from "./ControlInfor";

export default function InfomationUserLayout({ children }) {
  return (
    <div className="container-thongtin">
      <ControlInfor />
      {children}
    </div>
  );
}
