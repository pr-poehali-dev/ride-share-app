import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Page, UserRole } from "@/pages/Index";

interface HomePageProps {
  setPage: (p: Page) => void;
  role: UserRole;
}

const HERO_IMG = "https://cdn.poehali.dev/projects/938438cd-641e-438b-9a58-fc05bc40ac04/files/ef401ff9-2e34-4251-9c96-9e7c70dd03ee.jpg";

const quickStats = [
  { label: "Поездок", value: "1 248", icon: "Car", color: "#FF6B1A" },
  { label: "Рейтинг", value: "4.9 ★", icon: "Star", color: "#F59E0B" },
  { label: "Баланс", value: "₽ 3 450", icon: "Wallet", color: "#8B5CF6" },
];

const nearbyRides = [
  { from: "Арбат", to: "Аэропорт Шереметьево", price: 850, seats: 2, time: "09:30", driver: "Алексей К.", rating: 4.8 },
  { from: "ВДНХ", to: "Домодедово", price: 1100, seats: 3, time: "10:15", driver: "Марина Р.", rating: 4.9 },
  { from: "Сокольники", to: "Внуково", price: 620, seats: 1, time: "11:00", driver: "Дмитрий В.", rating: 4.7 },
];

export default function HomePage({ setPage, role }: HomePageProps) {
  const [offerPrice, setOfferPrice] = useState(false);
  const [selectedRide, setSelectedRide] = useState<number | null>(null);
  const [myPrice, setMyPrice] = useState("");

  return (
    <div className="px-4 space-y-5 pt-2">
      {/* Hero */}
      <div
        className="relative rounded-3xl overflow-hidden h-44"
        style={{ background: "var(--grad-1)" }}
      >
        <img
          src={HERO_IMG}
          alt="city"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div>
            <p className="text-white/70 text-sm font-medium">Доброе утро 👋</p>
            <h1 className="font-display text-white text-2xl font-800 leading-tight mt-0.5">
              Куда едем<br />сегодня?
            </h1>
          </div>
          <button
            onClick={() => setPage("search")}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-2xl px-4 py-2.5 w-full border border-white/20 hover:bg-white/25 transition-all"
          >
            <Icon name="Search" size={16} className="text-white/70" />
            <span className="text-white/70 text-sm">Откуда → Куда...</span>
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        {quickStats.map((s) => (
          <div key={s.label} className="card-glass rounded-2xl p-3 flex flex-col gap-1">
            <Icon name={s.icon} size={18} style={{ color: s.color }} />
            <p className="text-white font-bold text-base leading-tight">{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Role-specific CTA */}
      <div
        className="rounded-3xl p-4 flex items-center justify-between"
        style={{
          background:
            role === "driver"
              ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.1))"
              : "linear-gradient(135deg, rgba(255,107,26,0.2), rgba(139,92,246,0.1))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div>
          <p className="text-white/50 text-xs font-medium mb-0.5">
            {role === "driver" ? "Режим водителя" : "Режим пассажира"}
          </p>
          <p className="text-white font-semibold text-sm">
            {role === "driver" ? "Выбери выгодный заказ" : "Предложи свою цену"}
          </p>
        </div>
        <button
          onClick={() => setPage(role === "driver" ? "orders" : "search")}
          className="btn-gradient px-4 py-2 rounded-xl text-sm text-white font-semibold"
        >
          {role === "driver" ? "Смотреть" : "Найти"}
        </button>
      </div>

      {/* Nearby rides */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-base">Рядом с тобой</h2>
          <button onClick={() => setPage("search")} className="text-xs" style={{ color: "#FF6B1A" }}>
            Все маршруты
          </button>
        </div>
        <div className="space-y-3">
          {nearbyRides.map((ride, i) => (
            <div
              key={i}
              className="card-glass rounded-2xl p-4 space-y-3 transition-all duration-200 hover:bg-white/5 cursor-pointer"
              onClick={() => { setSelectedRide(i); setOfferPrice(false); }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/50 text-xs">⬤</span>
                    <span className="text-white font-medium">{ride.from}</span>
                  </div>
                  <div
                    className="ml-1 my-0.5 h-4 border-l-2 border-dashed"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  />
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MapPin" size={12} style={{ color: "#FF6B1A" }} />
                    <span className="text-white/70">{ride.to}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">₽ {ride.price}</p>
                  <p className="text-white/40 text-xs">{ride.time}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "var(--grad-1)" }}
                  >
                    {ride.driver[0]}
                  </div>
                  <span className="text-white/60 text-xs">{ride.driver}</span>
                  <span className="text-xs" style={{ color: "#F59E0B" }}>★ {ride.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <Icon name="Users" size={12} />
                  <span>{ride.seats} мест</span>
                </div>
              </div>

              {selectedRide === i && (
                <div className="space-y-2 animate-fade-in">
                  {role === "passenger" && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder={`Ваша цена (сейчас ₽ ${ride.price})`}
                        value={myPrice}
                        onChange={(e) => setMyPrice(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-orange-500/50"
                      />
                      <button className="btn-gradient px-4 py-2 rounded-xl text-sm">
                        Предложить
                      </button>
                    </div>
                  )}
                  {role === "driver" && (
                    <button className="btn-gradient w-full py-2 rounded-xl text-sm">
                      Принять заказ
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        <button
          onClick={() => setPage("ratings")}
          className="card-glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.2)" }}>
            <Icon name="Star" size={20} style={{ color: "#F59E0B" }} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Рейтинги</p>
            <p className="text-white/40 text-xs">Отзывы</p>
          </div>
        </button>
        <button
          onClick={() => setPage("support")}
          className="card-glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(6,182,212,0.2)" }}>
            <Icon name="HeadphonesIcon" fallback="HelpCircle" size={20} style={{ color: "#06B6D4" }} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Поддержка</p>
            <p className="text-white/40 text-xs">24/7 онлайн</p>
          </div>
        </button>
      </div>
    </div>
  );
}
