import { createClient } from "@supabase/supabase-js";
import UploadForm from "@/components/UploadForm";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function Home() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: schedules, error } = await supabase
    .from("medication_schedules")
    .select("*")
    .order("time_due", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
  }

  const medications = schedules ?? [];

  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-graphite-olive">
          Medication tracker
        </h1>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
          <section className="lg:min-w-0">
            <UploadForm />
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-graphite-olive">
              Scheduled medications
            </h2>
            {medications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-graphite-muted bg-white/80 p-8 text-center backdrop-blur-sm">
                <p className="text-graphite-slate">
                  No medications scheduled yet. Upload a prescription to add
                  reminders.
                </p>
              </div>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {medications.map((row: {
                  id?: string;
                  medication_name?: string;
                  dosage?: string;
                  patient_phone_number?: string;
                  time_due?: string;
                }) => (
                  <li
                    key={row.id ?? `${row.patient_phone_number}-${row.time_due}-${row.medication_name}`}
                    className="rounded-2xl border border-graphite-muted bg-white/90 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <p className="font-medium text-graphite-olive">
                      {row.medication_name ?? "—"}
                    </p>
                    <p className="mt-1 text-sm text-graphite-slate">
                      {row.dosage ?? "—"}
                    </p>
                    <p className="mt-1 text-sm text-graphite-slate/90">
                      {row.patient_phone_number ?? "—"}
                    </p>
                    <p className="mt-2 text-xs font-medium text-graphite-muted">
                      Due: {row.time_due ?? "—"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
