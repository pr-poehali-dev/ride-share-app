CREATE TABLE t_p74916045_ride_share_app.routes (
  id          SERIAL PRIMARY KEY,
  driver_name VARCHAR(100) NOT NULL DEFAULT 'Водитель',
  car         VARCHAR(100) NOT NULL DEFAULT '',
  from_city   VARCHAR(100) NOT NULL,
  to_city     VARCHAR(100) NOT NULL,
  price       INTEGER      NOT NULL CHECK (price > 0),
  seats       INTEGER      NOT NULL DEFAULT 1 CHECK (seats BETWEEN 1 AND 7),
  trip_date   VARCHAR(30)  NOT NULL,
  trip_time   VARCHAR(10)  NOT NULL,
  comment     TEXT         NOT NULL DEFAULT '',
  status      VARCHAR(20)  NOT NULL DEFAULT 'active',
  rating      NUMERIC(3,1) NOT NULL DEFAULT 4.8,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_routes_status  ON t_p74916045_ride_share_app.routes (status);
CREATE INDEX idx_routes_from    ON t_p74916045_ride_share_app.routes (from_city);
CREATE INDEX idx_routes_to      ON t_p74916045_ride_share_app.routes (to_city);

INSERT INTO t_p74916045_ride_share_app.routes
  (driver_name, car, from_city, to_city, price, seats, trip_date, trip_time, comment, rating)
VALUES
  ('Иван М.',     'Mercedes E-Class', 'Москва',          'Санкт-Петербург', 2800, 2, 'Сегодня', '14:00', '',                        5.0),
  ('Алексей К.',  'Toyota Camry',     'Москва',          'Казань',          1900, 3, 'Сегодня', '08:00', 'Некурящих просьба',        4.8),
  ('Марина Р.',   'Hyundai Solaris',  'Москва',          'Нижний Новгород', 1200, 2, 'Сегодня', '10:30', '',                        4.9),
  ('Ольга С.',    'Volkswagen Polo',  'Москва',          'Воронеж',         1600, 4, 'Завтра',  '06:00', 'Берём с багажом',          4.6),
  ('Дмитрий В.',  'Kia Rio',          'Санкт-Петербург', 'Москва',          2700, 1, 'Сегодня', '09:00', '',                        4.7),
  ('Елена К.',    'Skoda Octavia',    'Санкт-Петербург', 'Великий Новгород', 800, 3, 'Сегодня', '11:00', '',                        4.9),
  ('Рустам М.',   'Lada Vesta',       'Казань',          'Уфа',             1100, 2, 'Завтра',  '07:30', '',                        4.8),
  ('Сергей П.',   'Ford Focus',       'Екатеринбург',    'Тюмень',           900, 3, 'Сегодня', '13:00', '',                        4.7),
  ('Анна В.',     'Renault Logan',    'Новосибирск',     'Томск',            750, 2, 'Сегодня', '15:00', '',                        5.0),
  ('Михаил Т.',   'Hyundai Tucson',   'Краснодар',       'Сочи',             650, 4, 'Завтра',  '08:00', 'Можно с детьми',           4.6);
