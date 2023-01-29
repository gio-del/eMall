/**
 * This function calculates the distance between two points. The assumption is that the Earth is a perfect sphere.
 * @param {*} lat1 the latitude of the first point
 * @param {*} lon1 the longitude of the first point
 * @param {*} lat2 the latitude of the second point
 * @param {*} lon2 the longitude of the second point
 * @returns the distance between the two points in kilometers
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

/**
 * Converts degrees to radians
 * @param {*} degree the degree to convert
 * @returns the degree converted to radians
 */
function toRadians(degree) {
    return degree * (Math.PI / 180);
}

module.exports = distance