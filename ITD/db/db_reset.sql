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