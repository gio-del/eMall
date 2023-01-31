DROP VIEW IF EXISTS TYPE_FREE;

DROP VIEW IF EXISTS TYPE_TOTAL;

-- foreign keys
ALTER TABLE TOKEN
    DROP CONSTRAINT token_driver;

ALTER TABLE TOKEN
    DROP CONSTRAINT token_cpo;

ALTER TABLE DRIVER_CODE
    DROP CONSTRAINT code_driver;

ALTER TABLE CPO_CODE
    DROP CONSTRAINT code_cpo;

ALTER TABLE CAR
    DROP CONSTRAINT car_driver;

ALTER TABLE CP
    DROP CONSTRAINT cp_evcp;

ALTER TABLE EVCP
    DROP CONSTRAINT evcp_cpo;

ALTER TABLE RATE
    DROP CONSTRAINT rate_evcp;

ALTER TABLE RATE
    DROP CONSTRAINT rate_type;

ALTER TABLE RESERVATION
    DROP CONSTRAINT reservation_socket;

ALTER TABLE RESERVATION
    DROP CONSTRAINT reservation_driver;

ALTER TABLE SOCKET
    DROP CONSTRAINT socket_cp;

ALTER TABLE SOCKET
    DROP CONSTRAINT socket_type;

ALTER TABLE SPECIAL_OFFER
    DROP CONSTRAINT special_offer_evcp;

-- tables
DROP TABLE TOKEN;

DROP TABLE CAR;

DROP TABLE CP;

DROP TABLE CPO;

DROP TABLE EVCP;

DROP TABLE RATE;

DROP TABLE RESERVATION;

DROP TABLE SOCKET;

DROP TABLE SPECIAL_OFFER;

DROP TABLE DRIVER;

DROP TABLE DRIVER_CODE;

DROP TABLE CPO_CODE;

DROP TABLE TYPE;

-- End of file.
--- Table: car
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
    email varchar(255) NOT NULL,
    password varchar(60) NOT NULL
);

CREATE TABLE TOKEN (
    id serial PRIMARY KEY,
    driver_id int UNIQUE,
    cpo_id int UNIQUE,
    token varchar(255) UNIQUE NOT NULL
);

CREATE TABLE DRIVER_CODE (
    id serial PRIMARY KEY,
    driver_id int UNIQUE,
    expiry_date timestamp NOT NULL,
    code int NOT NULL
);

CREATE TABLE CPO_CODE (
    id serial PRIMARY KEY,
    cpo_id int UNIQUE,
    expiry_date timestamp NOT NULL,
    code int NOT NULL
);

-- Table: evcp
CREATE TABLE EVCP (
    id serial PRIMARY KEY,
    name text NOT NULL,
    cpo_id int NOT NULL,
    batteryKey varchar(128) NULL,
    DSO_name varchar(128) NULL,
    DSO_pricekW decimal(10, 2) NULL,
    DSO_contract_expiry date NULL,
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
    charged_kWh real NULL,
    notified boolean DEFAULT FALSE
);

CREATE TABLE RATE (
    id serial PRIMARY KEY,
    evcp_id int NOT NULL,
    type_id int NOT NULL,
    flatPrice decimal(10, 2) NOT NULL,
    variablePrice decimal(10, 2) NOT NULL,
    UNIQUE (evcp_id, type_id)
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
    evcp_id int UNIQUE NOT NULL
);

