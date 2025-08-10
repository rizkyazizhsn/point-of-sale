import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export default function Home() {
  const { profile } = useAuthStore()
  const redirectLink = profile.role === 'admin' ? '/admin' : '/order'

  return (
    <div className="bg-muted flex justify-center items-center h-screen flex-col space-y-4">
      <h1 className="text-4xl font-semibold">Welcome</h1>
      <Link href={redirectLink}>
        <Button className="bg-teal-500 text-white">Access Dashboard</Button>
      </Link>
    </div>
  );
}
