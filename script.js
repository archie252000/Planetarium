// Parallax effect
const onboard = document.getElementById("onboard");

const container = document.getElementsByClassName("my-container");
container[0].addEventListener("scroll", () => {
    let offset = container[0].scrollTop;
    onboard.style.backgroundPositionY = offset * 0.7 + 'px';
});