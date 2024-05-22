

test('myFunction multiplies by 2', () => {
    expect(myFunction(2)).toBe(4);
    expect(myFunction(3)).toBe(6);
    expect(myFunction(0)).toBe(0);
});

test('myFunction handles negative numbers', () => {
    expect(myFunction(-2)).toBe(-4);
});