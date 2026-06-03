import { useState } from "react";
import Icon from "@/components/ui/icon";

const reviews = [
  { name: "Марина Р.", role: "Пассажир", date: "28 мая", rating: 5, text: "Отличная поездка! Водитель приехал вовремя, машина чистая. Торг прошёл успешно — снизили цену на 150₽. Рекомендую!", avatar: "М" },
  { name: "Алексей К.", role: "Водитель", date: "25 мая", rating: 5, text: "Пассажир очень вежливый, без опозданий. Торговался адекватно, договорились быстро.", avatar: "А" },
  { name: "Дмитрий В.", role: "Пассажир", date: "20 мая", rating: 4, text: "Поездка нормальная, водитель немного опоздал. Зато цену приняли мою.", avatar: "Д" },
  { name: "Ольга С.", role: "Водитель", date: "15 мая", rating: 5, text: "Прекрасный пассажир! Взял заказ потому что цена была выгодная. Доехали комфортно.", avatar: "О" },
];

const topDrivers = [
  { name: "Иван М.", trips: 842, rating: 5.0, badge: "🏆", earned: "₽248K" },
  { name: "Алексей К.", trips: 621, rating: 4.9, badge: "🥈", earned: "₽186K" },
  { name: "Марина Р.", trips: 534, rating: 4.8, badge: "🥉", earned: "₽124K" },
  { name: "Дмитрий В.", trips: 412, rating: 4.8, badge: "4", earned: "₽98K" },
  { name: "Ольга С.", trips: 389, rating: 4.7, badge: "5", earned: "₽87K" },
];

const avatarColors = ["var(--grad-1)", "var(--grad-2)", "var(--grad-3)", "linear-gradient(135deg,#F59E0B,#EF4444)"];

export default function RatingsPage() {
  const [tab, setTab] = useState<"my" | "top">("my");
  const [writing, setWriting] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(5);

  const myRating = 4.9;
  const myTotal = 58;

  return (
    <div className="px-4 pt-2 space-y-4">
      {/* My rating card */}
      <div
        className="rounded-3xl p-5 text-center relative overflow-hidden"
        style={{ background: "var(--grad-1)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 50%)" }} />
        <p className="text-white/70 text-sm font-medium mb-1">Мой рейтинг</p>
        <p className="text-white font-display text-5xl font-900 mb-1">{myRating}</p>
        <div className="flex justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Icon key={s} name="Star" size={18} className="text-white" />
          ))}
        </div>
        <p className="text-white/70 text-xs">На основе {myTotal} отзывов</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 card-glass rounded-2xl">
        {[{ id: "my", label: "Мои отзывы" }, { id: "top", label: "Топ водителей" }].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "my" | "top")}
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

      {/* My reviews */}
      {tab === "my" && (
        <div className="space-y-3">
          {!writing ? (
            <button
              onClick={() => setWriting(true)}
              className="w-full card-glass rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/5"
              style={{ color: "#FF6B1A" }}
            >
              <Icon name="PenLine" size={16} />
              Написать отзыв
            </button>
          ) : (
            <div className="card-glass rounded-2xl p-4 space-y-3 animate-fade-in">
              <p className="text-white font-semibold text-sm">Новый отзыв</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setStarRating(s)}>
                    <Icon name="Star" size={24} style={{ color: s <= starRating ? "#F59E0B" : "rgba(255,255,255,0.15)" }} />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Расскажи о своей поездке..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none resize-none focus:border-orange-500/50"
              />
              <div className="flex gap-2">
                <button className="btn-gradient flex-1 py-2.5 rounded-xl text-sm text-white font-semibold">Отправить</button>
                <button onClick={() => setWriting(false)} className="px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/60 transition-all">Отмена</button>
              </div>
            </div>
          )}

          {reviews.map((r, i) => (
            <div key={i} className="card-glass rounded-2xl p-4 space-y-2 animate-fade-in">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: avatarColors[i % avatarColors.length] }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{r.name}</p>
                    <p className="text-white/40 text-xs">{r.role} • {r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} name="Star" size={12} style={{ color: s <= r.rating ? "#F59E0B" : "rgba(255,255,255,0.1)" }} />
                  ))}
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Top drivers */}
      {tab === "top" && (
        <div className="space-y-3">
          {topDrivers.map((d, i) => (
            <div
              key={i}
              className="card-glass rounded-2xl p-4 flex items-center gap-3 animate-fade-in"
              style={{
                border: i === 0 ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(255,255,255,0.07)",
                background: i === 0 ? "rgba(245,158,11,0.05)" : undefined,
              }}
            >
              <span className="text-2xl w-8 text-center">{d.badge}</span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: avatarColors[i % avatarColors.length] }}
              >
                {d.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{d.name}</p>
                <p className="text-white/40 text-xs">{d.trips} поездок</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm">{d.earned}</p>
                <p className="text-xs" style={{ color: "#F59E0B" }}>★ {d.rating.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
