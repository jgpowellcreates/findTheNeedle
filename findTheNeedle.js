//Building a recursive function that will go through an object's keys to look for a user-defined variable

//object to test
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
    }
}

//function in place
function findThe (needle, haystack) {
    //console.log(haystack)
    let objectLevel = 1;
    let destructTerm = [];
    //what if I don't pass in a string and wrap their object in an object?

    (function recurse(obj) {
        console.log("recurse, baby!", objectLevel)
        for (let key in obj) {
            console.log(objectLevel, key, typeof key)
            if (typeof obj[key] == 'object' && Array.isArray(obj[key]) == false) {
                console.log("i found an object! It's", key)
                objectLevel++;
                recurse(obj[key])
                //if the value is an object...
                /*

                */

                //objectLevel++;
                //destructTerm.push(obj[key]);
                //recurse(destructTerm.obj[key]);
            }

        }
        objectLevel--;
        console.log("Finished a recurse", objectLevel)
    })(haystack)
    
}

//findThe(needleInThe, haystack);
//Replace w/ what you're looking for and in what object!
findThe("needleInThe", cupboard)
