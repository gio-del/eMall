-- Table: car
CREATE TABLE car (
    id serial PRIMARY KEY,
    driver_id int NOT NULL,
    carKey varchar(20) NOT NULL,
    location varchar(40) NOT NULL
);

-- Table: cp
CREATE TABLE cp (
    id serial PRIMARY KEY,
    evcp_id int NOT NULL
);

-- Table: cpo
CREATE TABLE cpo (
    id serial PRIMARY KEY,
    company_name varchar(255) NOT NULL,
    VAT_ID varchar(16) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    CONSTRAINT company_ak_1 UNIQUE (VAT_ID) NOT DEFERRABLE INITIALLY IMMEDIATE
);

-- Table: evcp
CREATE TABLE evcp (
    id serial PRIMARY KEY,
    description text NOT NULL,
    is_active bool NOT NULL,
    cpo_id int NOT NULL,
    batteryKey varchar(128) NULL,
    solarKey varchar(128) NULL,
    DSO_name varchar(128) NOT NULL,
    DSO_pricekW decimal(10, 2) NOT NULL,
    DSO_contract_expiry date NOT NULL,
    latitude varchar(20) NOT NULL,
    longitude varchar(20) NOT NULL
);

-- Table: rate
CREATE TABLE rate (
    id serial PRIMARY KEY,
    evcp_id int NOT NULL,
    power_kW decimal(5, 2) NOT NULL,
    flatPrice decimal(10, 2) NOT NULL,
    variablePrice decimal(10, 2) NOT NULL
);

-- Table: reservation
CREATE TABLE reservation (
    id serial PRIMARY KEY,
    start_date date NOT NULL,
    end_date date NOT NULL,
    ts_created timestamp NOT NULL,
    ts_updated timestamp NOT NULL,
    discount_percent decimal(5, 2) NOT NULL,
    driver_id int NOT NULL,
    total_price decimal(10, 2) NOT NULL,
    socket_id int NOT NULL,
    chargedKWh real NULL
);

-- Table: socket
CREATE TABLE socket (
    id serial PRIMARY KEY,
    description text NOT NULL,
    current_price decimal(10, 2) NOT NULL,
    cp_id int NOT NULL,
    type varchar(10) NOT NULL
);

-- Table: special_offer
CREATE TABLE special_offer (
    id serial PRIMARY KEY,
    discount int NOT NULL,
    time_frame interval NOT NULL,
    evcp_id int NOT NULL
);

-- Table: driver
CREATE TABLE driver (
    id serial PRIMARY KEY,
    first_name varchar(128) NOT NULL,
    last_name varchar(128) NOT NULL,
    email varchar(255) NOT NULL,
    phone varchar(255) NULL,
    address varchar(255) NULL,
    notification_preferences boolean NOT NULL,
    calendarKey varchar(20) NOT NULL,
    password BYTEA NOT NULL
);

-- foreign keys
-- Reference: car_driver (table: car)
ALTER TABLE car
    ADD CONSTRAINT car_driver FOREIGN KEY (driver_id) REFERENCES driver (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: cp_evcp (table: cp)
ALTER TABLE cp
    ADD CONSTRAINT cp_evcp FOREIGN KEY (evcp_id) REFERENCES evcp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: evcp_cpo (table: evcp)
ALTER TABLE evcp
    ADD CONSTRAINT evcp_cpo FOREIGN KEY (cpo_id) REFERENCES cpo (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: rate_evcp (table: rate)
ALTER TABLE rate
    ADD CONSTRAINT rate_evcp FOREIGN KEY (evcp_id) REFERENCES evcp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: reservation_socket (table: reservation)
ALTER TABLE reservation
    ADD CONSTRAINT reservation_socket FOREIGN KEY (socket_id) REFERENCES socket (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: reservation_driver (table: reservation)
ALTER TABLE reservation
    ADD CONSTRAINT reservation_driver FOREIGN KEY (driver_id) REFERENCES driver (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: socket_cp (table: socket)
ALTER TABLE socket
    ADD CONSTRAINT socket_cp FOREIGN KEY (cp_id) REFERENCES cp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: special_offer_evcp (table: special_offer)
ALTER TABLE special_offer
    ADD CONSTRAINT special_offer_evcp FOREIGN KEY (evcp_id) REFERENCES evcp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE evcp
    ADD CONSTRAINT evcp_lat_long_uk UNIQUE (latitude, longitude);

-- End of file.
