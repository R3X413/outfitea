
import { UserButton, useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard de {user?.firstName}</h1>
      <UserButton />
    </div>
  );
}
