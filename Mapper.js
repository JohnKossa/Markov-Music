var seeds = {
    mhall: [4,2,0,2,4,4,4,2,2,2,4,7,7,4,2,0,2,4,4,4,2,2,4,2,0]
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
        var rand = Math.random();
        var x = 0;
        while(rand>0 && x<12){
            console.log(rand);
            console.log(result[result.length-1]);
            rand -= weights[result[result.length-1]][x];
            x++;
        }
        var nextNote = x-1;
        result.push(nextNote);
    }
    return result;
}

//seedWeights("uniform");
seedWeights("repeat");
generateMap(seeds.mhall);
console.log(weights);


var noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var result = remap(24);
var resultString = "";
for(var i = 0; i<result.length;i++){
    resultString = resultString + noteNames[result[i]]+" ";
}
console.log(resultString);