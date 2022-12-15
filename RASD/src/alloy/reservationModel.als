// a charging station with multiple charging points
sig ChargingPointPool {
	chargingPoints: some ChargingPoint
}

// a single charging column with 1 or 2 connector
sig ChargingPoint {
	chargingSockets: some ChargingSocket
}
{
	#chargingSockets <= 2
}

sig ChargingSocket {
	reservations: set Reservation
}

abstract sig State {}
one sig Cancelled, Pending extends State {}

sig Reservation {
	state: one State,
    start: one Int,
    end: one Int
}{
	start > 0;
	end > start
}

// an operators: has 0 or more CP stations
sig CPO {
	chargingPointPools: set ChargingPointPool
}

// an EV Driver
sig User {
    reservations: set Reservation
}

// all charging point pools are managed by a CPO
fact EVCPofCPO{
	all evcp: ChargingPointPool | one cpo: CPO | evcp in cpo.chargingPointPools
}

// all charging point are in a charging point pool (and only in one)
fact CPinPool {
	all cp: ChargingPoint | one evcp: ChargingPointPool | cp in evcp.chargingPoints
}

// all charging socket are in a charging point (and only in one)
fact SocketinChargingPoint {
	all s: ChargingSocket | one cp: ChargingPoint | s in cp.chargingSockets
}

// each reservation is for one and only one charging socket
fact reservationSocket {
	all r: Reservation | one cp: ChargingSocket | r in cp.reservations
}

// each reservation is done by a user
fact reservationByUser {
	all r: Reservation | one u: User | r in u.reservations
}

// No two overlapping reservation for the same socket in PENDING state
fact noOverlappingReservation {
	all s: ChargingSocket | no disjoint r1, r2: s.reservations |
	(r1.state = Pending and r2.state = r1.state and r2.start >= r1.start and r2.start < r1.end)
}

pred showReservationModel {
	#Reservation = 5
	#User = 2
	#CPO = 2
}

// if two reservations on the same charging socket overlap then one of them has been cancelled
assert reservationCancelledIfOverlapping {
	all s: ChargingSocket | all disjoint r1, r2: s.reservations |
	(r2.start >= r1.start and r2.start < r1.end)
				implies
	(r1.state = Cancelled or r2.state = Cancelled)
}

check reservationCancelledIfOverlapping for 35
run showReservationModel for 10
