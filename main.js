//read  file
const fs = require('fs');

let loadedData = ''
function readFile(){
    let dataR = "";
    fs.readFile('Number 3 textfile.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return;
        } 

        let splitData = data.split('?')
        let mixedArr = [];
        let quizSplited =[];
        let quiz1 = splitData[0]
        
        
        for(i=1 ; i<= splitData.length-1 ; i++){
             let choiceArr =[];
             let alpha = ['a', 'b', 'c','d', 'e', 'f', 'g']
             let regexfunc = /^[()]/;
             let quiz = splitData[i]
            
            let  quizSplit = quiz.split('\n');
             quizSplited.push(quizSplit)
           
            
            for(j = 1 ; j <= quizSplit.length-1;  j++){
                if(regexfunc.test(quizSplit[j])){
                    let split = quizSplit[j].split(")")
                    
                    choiceArr.push(split[1])
                }
                
             
            }
             
            //randomize choices
            for ( k= choiceArr.length - 1; k > 0; k--) {
                let randInt = Math.floor(Math.random() * (k + 1));
                [choiceArr[k], choiceArr[randInt]] = [choiceArr[randInt], choiceArr[k]]

                

            }     
               
                let  newArray = alpha.map((e, i) => `(${e})` + choiceArr[i]);
                  let Arr = newArray.splice(0, choiceArr.length)
                  mixedArr.push(Arr)       
           
        }
        

         
        for(m = 0; m <= quizSplited.length-1; m++){
            Array.prototype.splice.apply(quizSplited[m], [1, quizSplited.length].concat(mixedArr[m]));  
            
        }
       
      
        quizSplited.unshift(quiz1)
        let rawData = quizSplited.join('?');
        let regex = /,/g;
        rawData.replace(regex, "\n")
        rawData =rawData.replace(regex, '');
        fs.appendFile('Number 3 textfile1.txt', `${rawData}`, function (err) {
            if (err) {
                throw err
            }
            console.log("File updated!!")
        })
    
    });
    
    
    

}



readFile()







