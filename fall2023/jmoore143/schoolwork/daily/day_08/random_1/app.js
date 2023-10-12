const imageArray = [
    "./1.jpg", "./2.jpg", "./3.jpg", "./4.jpg", "./5.jpg", "./6.jpg", "./6.jpg"];

const image = document.querySelector("img");
const button = document.querySelector("button");
// console.log("button", button)

window.onload = () => generateRandomPicture(imageArray);

button.addEventListener("click", () => generateRandomPicture(imageArray));

function generateRandomPicture(array) {
    // console.log(this.event)
    newRandom = Math.random()

    console.log("------------------")
    // console.log("newRandom:", newRandom)
    // console.log("array.length:", array.length)
    // console.log("newRandom * array.length ", newRandom * array.length)

    let randomNum = Math.floor(newRandom * array.length);


    // console.log("Random Number: ", randomNum)

    image.setAttribute("src", array[randomNum]);
    // image.style.width = randomNum * 30 + "px";    
    // console.log("image.style.width", image.style.width)
    // console.log("image: ", array[randomNum])
}