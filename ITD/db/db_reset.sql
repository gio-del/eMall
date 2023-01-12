-- foreign keys
ALTER TABLE car
    DROP CONSTRAINT car_user;

ALTER TABLE cpo
    DROP CONSTRAINT company_location;

ALTER TABLE cp
    DROP CONSTRAINT cp_evcp;

ALTER TABLE evcp
    DROP CONSTRAINT evcp_cpo;

ALTER TABLE evcp
    DROP CONSTRAINT evcp_location;

ALTER TABLE invoice_company
    DROP CONSTRAINT invoice_company_company;

ALTER TABLE invoice_user
    DROP CONSTRAINT invoice_guest_reservation;

ALTER TABLE invoice_user
    DROP CONSTRAINT invoice_guest_user;

ALTER TABLE rate
    DROP CONSTRAINT rate_evcp;

ALTER TABLE reservation
    DROP CONSTRAINT reservation_socket;

ALTER TABLE reservation
    DROP CONSTRAINT reservation_user;

ALTER TABLE socket
    DROP CONSTRAINT socket_cp;

ALTER TABLE special_offer
    DROP CONSTRAINT special_offer_evcp;

-- tables
DROP TABLE car;

DROP TABLE cp;

DROP TABLE cpo;

DROP TABLE evcp;

DROP TABLE invoice_company;

DROP TABLE invoice_user;

DROP TABLE location;

DROP TABLE rate;

DROP TABLE reservation;

DROP TABLE socket;

DROP TABLE special_offer;

DROP TABLE "user";

-- End of file.
