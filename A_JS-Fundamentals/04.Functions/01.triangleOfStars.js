function stars(n) {
    for(let i = 1; i <= n; i++) {
        drawStars(i)
    }
    for(let j = n - 1; j > 0; j--) {
        drawStars(j)
    }

    function drawStars(a) {
        console.log('*'.repeat(a))
    }
}

stars(5)
