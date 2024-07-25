import ResetPass from "../../ResetPass";

export async function generateStaticParams() {
  return token;
}

export default function ResetPassPage({ params }) {
  const { token } = params;
  return <ResetPass tokenPass={token} />;
}
