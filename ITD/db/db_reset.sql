-- foreign keys
ALTER TABLE car
    DROP CONSTRAINT car_driver;

ALTER TABLE cp
    DROP CONSTRAINT cp_evcp;

ALTER TABLE evcp
    DROP CONSTRAINT evcp_cpo;

ALTER TABLE rate
    DROP CONSTRAINT rate_evcp;

ALTER TABLE reservation
    DROP CONSTRAINT reservation_socket;

ALTER TABLE reservation
    DROP CONSTRAINT reservation_driver;

ALTER TABLE socket
    DROP CONSTRAINT socket_cp;

ALTER TABLE special_offer
    DROP CONSTRAINT special_offer_evcp;

-- tables
DROP TABLE car;

DROP TABLE cp;

DROP TABLE cpo;

DROP TABLE evcp;

DROP TABLE rate;

DROP TABLE reservation;

DROP TABLE socket;

DROP TABLE special_offer;

DROP TABLE driver;

-- End of file.
