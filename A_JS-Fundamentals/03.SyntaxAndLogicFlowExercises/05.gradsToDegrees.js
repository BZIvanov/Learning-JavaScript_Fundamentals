function gradsToDegrees(g) {
    g %= 400

    if (g < 0) {
        g += 400
    }
    
    g *= 0.9
    console.log(g)
}

gradsToDegrees(850);
gradsToDegrees(0);
