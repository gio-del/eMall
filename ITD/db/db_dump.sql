-- Table: car
CREATE TABLE CAR (
    id serial PRIMARY KEY,
    driver_id int NOT NULL,
    carKey varchar(20) NOT NULL
);

-- Table: cp
CREATE TABLE CP (
    id serial PRIMARY KEY,
    evcp_id int NOT NULL,
    is_active boolean NULL
);

-- Table: cpo
CREATE TABLE CPO (
    id serial PRIMARY KEY,
    company_name varchar(255) NOT NULL,
    VAT_ID varchar(16) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    CONSTRAINT company_ak_1 UNIQUE (VAT_ID) NOT DEFERRABLE INITIALLY IMMEDIATE
);

CREATE TABLE TOKEN (
    id serial PRIMARY KEY,
    driver_id int UNIQUE,
    token varchar(255) UNIQUE NOT NULL
);

CREATE TABLE DRIVER_CODE (
    id serial PRIMARY KEY,
    driver_id int UNIQUE,
    expiry_date timestamp NOT NULL,
    code int NOT NULL
);

-- Table: evcp
CREATE TABLE EVCP (
    id serial PRIMARY KEY,
    description text NOT NULL,
    cpo_id int NOT NULL,
    batteryKey varchar(128) NULL,
    solarKey varchar(128) NULL,
    DSO_name varchar(128) NOT NULL,
    DSO_pricekW decimal(10, 2) NOT NULL,
    DSO_contract_expiry date NOT NULL,
    latitude varchar(20) NOT NULL,
    longitude varchar(20) NOT NULL,
    address varchar(50) NOT NULL
);

-- Table: reservation
CREATE TABLE RESERVATION (
    id serial PRIMARY KEY,
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL,
    discount_percent decimal(5, 2) NULL,
    driver_id int NOT NULL,
    total_price decimal(10, 2) NULL,
    socket_id int NOT NULL,
    charged_kWh real NULL
);

-- Table: rate
CREATE TABLE RATE (
    id serial PRIMARY KEY,
    evcp_id int NOT NULL,
    type_id int NOT NULL,
    flatPrice decimal(10, 2) NOT NULL,
    variablePrice decimal(10, 2) NOT NULL
);

CREATE TABLE TYPE (
    id serial PRIMARY KEY,
    type_name varchar(10) UNIQUE NOT NULL
);

-- Table: socket
CREATE TABLE SOCKET (
    id serial PRIMARY KEY,
    cp_id int NOT NULL,
    power_kW decimal(5, 2) NOT NULL,
    type_id int NOT NULL
);

-- Table: special_offer
CREATE TABLE SPECIAL_OFFER (
    id serial PRIMARY KEY,
    discount int NOT NULL,
    time_frame interval NOT NULL,
    evcp_id int NOT NULL
);

-- Table: driver
CREATE TABLE DRIVER (
    id serial PRIMARY KEY,
    first_name varchar(128) NOT NULL,
    last_name varchar(128) NOT NULL,
    email varchar(255),
    phone varchar(255) NULL UNIQUE,
    notification_preferences boolean,
    password varchar(60) NOT NULL
);

-- Avoid Overlapping Reservations
CREATE UNIQUE INDEX no_two_overlapping_reservation ON reservation (socket_id, start_date, end_date);

-- foreign keys
-- Reference: car_driver (table: car)
ALTER TABLE CAR
    ADD CONSTRAINT car_driver FOREIGN KEY (driver_id) REFERENCES DRIVER (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE DRIVER_CODE
    ADD CONSTRAINT code_driver FOREIGN KEY (driver_id) REFERENCES DRIVER (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE TOKEN
    ADD CONSTRAINT token_driver FOREIGN KEY (driver_id) REFERENCES DRIVER (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: cp_evcp (table: cp)
ALTER TABLE CP
    ADD CONSTRAINT cp_evcp FOREIGN KEY (evcp_id) REFERENCES EVCP (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: evcp_cpo (table: evcp)
ALTER TABLE EVCP
    ADD CONSTRAINT evcp_cpo FOREIGN KEY (cpo_id) REFERENCES CPO (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: rate_evcp (table: rate)
ALTER TABLE RATE
    ADD CONSTRAINT rate_evcp FOREIGN KEY (evcp_id) REFERENCES EVCP (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE RATE
    ADD CONSTRAINT rate_type FOREIGN KEY (type_id) REFERENCES TYPE (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: reservation_socket (table: reservation)
ALTER TABLE RESERVATION
    ADD CONSTRAINT reservation_socket FOREIGN KEY (socket_id) REFERENCES SOCKET (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: reservation_driver (table: reservation)
ALTER TABLE RESERVATION
    ADD CONSTRAINT reservation_driver FOREIGN KEY (driver_id) REFERENCES DRIVER (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: socket_cp (table: socket)
ALTER TABLE SOCKET
    ADD CONSTRAINT socket_cp FOREIGN KEY (cp_id) REFERENCES CP (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE SOCKET
    ADD CONSTRAINT socket_type FOREIGN KEY (type_id) REFERENCES TYPE (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: special_offer_evcp (table: special_offer)
ALTER TABLE SPECIAL_OFFER
    ADD CONSTRAINT special_offer_evcp FOREIGN KEY (evcp_id) REFERENCES EVCP (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE EVCP
    ADD CONSTRAINT evcp_lat_long_uk UNIQUE (latitude, longitude);

-- VIEWS
CREATE VIEW TYPE_FREE (id, power_kW, evcp_id, number)
AS (
    SELECT
        T.id,
        S.power_kW,
        E.id,
        COUNT(S.id) - COUNT(R.socket_id) AS free_spots
    FROM
        TYPE T
        JOIN SOCKET S ON S.type_id = T.id
        JOIN CP ON S.cp_id = CP.id
        JOIN EVCP AS E ON cp.evcp_id = E.id
        LEFT JOIN RESERVATION R ON R.socket_id = S.id
            AND NOW() BETWEEN R.start_date AND R.end_date
    GROUP BY
        T.id,
        E.id,
        S.power_kW);

CREATE VIEW TYPE_TOTAL (id, power_kW, evcp_id, number)
AS (
    SELECT
        T.id,
        S.power_kW,
        E.id,
        count(*)
    FROM
        EVCP AS E,
        CP,
        Socket AS S,
        Type AS T
    WHERE
        CP.evcp_id = E.id
        AND S.cp_id = CP.id
        AND S.type_id = T.id
    GROUP BY
        T.id,
        E.id,
        S.power_kw);

-- End of file.
