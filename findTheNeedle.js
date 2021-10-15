//Building a recursive function that will go through an object's keys to look for a user-defined variable

//Basic Object to Test
//I'm putting the key/value pair 'check: true' at multiple levels so I can check for it!
var cupboard = {
    fruit_1: "apple",
    vegetable_1: "broccoli",
    recipe: {
        ingredients: ["flour","sugar","stuff"],
        appliances: ["oven","processor"],
        prepTime: 15,
        bakeTime: 30,
        check: true,
        randomObject: {
            a: 123,
            b: 456,
            c: 789,
            d: 012
        }
    },
    owner: {
        name: "Jacob",
        age: 28,
        check: true
    },
    randomString: "good string",
    randomNumber: 12,
    randomArray: [1,2,"pre-blessed ham"],
    randomObject: {
        message: "Want to see how objectLevel works",    
    }
}

function findThe (needle, haystack) {
    //let objectLevel = 0;   -- Thought I might need to use this but have been able to work around it
    let path = [];
    let results = [];
    let objExceptions = [];

    (function recurse(obj) {
        for (let key in obj) {
            //When you pass over a key, save it to the path array in case it holds more objects
            path.push(key);
            //Read where you're checking!
            console.log("Searching path:", path.join('.'))
            //if (key.toLowerCase().indexOf("local_storage_frame") > -1) {
            if (obj[key] instanceof (HTMLElement || jQuery)) {
                //Making exceptions here for troublesome items. Have yet to determine the best way to handle these.
                console.log("Exception for HTML Element", path.join("."), key)
            } else {
                if (key.toLowerCase().indexOf(needle) > -1) {
                    //console.log("Found", key, "at", path.join('.'),"and it equals", obj[key])
                    var result = {key: key, path: path.join('.'), property: obj[key]}
                    results.push(result)
                }
                if (typeof obj[key] == 'object' && Array.isArray(obj[key]) == false) {
                    //objectLevel++;
                    recurse(obj[key])
                }
            }
            
            path.pop();
        }
        //objectLevel--;        
    })(haystack)   
    console.log(results);
    return results;
}

//findThe("needleInThe" [string], haystack [object]);
findThe("check", cupboard)
