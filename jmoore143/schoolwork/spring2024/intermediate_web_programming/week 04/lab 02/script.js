let message = prompt("give me a 4 word passphrase");
while (true) {
    if (message.trim().split(" ").length == 4) {
        break;
    }
    message = prompt("the passphrase must have 4 words");
}
let out = document.getElementById("output")
document.getElementById("b1").addEventListener("click", function () {
    out.innerHTML = `message: ${message}<br>` +
        `lower case: ${message.toLowerCase()}<br>` +
        `upper case: ${message.toUpperCase()}<br>` +
        `length: ${message.length}`;
});
document.getElementById("b2").addEventListener("click", function () {
    out.innerHTML = "";
    let arr = message.trim().split(" ");
    out.innerHTML = out.innerHTML + `as an array by word: [${arr}]<br>`;
    arr.push(arr.shift());
    out.innerHTML = out.innerHTML + `shift first to last: [${arr}]<br>`;
    arr = [...arr.slice(0, 2), "secret", ...arr.slice(2, arr.length)];
    out.innerHTML = out.innerHTML + `insert the word secret: [${arr}]`;
});
document.getElementById("b3").addEventListener("click", function () {
    out.innerHTML = ``;
    let arr = message.trim().split("");
    out.innerHTML = out.innerHTML + `by letter: [${arr}]<br>`;
    arr = arr.reverse();
    out.innerHTML = out.innerHTML + `by letter reversed: [${arr}]<br>`;
    arr = arr.sort();
    out.innerHTML = out.innerHTML + `by letter sorted: [${arr}]<br>`;
});