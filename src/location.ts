interface LatLong {
    lat: number;
    long: number;
}

export function getUserLocation (cb) {
    navigator.geolocation.getCurrentPosition(cb);
}
