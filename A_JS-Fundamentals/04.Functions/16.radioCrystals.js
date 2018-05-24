function radioCrystals(input) {
    input = input.map(Number);
    let target = input[0];
    for (let i = 1; i < input.length; i++) {
        let crystal = input[i];
        console.log(`Processing chunk ${crystal} microns`);
        let cutCount =0;
        while(crystal / 4 >= target) {  crystal /= 4;  cutCount++ }
        if(cutCount != 0) {
            console.log(`Cut x${cutCount}`);
            console.log("Transporting and washing");
            crystal = Math.floor(crystal);
        }
        let lapCount =0;
        while(crystal-crystal*0.2 >= target) {  crystal -= crystal*0.2;  lapCount++ }
        if(lapCount != 0) {
            console.log(`Lap x${lapCount}`);
            console.log("Transporting and washing");
            crystal = Math.floor(crystal);
        }
        let grindCount =0;
        while(crystal-20 >= target) {  crystal -= 20;  grindCount++ }
        if(grindCount != 0) {
            console.log(`Grind x${grindCount}`);
            console.log("Transporting and washing");
            crystal = Math.floor(crystal);
        }
        let etchCount =0;
        while(crystal-2 >= target-1) {  crystal -= 2;  etchCount++ }
        if(etchCount != 0) {
            console.log(`Etch x${etchCount}`);
            console.log("Transporting and washing");
            crystal = Math.floor(crystal);
        }
        if(crystal < target) {
            crystal++;
            console.log(`X-ray x1`);
        }
        console.log(`Finished crystal ${target} microns`);
    }
}

radioCrystals(['1375', '50000']);