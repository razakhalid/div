create extension if not exists "uuid-ossp";

create table if not exists "users" (
    email varchar(255) primary key unique not null
);

create table if not exists "pages" (
    page_id uuid primary key,
    title varchar(255) not null,
    content text not null,
    user_email varchar(75) not null references "users"("email")
);

