import { useState } from "react";
import Icon from "@/components/ui/icon";
import { UserRole } from "@/pages/Index";

interface OrdersPageProps {
  role: UserRole;
}

const activeOrders = [
  { id: "RM-1042", from: "Арбат", to: "Шереметьево", price: 850, time: "09:30", status: "active", driver: "Алексей К.", rating: 4.8, car: "Toyota Camry" },
];

const availableForDriver = [
  { id: "RM-1055", from: "Сокольники", to: "Внуково", price: 620, time: "11:00", passenger: "Юлия М.", rating: 4.9, seats: 1 },
  { id: "RM-1056", from: "Центр", to: "Домодедово", price: 950, time: "12:30", passenger: "Артём К.", rating: 4.7, seats: 2 },
  { id: "RM-1057", from: "Марьино", to: "Шереметьево", price: 1200, time: "14:00", passenger: "Анна В.", rating: 5.0, seats: 1 },
  { id: "RM-1058", from: "Выхино", to: "Внуково", price: 780, time: "15:30", passenger: "Сергей П.", rating: 4.5, seats: 3 },
];

const history = [
  { id: "RM-1030", from: "Арбат", to: "Домодедово", price: 920, date: "28 мая", status: "done", rating: 5 },
  { id: "RM-1021", from: "ВДНХ", to: "Шереметьево", price: 800, date: "25 мая", status: "done", rating: 4 },
  { id: "RM-1010", from: "Центр", to: "Внуково", price: 550, date: "20 мая", status: "cancelled", rating: 0 },
];

export default function OrdersPage({ role }: OrdersPageProps) {
  const [tab, setTab] = useState<"active" | "available" | "history">(role === "driver" ? "available" : "active");
  const [priceEdit, setPriceEdit] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState("");

  const tabs = role === "driver"
    ? [{ id: "available", label: "Доступные" }, { id: "active", label: "Активные" }, { id: "history", label: "История" }]
    : [{ id: "active", label: "Активные" }, { id: "history", label: "История" }];

  return (
    <div className="px-4 pt-2 space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 p-1 card-glass rounded-2xl">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "active" | "available" | "history")}
            className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: tab === t.id ? "var(--grad-1)" : "transparent",
              color: tab === t.id ? "white" : "rgba(255,255,255,0.4)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active orders */}
      {tab === "active" && (
        <div className="space-y-3">
          {activeOrders.map((order) => (
            <div key={order.id} className="card-glass rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs">{order.id}</span>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#4ADE80" }}
                >
                  В пути
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white font-medium">{order.from}</span>
                </div>
                <div className="ml-1 my-0.5 h-4 border-l-2 border-dashed" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="MapPin" size={12} style={{ color: "#FF6B1A" }} />
                  <span className="text-white/70">{order.to}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--grad-1)" }}>
                    {order.driver[0]}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{order.driver}</p>
                    <p className="text-white/40 text-xs">{order.car}</p>
                  </div>
                </div>
                <p className="text-white font-bold text-lg">₽{order.price}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.2)" }}>
                  <Icon name="Phone" size={14} />
                  Позвонить
                </button>
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: "rgba(139,92,246,0.15)", color: "#A78BFA", border: "1px solid rgba(139,92,246,0.2)" }}>
                  <Icon name="MessageCircle" size={14} />
                  Чат
                </button>
              </div>

              {/* Price change for passenger */}
              {role === "passenger" && priceEdit !== order.id && (
                <button onClick={() => setPriceEdit(order.id)} className="w-full text-xs text-white/30 hover:text-white/50 transition-all py-1">
                  Изменить цену
                </button>
              )}
              {role === "passenger" && priceEdit === order.id && (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-white/50 text-xs">Предложи новую цену водителю</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder={`Текущая ₽${order.price}`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-orange-500/50"
                    />
                    <button className="btn-gradient px-4 py-2 rounded-xl text-sm text-white">Отправить</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {role === "passenger" && (
            <div className="card-glass rounded-2xl p-5 text-center space-y-3">
              <Icon name="PlusCircle" size={32} className="mx-auto" style={{ color: "#FF6B1A" }} />
              <p className="text-white font-semibold">Создать новый заказ</p>
              <p className="text-white/40 text-xs">Укажи маршрут и предложи свою цену</p>
              <button className="btn-gradient px-6 py-2.5 rounded-xl text-sm text-white font-semibold">
                Новая поездка
              </button>
            </div>
          )}
        </div>
      )}

      {/* Available for driver */}
      {tab === "available" && role === "driver" && (
        <div className="space-y-3">
          <p className="text-white/40 text-xs px-1">Выбери выгодный заказ — сортировка по цене</p>
          {availableForDriver
            .sort((a, b) => b.price - a.price)
            .map((order, i) => (
              <div key={order.id} className="card-glass rounded-2xl p-4 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">{order.id}</span>
                  <div className="flex items-center gap-1">
                    {i === 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(255,107,26,0.2)", color: "#FF6B1A" }}>
                        🔥 Топ цена
                      </span>
                    )}
                    <span className="text-white font-bold text-lg">₽{order.price}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-white font-medium">{order.from}</span>
                  </div>
                  <div className="ml-1 my-0.5 h-4 border-l-2 border-dashed" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MapPin" size={12} style={{ color: "#FF6B1A" }} />
                    <span className="text-white/70">{order.to}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--grad-3)" }}>
                      {order.passenger[0]}
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">{order.passenger}</p>
                      <span className="text-xs" style={{ color: "#F59E0B" }}>★ {order.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <Icon name="Users" size={12} />
                    <span>{order.seats} чел.</span>
                    <span className="ml-2 text-white/30">{order.time}</span>
                  </div>
                </div>
                <button className="btn-gradient w-full py-2.5 rounded-xl text-sm text-white font-semibold">
                  Принять заказ
                </button>
              </div>
            ))}
        </div>
      )}

      {/* History */}
      {tab === "history" && (
        <div className="space-y-3">
          {history.map((order) => (
            <div key={order.id} className="card-glass rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white/40 text-xs">{order.id} • {order.date}</span>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="text-white/60">{order.from}</span>
                    <Icon name="ArrowRight" size={12} className="text-white/30" />
                    <span className="text-white/60">{order.to}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">₽{order.price}</p>
                  <span
                    className="text-xs"
                    style={{ color: order.status === "done" ? "#4ADE80" : "#F87171" }}
                  >
                    {order.status === "done" ? "Завершена" : "Отменена"}
                  </span>
                </div>
              </div>
              {order.status === "done" && (
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} name="Star" size={14} style={{ color: s <= order.rating ? "#F59E0B" : "rgba(255,255,255,0.1)" }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}