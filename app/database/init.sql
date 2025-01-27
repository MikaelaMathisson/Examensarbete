-- Byt till databasen "postgres" (inte nödvändigt när init.sql körs på postgres redan)
\c postgres;

-- Ta bort tabeller om de redan finns
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS events;

-- Skapa tabellen bookings
CREATE TABLE bookings (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          personnummer VARCHAR(20) NOT NULL,
                          phone VARCHAR(20) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          date DATE NOT NULL,
                          is_available BOOLEAN DEFAULT FALSE,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          bokningsnummer VARCHAR(50) UNIQUE
);

-- Skapa tabellen events
CREATE TABLE events (
                        id SERIAL PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        description TEXT,
                        start_time TIMESTAMP NOT NULL,
                        end_time TIMESTAMP NOT NULL,
                        admin_info TEXT,
                        color VARCHAR(7) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        date DATE
);

-- Lägg till exempeldata i events
INSERT INTO events (title, description, start_time, end_time, admin_info, color, date)
VALUES
    ('Motorcross Tävling', 'En spännande motorcross tävling.', '2025-01-27 10:00:00', '2025-01-27 15:00:00', 'Arrangerad av admin', '#00FF00', '2025-01-27'),
    ('Banan Vinterstängd', 'Banan är stängd för vintern.', '2025-01-28 00:00:00', '2025-01-28 23:59:59', 'Stängd av admin', '#FF0000', '2025-01-28'),
    ('Träningsdag', 'Öppen för träning hela dagen.', '2025-01-29 08:00:00', '2025-01-29 18:00:00', 'Arrangerad av admin', '#00FF00', '2025-01-29');

-- Lägg till exempeldata i bookings
INSERT INTO bookings (name, personnummer, phone, email, date, is_available, bokningsnummer)
VALUES
    ('Anna Andersson', '19900101-1234', '0701234567', 'anna@example.com', '2025-01-27', TRUE, 'BKN-20250127-1'),
    ('Erik Svensson', '19851212-5678', '0737654321', 'erik@example.com', '2025-01-28', FALSE, 'BKN-20250128-2');
