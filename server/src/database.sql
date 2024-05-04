CREATE TABLE "film" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "date" date
);

CREATE TABLE "film_cinema" (
  "id" SERIAL PRIMARY KEY,
  "film_id" int,
  "cinema_id" int,
  "title" varchar,
  "description" varchar,
  "duration" varchar,
  "poster" varchar,
  "time" date
  FOREIGN KEY (film_id) REFERENCES film (id)
);

CREATE TABLE "hall" (
  "id" SERIAL PRIMARY KEY,
  "cinema_id" int,
  "columns" int,
  "rows" int
);

CREATE TABLE "person" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "phone" varchar,
  "email" varchar
);

CREATE TABLE "reviews" (
  "id" SERIAL PRIMARY KEY,
  "text" varchar,
  "user_id" int,
  "film_cinema_id" int,
  FOREIGN KEY (user_id) REFERENCES person (id),
  FOREIGN KEY (film_cinema_id) REFERENCES film_cinema (id)
);

CREATE TABLE "booking" (
  "id" SERIAL PRIMARY KEY,
  "cinema_id" int,
  "film_cinema_id" int,
  "hall_id" int,
  "user_id" int,
  "column" int,
  "row" int,
  "time" date,
  "name" varchar,
  "phone" varchar,
  "email" varchar,
  "status" varchar,
  FOREIGN KEY (film_cinema_id) REFERENCES film_cinema (id),
  FOREIGN KEY (hall_id) REFERENCES hall (id),
  FOREIGN KEY (user_id) REFERENCES person (id)
);

CREATE TABLE "cinema" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "coords" varchar,
  "rating" int
);