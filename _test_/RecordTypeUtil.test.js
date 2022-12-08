const typeUtil = require('./RecordTypeUtil');

test('send blood_pressure to return Blood Pressure', () => {
    expect(typeUtil("blood_pressure")).toBe("Blood Pressure");
});

test('send respiratory_rate to return Blood Pressure', () => {
    expect(typeUtil("respiratory_rate")).toBe("Respiratory Rate");
});
test('send blood_oxygen_level to return Blood Pressure', () => {
    expect(typeUtil("blood_oxygen_level")).toBe("Blood oxygen Level");
});
test('send heartbeat_rate to return Blood Pressure', () => {
    expect(typeUtil("heartbeat_rate")).toBe("Heartbeat Rate");
});
test('send anything to return Blood Pressure', () => {
    expect(typeUtil("blood_pressure")).toBe("Blood Pressure");
});
