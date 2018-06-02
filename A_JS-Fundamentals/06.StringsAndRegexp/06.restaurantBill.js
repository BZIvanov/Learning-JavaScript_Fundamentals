function bill(input) {
    let items = input.filter((x,i) => i % 2 == 0);
    let sum = input.filter((x, i) => i % 2 == 1).map(Number).reduce((a, b) => a + b);
    console.log(`You purchased ${items.join(', ')} for a total sum of ${sum}`);
}

bill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69'])