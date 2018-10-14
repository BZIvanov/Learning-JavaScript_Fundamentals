function bitcoinMining(arr) {
    let goldAmount = 0;
    let bitcoins = 0;
    let firstPurchase = 0;
    for(let i = 0; i < arr.length; i++) {
        if((i + 1) % 3 === 0) {
            arr[i] = +arr[i] * 0.7;
        }

        goldAmount += +arr[i] * 67.51

        while(goldAmount >= 11949.16) {
            goldAmount -= 11949.16;
            bitcoins++;
            if(bitcoins === 1 && firstPurchase === 0) {
                firstPurchase = i + 1;
            }
        }
    }

    console.log(`Bought bitcoins: ${bitcoins}`)
    if(firstPurchase) {
        console.log(`Day of the first purchased bitcoin: ${firstPurchase}`)
    }
    console.log(`Left money: ${goldAmount.toFixed(2)} lv.`)
}