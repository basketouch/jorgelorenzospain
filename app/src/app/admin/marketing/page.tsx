import { createAdminClient } from "@/lib/supabase-admin";
import MarketingClient from "./MarketingClient";

export default async function MarketingPage() {
  const admin = createAdminClient();

  const [{ data: campanas }, { data: modulos }] = await Promise.all([
    admin.from("campanas_programadas").select("*, modulos(titulo, orden, portada_url)").order("enviar_en"),
    admin.from("modulos").select("id, titulo, orden, fecha_apertura, fecha_cierre_venta, cursos(titulo)").order("orden"),
  ]);

  return (
    <MarketingClient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      campanas={(campanas ?? []) as any}
      modulos={modulos ?? []}
    />
  );
}
