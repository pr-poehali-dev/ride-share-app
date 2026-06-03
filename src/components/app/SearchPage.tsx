import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { UserRole } from "@/pages/Index";
import CityInput from "@/components/app/CityInput";
import { fetchRoutes, Route } from "@/api/routes";

interface SearchPageProps {
  role: UserRole;
}

export default function SearchPage({ role }: SearchPageProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [offerIdx, setOfferIdx] = useState<number | null>(null);
  const [offerPrice, setOfferPrice] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "time">("time");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setSearched(true);
    try {
      const data = await fetchRoutes(from || undefined, to || undefined);
      setRoutes(data);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  // Загружаем все при первом открытии
  useEffect(() => {
    load();
  }, []);

  const filtered = routes
    .filter((r) => maxPrice ? r.price <= parseInt(maxPrice) : true)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.time.localeCompare(b.time);
    });

  const swap = () => { const tmp = from; setFrom(to); setTo(tmp); };

  return (
    <div className="px-4 pt-2 space-y-4">
      {/* Search form */}
      <div className="card-glass rounded-3xl p-4 space-y-3">
        <CityInput
          value={from}
          onChange={setFrom}
          placeholder="Откуда"
          icon={<div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />}
        />

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <button
            onClick={swap}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
            style={{ background: "rgba(255,107,26,0.12)", border: "1px solid rgba(255,107,26,0.2)" }}
          >
            <Icon name="ArrowUpDown" size={14} style={{ color: "#FF6B1A" }} />
          </button>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        <CityInput
          value={to}
          onChange={setTo}
          placeholder="Куда"
          icon={<Icon name="MapPin" size={14} style={{ color: "#FF6B1A" }} />}
        />

        {role === "passenger" && (
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
            <Icon name="Tag" size={14} className="text-white/40" />
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              placeholder="Максимальная цена ₽"
              className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-sm"
            />
          </div>
        )}

        <button
          onClick={load}
          disabled={loading}
          className="btn-gradient w-full py-3 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Ищем...
            </>
          ) : (
            <>
              <Icon name="Search" size={15} />
              Найти маршруты
            </>
          )}
        </button>
      </div>

      {/* Sort */}
      <div className="flex gap-2">
        {(["time", "price", "rating"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: sortBy === s ? "var(--grad-1)" : "rgba(255,255,255,0.06)",
              color: sortBy === s ? "white" : "rgba(255,255,255,0.5)",
            }}
          >
            {s === "time" ? "По времени" : s === "price" ? "По цене" : "По рейтингу"}
          </button>
        ))}
      </div>

      {/* Results count */}
      {searched && !loading && (
        <p className="text-white/30 text-xs px-1">
          {filtered.length > 0 ? `Найдено ${filtered.length} маршрутов` : ""}
        </p>
      )}

      {/* Results */}
      <div className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-glass rounded-2xl p-4 space-y-3 animate-pulse">
                <div className="h-3 bg-white/10 rounded-full w-24" />
                <div className="h-4 bg-white/10 rounded-full w-3/4" />
                <div className="h-4 bg-white/10 rounded-full w-1/2" />
                <div className="h-8 bg-white/5 rounded-xl" />
              </div>
            ))}
          </div>
        ) : !searched ? (
          <div className="text-center py-10 text-white/30">
            <Icon name="MapPin" size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Введи города для поиска</p>
            <p className="text-xs mt-1 opacity-60">Более 1 100 городов России</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-white/30">
            <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-40" />
            <p>Маршруты не найдены</p>
            <p className="text-xs mt-1 opacity-60">Попробуй другие города</p>
          </div>
        ) : (
          filtered.map((ride, i) => (
            <div key={ride.id} className="card-glass rounded-2xl p-4 space-y-3 animate-fade-in">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white/50 text-xs mb-1">{ride.date} • {ride.time}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-white font-medium">{ride.from}</span>
                  </div>
                  <div className="ml-1 my-0.5 h-4 border-l-2 border-dashed" style={{ borderColor: "rgba(255,255,255,0.15)" }} />
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MapPin" size={12} style={{ color: "#FF6B1A" }} />
                    <span className="text-white/70">{ride.to}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-white font-bold text-xl">₽{ride.price}</p>
                  <p className="text-white/40 text-xs">{ride.seats} мест</p>
                </div>
              </div>

              <div className="flex items-center gap-2 py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "var(--grad-2)" }}
                >
                  {ride.driver[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold">{ride.driver}</p>
                  <p className="text-white/40 text-xs truncate">{ride.car}</p>
                </div>
                <span className="text-xs font-semibold" style={{ color: "#F59E0B" }}>★ {ride.rating}</span>
              </div>

              {ride.comment ? (
                <p className="text-white/40 text-xs px-1">💬 {ride.comment}</p>
              ) : null}

              {role === "passenger" && offerIdx !== i && (
                <div className="flex gap-2">
                  <button className="btn-gradient flex-1 py-2.5 rounded-xl text-sm">
                    Забронировать ₽{ride.price}
                  </button>
                  <button
                    onClick={() => setOfferIdx(i)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "rgba(139,92,246,0.2)", color: "#A78BFA", border: "1px solid rgba(139,92,246,0.3)" }}
                  >
                    Торг
                  </button>
                </div>
              )}

              {role === "passenger" && offerIdx === i && (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-white/50 text-xs">Предложи свою цену (текущая ₽{ride.price})</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder={`Например ₽${ride.price - 100}`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-purple-500/50"
                    />
                    <button className="btn-gradient-2 px-4 py-2 rounded-xl text-sm text-white">Отправить</button>
                  </div>
                  <button onClick={() => setOfferIdx(null)} className="text-xs text-white/30 hover:text-white/50 transition-all">
                    Отмена
                  </button>
                </div>
              )}

              {role === "driver" && (
                <button className="btn-gradient-2 w-full py-2.5 rounded-xl text-sm text-white font-semibold">
                  Взять заказ
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
