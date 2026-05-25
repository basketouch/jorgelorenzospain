import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase-server";
import StagesClient from "./StagesClient";

export const metadata = { title: "Stages Spain — Jorge Lorenzo Coach" };

export default async function StagesPage() {
  let hasUser = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    hasUser = !!user;
  } catch { /* anonymous */ }

  return (
    <>
      <StagesClient hasUser={hasUser} />
      <Footer />
    </>
  );
}
