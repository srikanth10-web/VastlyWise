import { AppHeader } from "@/components/app-header";
import { getUser } from "@/lib/actions";

export default async function WithCurrentUserHeader() {
  const user = await getUser();
  const currentUser = user
    ? {
        ...user,
        id: String(user.id),
        isAdmin: false,
      }
    : null;
  return <AppHeader logoUrl="/placeholder-logo.png" currentUser={currentUser} />;
} 