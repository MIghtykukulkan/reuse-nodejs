// all business logic should be present in this core folder
const to = require('await-to-js').default;
const request = require('async-request');

module.exports = {
    findGitUsers : findGitUsers
}


var getoptions = {
    method: "GET",
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
    },
}

function createNewUser(){
    
}

function findGitUsers(){

    return new Promise(async (resolve, reject)=>{  
        let error, result, finaljson;        
        [error, result] = await to(request('https://api.github.com/users?since=135',getoptions));
        if(error){
            reject(error);
        }
        else{
            resolve(result);
        }
    });


    
  }