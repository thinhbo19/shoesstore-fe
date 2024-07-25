import ResetPass from "../../ResetPass";

export default function ResetPassPage({ params }) {
  const { token } = params;
  return <ResetPass tokenPass={token} />;
}
