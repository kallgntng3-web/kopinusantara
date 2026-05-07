import { useState, FormEvent } from "react";
import { CalendarDays, Clock, Users, User, Phone, FileText, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAdmin } from "@/context/AdminContext";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
];

interface Form {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
}

const EMPTY: Form = { name: "", phone: "", date: "", time: "", guests: "2", notes: "" };

function InputField({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-ui text-xs tracking-widest uppercase text-cream/50 flex items-center gap-1.5">
        <Icon size={11} />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-roast border border-gold/20 text-cream placeholder-cream/30 font-ui text-sm px-4 py-3 rounded-sm outline-none focus:border-gold/60 transition-colors duration-300";

export default function ReservationSection() {
  const sectionRef = useScrollReveal();
  const { dispatch } = useAdmin();
  const [form, setForm] = useState<Form>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      dispatch({
        type: "ADD_RESERVATION",
        reservation: {
          id: `r_${Date.now()}`,
          name: form.name,
          phone: form.phone,
          date: form.date,
          time: form.time,
          guests: parseInt(form.guests, 10),
          notes: form.notes,
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      });
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setForm(EMPTY);
    setSubmitted(false);
  };

  return (
    <section
      id="reservasi"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--gradient-cream)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 30%, hsl(var(--gold)) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="section-label reveal">Buat Janji Kunjungan</p>
          <div className="gold-divider my-5 reveal reveal-delay-1" />
          <h2 className="font-display text-espresso text-4xl sm:text-5xl lg:text-6xl leading-tight reveal reveal-delay-2">
            Reservasi{" "}
            <span
              className="italic"
              style={{
                background: "var(--gradient-gold)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Meja
            </span>
          </h2>
          <p className="font-serif-body text-muted-foreground text-lg max-w-md mx-auto mt-4 leading-relaxed italic reveal reveal-delay-3">
            Pastikan tempat duduk terbaik tersedia untuk Anda. Reservasi gratis, tanpa biaya tambahan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-5 reveal reveal-delay-2">
            {[
              {
                icon: CalendarDays,
                title: "Reservasi Mudah",
                desc: "Isi formulir sederhana dan kami konfirmasi dalam 1–2 jam kerja.",
              },
              {
                icon: CheckCircle2,
                title: "Konfirmasi via WA",
                desc: "Tim kami akan menghubungi nomor Anda untuk konfirmasi reservasi.",
              },
              {
                icon: Users,
                title: "Grup & Acara Khusus",
                desc: "Untuk grup > 10 orang atau acara spesial, hubungi kami langsung.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 bg-cream rounded-sm border border-gold/10 hover:border-gold/25 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                  <item.icon size={15} className="text-gold" />
                </div>
                <div>
                  <p className="font-display text-espresso text-base mb-0.5">{item.title}</p>
                  <p className="font-serif-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 reveal reveal-delay-3">
            <div className="bg-espresso rounded-sm border border-gold/20 overflow-hidden shadow-deep">
              {/* Form header */}
              <div className="h-1" style={{ background: "var(--gradient-gold)" }} />
              <div className="px-7 py-6">
                {submitted ? (
                  /* Success state */
                  <div className="flex flex-col items-center text-center gap-5 py-8">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "var(--gradient-gold)" }}
                    >
                      <CheckCircle2 size={28} className="text-espresso" />
                    </div>
                    <div>
                      <h3 className="font-display text-cream text-2xl mb-2">Reservasi Terkirim!</h3>
                      <p className="font-serif-body text-cream/60 text-base leading-relaxed italic">
                        Terima kasih, <strong className="text-cream font-normal">{form.name}</strong>!<br />
                        Tim kami akan menghubungi <strong className="text-gold font-normal">{form.phone}</strong> untuk konfirmasi.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="btn-shimmer font-ui text-xs tracking-widest uppercase font-medium px-8 py-3 rounded-sm hover:scale-105 transition-transform duration-300"
                    >
                      Buat Reservasi Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField icon={User} label="Nama Lengkap">
                        <input
                          className={inputCls}
                          type="text"
                          value={form.name}
                          onChange={set("name")}
                          required
                          placeholder="Nama Anda"
                        />
                      </InputField>
                      <InputField icon={Phone} label="Nomor WhatsApp">
                        <input
                          className={inputCls}
                          type="tel"
                          value={form.phone}
                          onChange={set("phone")}
                          required
                          placeholder="0812..."
                        />
                      </InputField>
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField icon={CalendarDays} label="Tanggal">
                        <input
                          className={inputCls}
                          type="date"
                          value={form.date}
                          onChange={set("date")}
                          required
                          min={today}
                        />
                      </InputField>
                      <InputField icon={Clock} label="Jam Kunjungan">
                        <select
                          className={inputCls}
                          value={form.time}
                          onChange={set("time")}
                          required
                        >
                          <option value="" disabled>Pilih jam...</option>
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t}>{t} WIB</option>
                          ))}
                        </select>
                      </InputField>
                    </div>

                    {/* Guests */}
                    <InputField icon={Users} label="Jumlah Tamu">
                      <select
                        className={inputCls}
                        value={form.guests}
                        onChange={set("guests")}
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>{n} orang</option>
                        ))}
                        <option value="11">Lebih dari 10 orang (hubungi kami)</option>
                      </select>
                    </InputField>

                    {/* Notes */}
                    <InputField icon={FileText} label="Catatan Khusus (opsional)">
                      <textarea
                        className={`${inputCls} resize-none`}
                        rows={3}
                        value={form.notes}
                        onChange={set("notes")}
                        placeholder="Misalnya: anniversary, meja dekat jendela, butuh kursi bayi..."
                      />
                    </InputField>

                    {/* Gold divider */}
                    <div className="h-px w-full opacity-20" style={{ background: "var(--gradient-gold)" }} />

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-shimmer font-ui text-sm tracking-[0.2em] uppercase font-semibold py-4 rounded-sm hover:scale-[1.02] transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Mengirim Reservasi..." : "Konfirmasi Reservasi"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
