# eMall – e-Mobility for All
![](https://github.com/gio-del/BattistonDeLuciaCurro-swe2/blob/main/.github/assets/test_cover.png?raw=true)
## Intro

A.Y. 2022/2023

**eMall** is a software engineering project developed as part of the **Software Engineering 2** course at PoliMi.
The project involves comprehensive analysis and specification of requirements, designing, implementing and testing the system to ensure it
meets the specifications outlined in the **RASD** (Requirement Analysis and Specification Document) and **DD** (Design Document).

## The Project

eMall is a web application that helps drivers find charging points and manage their charging sessions. With eMall, drivers can:

- Search for **charging points** near their location
- View details about the charging points
- **Book a charge** and start a charge when it's time
- Receive real-time updates on the status of the charging session
- Receive **notifications** through Firebase Cloud Messaging

eMall also provides a dashboard for **Charging Point Operators** (CPOs) to manage their charging points. CPOs can:

- Access all their charging points and add new ones
- Add prices and special offers
- View reservations in their charging points
- Communicate with the charging points via **OCPP**
- Change their **Distribution System Operator** (DSO)
- Communicate with the batteries in their stations using a battery access key

## Getting Started
Note: You need to have Docker (^20.10.X) installed

Clone this repository on your local machine.

Then cd into /ITD folder and execute the following commands:

```
docker-compose build
docker-compose up
```

When the building and starting process concludes visit http://127.0.0.1:5173/home

You can found more details on the installation process in the [wiki]([wikil](https://github.com/gio-del/BattistonDeLuciaCurro-swe2/wiki))

## Group members
- [Lorenzo Battiston](https://github.com/lorenzo-battiston)
- [Giovanni De Lucia](https://github.com/gio-del)
- [Matteo Curro](https://github.com/mattecurro)
