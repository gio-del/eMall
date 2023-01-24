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

