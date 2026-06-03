import { useState } from "react";
import Icon from "@/components/ui/icon";
import { UserRole } from "@/pages/Index";

interface ProfilePageProps {
  role: UserRole;
  setRole: (r: UserRole) => void;
}

export default function ProfilePage({ role, setRole }: ProfilePageProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Александр Громов");
  const [phone, setPhone] = useState("+7 (916) 234-56-78");
  const [email, setEmail] = useState("a.gromov@mail.ru");

  const stats = role === "driver"
    ? [
        { label: "Поездок", value: "342" },
        { label: "Рейтинг", value: "4.9" },
        { label: "Заработано", value: "₽124K" },
      ]
    : [
        { label: "Поездок", value: "58" },
        { label: "Рейтинг", value: "4.8" },
        { label: "Сэкономлено", value: "₽8 200" },
      ];

  const menuItems = [
    { icon: "CreditCard", label: "Способы оплаты", sub: "Visa •••• 4242", color: "#8B5CF6" },
    { icon: "Bell", label: "Уведомления", sub: "Все включены", color: "#06B6D4" },
    { icon: "Shield", label: "Безопасность", sub: "2FA включена", color: "#4ADE80" },
    { icon: "Globe", label: "Язык и регион", sub: "Русский, Москва", color: "#F59E0B" },
    { icon: "HelpCircle", label: "Помощь", sub: "Поддержка 24/7", color: "#EC4899" },
  ];

  return (
    <div className="px-4 pt-2 space-y-4">
      {/* Avatar & name */}
      <div className="card-glass rounded-3xl p-5 text-center space-y-3">
        <div className="relative inline-block">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto"
            style={{ background: "var(--grad-1)" }}
          >
            АГ
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "var(--grad-2)" }}
          >
            <Icon name="Camera" size={12} className="text-white" />
          </div>
        </div>

        {editing ? (
          <div className="space-y-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none text-center" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none text-center" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none text-center" />
            <button onClick={() => setEditing(false)} className="btn-gradient px-6 py-2 rounded-xl text-sm text-white font-semibold">
              Сохранить
            </button>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-white font-bold text-xl">{name}</h2>
              <p className="text-white/40 text-sm">{phone}</p>
              <p className="text-white/30 text-xs">{email}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: "rgba(255,107,26,0.15)", color: "#FF6B1A", border: "1px solid rgba(255,107,26,0.25)" }}
            >
              Редактировать
            </button>
          </>
        )}
      </div>

      {/* Role toggle */}
      <div className="card-glass rounded-2xl p-1 flex">
        <button
          onClick={() => setRole("passenger")}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          style={{
            background: role === "passenger" ? "var(--grad-1)" : "transparent",
            color: role === "passenger" ? "white" : "rgba(255,255,255,0.4)",
          }}
        >
          <Icon name="User" size={15} />
          Пассажир
        </button>
        <button
          onClick={() => setRole("driver")}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          style={{
            background: role === "driver" ? "var(--grad-2)" : "transparent",
            color: role === "driver" ? "white" : "rgba(255,255,255,0.4)",
          }}
        >
          <Icon name="Car" size={15} />
          Водитель
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="card-glass rounded-2xl p-3 text-center">
            <p className="text-white font-bold text-lg">{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Driver docs if driver */}
      {role === "driver" && (
        <div className="card-glass rounded-2xl p-4 space-y-3">
          <p className="text-white font-semibold text-sm">Мой автомобиль</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,107,26,0.15)" }}>
              <Icon name="Car" size={20} style={{ color: "#FF6B1A" }} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Toyota Camry 2020</p>
              <p className="text-white/40 text-xs">А001МВ77 • Серебристый</p>
            </div>
            <span className="ml-auto text-xs px-2 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.15)", color: "#4ADE80" }}>Верифицирован</span>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="card-glass rounded-2xl overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-all text-left"
            style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20` }}>
              <Icon name={item.icon} size={18} style={{ color: item.color }} />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{item.label}</p>
              <p className="text-white/40 text-xs">{item.sub}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-white/20" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        className="w-full py-3 rounded-2xl text-sm font-semibold transition-all mb-2"
        style={{ background: "rgba(248,113,113,0.1)", color: "#F87171", border: "1px solid rgba(248,113,113,0.15)" }}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
}
