sig ChargingSocket {
    reservations: set Reservation
}

abstract sig State {}
one sig Pending extends State {}
one sig Cancelled extends State {}

sig Reservation {
	state: one State,
    start: one Int,
    end: one Int
}{
	start > 0;
	end > start
}

sig User {
    reservations: set Reservation
}

// each reservation refers to one and only one charging socket
fact reservationChargingPoint{
	all r: Reservation | one c: ChargingSocket | r in c.reservations
}

// each reservation is done by a user
fact reservationByUser {
	all r: Reservation | one u: User | r in u.reservations
}

// No two overlapping reservation in PENDING state
fact noOverlappingReservation {
	all c: ChargingSocket | no disjoint r1, r2: c.reservations |
	(r1.state = Pending and r2.state = r1.state and r2.start >= r1.start and r2.start <= r1.end)
}

pred showReservationModel {
	#Reservation = 5
	#User = 2
	#ChargingSocket = 3
}

// if two reservations on the same charging socket overlap then one of them has been cancelled
assert reservationCancelledIfOverlapping {
	all c: ChargingSocket | all disjoint r1, r2: c.reservations |
	(r2.start >= r1.start and r2.start <= r1.end)
				implies
	(r1.state = Cancelled or r2.state = Cancelled)
}

check reservationCancelledIfOverlapping for 30

run showReservationModel for 10
