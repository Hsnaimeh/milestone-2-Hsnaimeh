function getTypeLabel(a) {
    if (a === "blood_pressure") {
        return "Blood Pressure"
    } else if (a === "respiratory_rate") {
        return "Respiratory Rate"
    } else if (a === "blood_oxygen_level") {
        return "Blood oxygen Level"
    } else if (a === "heartbeat_rate") {
        return "Heartbeat Rate"
    } else {
        return "Blood Pressure"
    }

}

module.exports = getTypeLabel;

