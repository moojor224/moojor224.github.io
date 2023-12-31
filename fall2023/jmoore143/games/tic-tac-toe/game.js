class Game {
    groups = [];
    x_score = 0;
    o_score = 0;
    constructor(size) {
        size = Math.round(size);
        if (size < 3) {
            size = 3;
        }
        if (size > 10) {
            size = 10;
        }
        this.#makeBoard(size);
        let game = createElement("game");
        this.scoreboard = createElement("scoreboard").add(
            createElement("row").add(createElement("cell").add(
                createElement("div").add(createElement("i", {
                    classList: "fa-solid fa-x"
                }))
            ), createElement("cell").add(
                createElement("div").add(createElement("i", {
                    classList: "fa-solid fa-o"
                }))
            )),
            createElement("row").add(createElement("cell", {
                dataset: {
                    player: "x"
                }
            }), createElement("cell", {
                dataset: {
                    player: "o"
                }
            }))
        );
        this.turnDisplay = createElement("div", {
            classList: "turnDisplay",
            innerHTML: this.order[+this.turn] + "'s turn",
        });
        game.add(this.scoreboard);
        game.add(this.board);
        game.add(this.turnDisplay);
        document.querySelector("main").add(game);
        let arr = new Array(size).fill("").map((e, n) => n + 1);
        this.groups.push(...arr.map(e => [...this.board.querySelectorAll(`row:nth-child(${e}) cell`)]));// get rows
        this.groups.push(...arr.map(e => [...this.board.querySelectorAll(`cell:nth-child(${e})`)]));// get columns
        this.groups.push(arr.map(e => this.board.querySelector(`row:nth-child(${e}) cell:nth-child(${e})`)));// get diagonal 1
        this.groups.push(arr.map(e => this.board.querySelector(`row:nth-child(${e}) cell:nth-child(${size + 1 - e})`)));// get diagonal 2
        console.log(this.groups);
    }
    #makeBoard(size) {
        this.board = createElement("board").add(
            ...new Array(size).fill("").map(r => createElement("row").add(
                ...new Array(size).fill("").map(c => createElement("cell").add(
                    createElement("div", {
                        onclick: (e) => this.play(e.target)
                    }).add(createElement("i"))
                ))
            ))
        );
    }
    done = false;
    check() {
        console.log("checking");
        let win = false;
        let winningGroup;
        let full = true;
        for (var i in this.groups) {
            let e = this.groups[i].map(e => e.dataset.marker);
            if (e) {
                full = false;
            }
            if ([...new Set(e)].length == 1 && ["x", "o"].includes(e[0])) {
                winningGroup = this.groups[i];
                console.log("win");
                this.done = true;
                break;
            }
        }
        let game = this;
        if (full) {
            this.done = true;
            window.setTimeout(function () {
                alert("tie!");
                game.clear();
                [game.order[0], game.order[1]] = [game.order[1], game.order[0]];
                game.turn = false;
            }, 100);
        }
        if (winningGroup) {
            window.setTimeout(function () {
                let winner = (winningGroup[0].dataset.marker);
                game[winner + "_score"]++;
                alert(winner + " wins");
                setTimeout(function () {
                    [game.order[0], game.order[1]] = [game.order[1], game.order[0]];
                    game.turn = false;
                    game.clear();
                    game.score();
                }, 1000);
            }, 100);
        }
    }
    tally(number) {
        let arr = [..."abcde"];
        let str = " ";
        while (number > 4) {
            str += "e";
            number -= 5;
        }
        if (number > 0) {
            str += arr[number - 1];
        }
        return str;
    }
    clear() {
        this.groups.forEach(g => g.forEach(e => e.dataset.marker = ""));
        this.turnDisplay.innerHTML = this.order[+this.turn] + "'s turn";
        this.done = false;
    }
    score() {
        this.scoreboard.querySelector("[data-player='x']").innerHTML = this.tally(this.x_score);
        console.log(this.tally(this.x_score));
        this.scoreboard.querySelector("[data-player='o']").innerHTML = this.tally(this.o_score);
        console.log(this.tally(this.o_score));
        this.turnDisplay.innerHTML = this.order[+this.turn] + "'s turn";
    }
    turn = false;
    order = ["x", "o"];
    play(el) {
        while (el.tagName.toLowerCase() !== "cell") {
            el = el.parentElement;
        }
        if (el.dataset.marker || this.done) {
            return;
        }
        el.dataset.marker = this.order[+this.turn];
        this.turn = !this.turn;
        this.check();
        this.turnDisplay.innerHTML = this.order[+this.turn] + "'s turn";

    }
}