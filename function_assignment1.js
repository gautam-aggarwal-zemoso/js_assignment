// Write a program to demonstrate how a function can be passed as a parameter to another function.
function mul(x, y) {
    return x * y;
}

function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function div(x, y) {
    return x / y;
}

function calculate(oper, x, y) {
    return oper(x, y);
}

console.log(calculate(mul, 10, 3));
console.log(calculate(add, 10, 4));
console.log(calculate(sub, 10, 3));
console.log(calculate(div, 10, 4));
