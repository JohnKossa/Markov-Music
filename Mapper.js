var seeds = {
    //mhall: [4,2,0,2,4,4,4,2,2,2,4,7,7,4,2,0,2,4,4,4,2,2,4,2,0],
    //mwra: [4,2,0,2,4,4,4,2,2,2,4,4,4,4,2,0,2,4,4,4,2,2,4,2,0],
    //otj: [4,4,5,7,7,5,4,2,0,0,2,4,4,2,2,4,4,5,7,7,5,4,2,0,0,2,4,2,0,0],
    //botwf: [0,2,3,0,2,3,2,0,7,10,0],
    minor_scale: [0,2,3,5,7,8,10,0,10,8,7,5,3,2,0],
    major_scale: [0,2,4,5,7,9,11,0,11,9,7,5,4,2,0],
    major_appegio: [0,4,7,0,7,4,0],
    minor_appegio: [0,3,7,0,7,3,0],
    major_tonic: [0,4,7,4,0],
    minor_tonic: [0,3,7,3,0],
    repeat: [0,0,0],
    fourth: [0,5,0],
    fifth: [0,7,0]
};
var weights = [[],[],[],[],[],[],[],[],[],[],[],[]];

function seedWeights(mode){
    switch(mode){
        case "uniform":
            for(var i = 0; i<12; i++){
                for(var ii = 0; ii<12; ii++)
                {
                    weights[i][ii] = 1/12;
                }
            }
            break;
        case "repeat":
            for(var i = 0; i<12; i++){
                for(var ii = 0; ii<12; ii++)
                {
                    if(i==ii){
                        weights[i][ii] = 1/2;
                    }else{
                        weights[i][ii] = 1/24;
                    }

                }
            }
    }
}

function generateMap(sequence){
    var currentNote = sequence[0];
    for(var i = 1; i<sequence.length;i++){
        weights[currentNote][sequence[i]] = (weights[currentNote][sequence[i]]+1)/2;
        normalize(currentNote, sequence[i]);
        currentNote = sequence[i];
    }
}

function normalize(row, col){
    var rowSum = 0;
    var colSum = 0;
    for(var i = 0; i<12; i++){
        rowSum += weights[row][i];
        colSum += weights[i][col];
    }
    for(var i = 0;i<12;i++){
        weights[row][i] = weights[row][i]/rowSum;
        weights[i][col] = weights[i][col]/colSum;
    }
}

function remap(length){

    var result = [0];
    for(var i = 0; i<length; i++){
        console.log("--------------------------------");
        var rand = Math.random();
        var x = 0;
        while(rand>0 && x<12){
            //console.log(rand);
            //console.log(result[result.length-1]);
            rand -= weights[result[result.length-1]][x];
            console.log(rand);
            x++;
        }
        var nextNote = x-1;
        result.push(nextNote);
    }
    return result;
}

function printMatrix(matrix){
    for(var i in matrix){
        var printstring = matrix[i].map(function(el, i , arr){return el.toFixed(2)}).join(" : ");
        console.log(printstring);
    }
}

function walkSequence(sequence){
    for(var i = 0; i<12; i++){
        generateMap(sequence.map(function(el, index, arr){return (el+i)%12}))
    }
}

function repeat(callback, times){
    for(var i = 0; i<times; i++) {
        callback();
    }
}

seedWeights("uniform");

repeat(function(){walkSequence(seeds.major_scale)}, 10000);
repeat(function(){walkSequence(seeds.repeat)}, 10000);
repeat(function(){walkSequence(seeds.major_tonic)}, 50);
repeat(function(){walkSequence(seeds.fifth)}, 50);


var noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var result = remap(24);
var resultString = "";
for(var i = 0; i<result.length;i++){
    resultString = resultString + noteNames[result[i]]+" ";
}
printMatrix(weights);
console.log(resultString);