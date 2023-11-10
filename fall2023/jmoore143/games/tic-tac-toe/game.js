class Game {
    groups = [];
    x_score = 0;
    o_score = 0;
    constructor(size) {
        this.#makeBoard(size);
        let game = createElement("game");
        this.scoreboard = createElement("scoreboard").add(
			createElement("row").add(createElement("cell").add(
                createElement("div").add(createElement("i", {
                    classList: "fa-solid fa-x"
                }))
            ),createElement("cell").add(
                createElement("div").add(createElement("i", {
                    classList: "fa-solid fa-o"
                }))
            )),
			createElement("row").add(createElement("cell"),createElement("cell"))
		);
        game.add(this.scoreboard);
        game.add(this.board);
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
                    createElement("div").add(createElement("i"))
                ))
            ))
        );
    }
    check() {
        let win = false;
        for(var i in this.groups){
            let e = this.groups[i].map(e=>e.dataset.marker);
            if([...new Set(e)].length == 1 && ["x", "o"].includes(e[0])){
                return this.groups[i];
            }
        }
    }
    tally(number){
        let arr = [..."abcde"];
        let str = "";
        while(number > 4){
            str += "e";
            number -= 5;
        }
        if(number >0){
            str += arr[number-1];
        }
        return str;
    }
}