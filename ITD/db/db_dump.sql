-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-01-06 21:53:28.416
-- tables
-- Table: car
CREATE TABLE car (
    id int NOT NULL,
    user_id int NOT NULL,
    carKey varchar(20) NOT NULL,
    location varchar(40) NOT NULL,
    CONSTRAINT car_pk PRIMARY KEY (id)
);

-- Table: cp
CREATE TABLE cp (
    id int NOT NULL,
    evcp_id int NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: cpo
CREATE TABLE cpo (
    id int NOT NULL,
    company_name varchar(255) NOT NULL,
    VAT_ID varchar(16) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    invoice_location_id int NOT NULL,
    CONSTRAINT company_ak_1 UNIQUE (VAT_ID) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT cpo_pk PRIMARY KEY (id)
);

-- Table: evcp
CREATE TABLE evcp (
    id int NOT NULL,
    hotel_name varchar(128) NOT NULL,
    description text NOT NULL,
    is_active bool NOT NULL,
    cpo_id int NOT NULL,
    batteryKey varchar(128) NULL,
    solarKey varchar(128) NULL,
    location_id int NOT NULL,
    DSO_name varchar(128) NOT NULL,
    DSO_pricekW decimal(10, 2) NOT NULL,
    DSO_contract_expiry date NOT NULL,
    CONSTRAINT hotel_ak_1 UNIQUE (hotel_name) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT evcp_pk PRIMARY KEY (id)
);

-- Table: invoice_company
CREATE TABLE invoice_company (
    id int NOT NULL,
    company_id int NOT NULL,
    invoice_amount decimal(10, 2) NOT NULL,
    invoice_period varchar(255) NOT NULL,
    invoice_details text NOT NULL,
    ts_issued timestamp NOT NULL,
    ts_paid timestamp NULL,
    ts_canceled timestamp NULL,
    CONSTRAINT invoice_company_pk PRIMARY KEY (id)
);

-- Table: invoice_user
CREATE TABLE invoice_user (
    id int NOT NULL,
    reservation_id int NOT NULL,
    invoice_amount decimal(10, 2) NOT NULL,
    ts_issued timestamp NOT NULL,
    ts_paid timestamp NULL,
    ts_canceled timestamp NULL,
    user_id int NOT NULL,
    CONSTRAINT invoice_user_pk PRIMARY KEY (id)
);

-- Table: location
CREATE TABLE location (
    id int NOT NULL,
    latitude varchar(20) NOT NULL,
    longitude varchar(20) NOT NULL,
    CONSTRAINT city_ak_1 UNIQUE (latitude, longitude) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT location_pk PRIMARY KEY (id)
);

-- Table: rate
CREATE TABLE rate (
    id int NOT NULL,
    evcp_id int NOT NULL,
    power_kW decimal(5, 2) NOT NULL,
    flatPrice decimal(10, 2) NOT NULL,
    variablePrice decimal(10, 2) NOT NULL,
    CONSTRAINT rate_pk PRIMARY KEY (id)
);

-- Table: reservation
CREATE TABLE reservation (
    id int NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    ts_created timestamp NOT NULL,
    ts_updated timestamp NOT NULL,
    discount_percent decimal(5, 2) NOT NULL,
    user_id int NOT NULL,
    total_price decimal(10, 2) NOT NULL,
    socket_id int NOT NULL,
    chargedKWh real NULL,
    CONSTRAINT reservation_pk PRIMARY KEY (id)
);

-- Table: socket
CREATE TABLE socket (
    id int NOT NULL,
    description text NOT NULL,
    current_price decimal(10, 2) NOT NULL,
    cp_id int NOT NULL,
    trype varchar(10) NOT NULL,
    CONSTRAINT room_ak_1 UNIQUE (room_name) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT socket_pk PRIMARY KEY (id)
);

-- Table: special_offer
CREATE TABLE special_offer (
    id int NOT NULL,
    discount int NOT NULL,
    time_frame interval NOT NULL,
    evcp_id int NOT NULL,
    CONSTRAINT special_offer_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
    id int NOT NULL,
    first_name varchar(128) NOT NULL,
    last_name varchar(128) NOT NULL,
    email varchar(255) NOT NULL,
    phone varchar(255) NULL,
    address varchar(255) NULL,
    details text NULL,
    notification_preferences varchar(20) NOT NULL,
    calendarKey varchar(20) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: car_user (table: car)
ALTER TABLE car
    ADD CONSTRAINT car_user FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: company_location (table: cpo)
ALTER TABLE cpo
    ADD CONSTRAINT company_location FOREIGN KEY (invoice_location_id) REFERENCES location (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: cp_evcp (table: cp)
ALTER TABLE cp
    ADD CONSTRAINT cp_evcp FOREIGN KEY (evcp_id) REFERENCES evcp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: evcp_cpo (table: evcp)
ALTER TABLE evcp
    ADD CONSTRAINT evcp_cpo FOREIGN KEY (cpo_id) REFERENCES cpo (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: evcp_location (table: evcp)
ALTER TABLE evcp
    ADD CONSTRAINT evcp_location FOREIGN KEY (location_id) REFERENCES location (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: invoice_company_company (table: invoice_company)
ALTER TABLE invoice_company
    ADD CONSTRAINT invoice_company_company FOREIGN KEY (company_id) REFERENCES cpo (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: invoice_guest_reservation (table: invoice_user)
ALTER TABLE invoice_user
    ADD CONSTRAINT invoice_guest_reservation FOREIGN KEY (reservation_id) REFERENCES reservation (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: invoice_guest_user (table: invoice_user)
ALTER TABLE invoice_user
    ADD CONSTRAINT invoice_guest_user FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: rate_evcp (table: rate)
ALTER TABLE rate
    ADD CONSTRAINT rate_evcp FOREIGN KEY (evcp_id) REFERENCES evcp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: reservation_socket (table: reservation)
ALTER TABLE reservation
    ADD CONSTRAINT reservation_socket FOREIGN KEY (socket_id) REFERENCES socket (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: reservation_user (table: reservation)
ALTER TABLE reservation
    ADD CONSTRAINT reservation_user FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: socket_cp (table: socket)
ALTER TABLE socket
    ADD CONSTRAINT socket_cp FOREIGN KEY (cp_id) REFERENCES cp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: special_offer_evcp (table: special_offer)
ALTER TABLE special_offer
    ADD CONSTRAINT special_offer_evcp FOREIGN KEY (evcp_id) REFERENCES evcp (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- End of file.