-- Table: driver
CREATE TABLE DRIVER (
    id serial PRIMARY KEY,
    first_name varchar(128) NOT NULL,
    last_name varchar(128) NOT NULL,
    email varchar(255),
    phone varchar(255) NULL UNIQUE,
    notification_token varchar(255) NULL,
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

ALTER TABLE CPO_CODE
    ADD CONSTRAINT code_cpo FOREIGN KEY (cpo_id) REFERENCES CPO (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE TOKEN
    ADD CONSTRAINT token_driver FOREIGN KEY (driver_id) REFERENCES DRIVER (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE TOKEN
    ADD CONSTRAINT token_cpo FOREIGN KEY (cpo_id) REFERENCES CPO (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

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
INSERT INTO CPO (company_name, email, PASSWORD)
    VALUES ('FakeEnergyCo1', 'fakeco1@example.com', 'password1'), ('FakeEnergyCo2', 'fakeco2@example.com', 'password2');

INSERT INTO TYPE (type_name)
    VALUES ('Type2'), ('CCS2');

INSERT INTO EVCP (name, cpo_id, DSO_name, DSO_pricekW, DSO_contract_expiry, latitude, longitude, address)
    VALUES ('EVCP1', 1, 'FakeEnergyDSO1', 0.15, '2022-12-31', '45.465422', '9.185924', 'Via Degli Ulivi'), ('EVCP2', 1, 'FakeEnergyDSO2', 0.20, '2022-12-31', '45.6982642', '9.6772698', 'Via Degli Ulivi'), ('EVCP3', 2, 'FakeEnergyDSO3', 0.18, '2022-12-31', '45.5328389', '10.2295612', 'Via Degli Ulivi'), ('EVCP4', 2, 'FakeEnergyDSO4', 0.22, '2022-12-31', '45.8098653', '9.0829532', 'Via Degli Ulivi'), ('EVCP5', 1, 'FakeEnergyDSO5', 0.12, '2022-12-31', '45.1333333', '10.0166667', 'Via Degli Ulivi'), ('EVCP6', 2, 'FakeEnergyDSO6', 0.28, '2022-12-31', '45.8666667', '9.41666667', 'Via Degli Ulivi'), ('EVCP7', 1, 'FakeEnergyDSO7', 0.15, '2022-12-31', '45.3168584', '9.5068107', 'Via Degli Ulivi'), ('EVCP8', 2, 'FakeEnergyDSO8', 0.20, '2022-12-31', '45.5823489', '9.2744789', 'Via Degli Ulivi'), ('EVCP9', 1, 'FakeEnergyDSO9', 0.18, '2022-12-31', '45.1833333', '9.15', 'Via Degli Ulivi'), ('EVCP10', 2, 'FakeEnergyDSO10', 0.22, '2022-12-31', '45.81778', '8.82861', 'Via Degli Ulivi'), ('EVCP10', 1, 'FakeEnergyDSO1', 0.15, '2022-12-31', '45.465522', '9.185924', 'Via Degli Ulivi'), ('EVCP11', 1, 'FakeEnergyDSO1', 0.15, '2022-12-31', '45.465422', '9.185424', 'Via Degli Ulivi'), ('EVCP12', 1, 'FakeEnergyDSO1', 0.15, '2022-12-31', '45.465422', '9.1859255', 'Via Degli Ulivi');

INSERT INTO CP (evcp_id)
    VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- Inserting dummy data for SOCKET table
INSERT INTO SOCKET (cp_id, power_kW, type_id)
    VALUES (1, 10, 1), (2, 12, 2), (3, 15, 1), (4, 18, 2), (5, 20, 1), (6, 22, 2), (7, 25, 1), (8, 28, 2), (9, 30, 1), (10, 32, 2), (11, 35, 1), (12, 38, 2), (13, 40, 1), (14, 42, 2), (15, 45, 1), (16, 48, 2), (17, 50, 1), (18, 52, 2), (19, 55, 1), (20, 58, 2);

-- Inserting dummy data for RATE table
INSERT INTO RATE (evcp_id, type_id, flatPrice, variablePrice)
    VALUES (1, 1, 20, 0.10), (2, 2, 25, 0.12), (3, 1, 30, 0.15), (4, 2, 35, 0.18), (5, 1, 40, 0.20), (6, 2, 45, 0.22), (7, 1, 50, 0.25), (8, 2, 55, 0.28), (9, 1, 60, 0.30), (10, 2, 65, 0.32);

INSERT INTO SPECIAL_OFFER (evcp_id, discount)
    VALUES (1, 10), (2, 20), (3, 30), (4, 40);

