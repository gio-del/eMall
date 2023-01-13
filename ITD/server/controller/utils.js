/**
 * This function is used to calculate the distances between two point given their coordinates
 * @param {lat1}
 * @param {lon1}
 * @param {lat2}
 * @param {lon2}
 * @returns the distance between the two points
 */
function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // radius of Earth in kilometers
    var dLat = toRadians(lat2 - lat1);
    var dLon = toRadians(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function toRadians(degree) {
    return degree * (Math.PI / 180);
}

module.exports = distance