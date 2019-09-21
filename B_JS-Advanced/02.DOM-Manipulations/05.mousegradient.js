function attachGradientEvents() {
    let box = document.getElementById("gradient");
    box.addEventListener("mousemove", showWhere);
    box.addEventListener("mouseout", movedOut);

    function showWhere(event) {
        let power = event.offsetX / (event.target.clientWidth - 1);
        power = Math.trunc(power * 100);
        document.getElementById('result').textContent = power + "%";
    }

    function movedOut() {
        document.getElementById('result').textContent = "";
    }
}
