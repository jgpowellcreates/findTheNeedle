//Building a recursive function that will go through an object"s keys to look for a user-defined variable

/*
Next Steps:
 -X Turn off search logs
 -X Add results to a variable outside of function. window.haystackResults

		Determine how to address:
		Window object
		domnode exceptions
		jQuery exceptions
		Document object exceptions
*/



window.haystackResults = [];
function findThe (needle, haystack) {
    let path = [];
    let results = [];
    let rules = [
        {
            "label":"domnode",
            "condition": (arg) => {return arg instanceof HTMLElement},
            "code": (arg) => {console.log(`Execute domnode code for ${path}.${arg}`)},
            "message": "Exception for domnode",
            "description":"HTML Elements loop through attribute, doctype, etc."
        },
        {
            "label":"jQuery",
            "condition": (arg) => {return arg instanceof jQuery},
            "code": (arg) => {console.log(`Execute jQuery node code for ${path}.${arg}`)},
            "message": "That's a thing",
            "description":"jQuery objects create loops"
        },
        {
            "label":"Document Object",
            "condition": (arg) => {return arg instanceof Document},
            "code": (arg) => {console.log(`Execute Document code for ${path}.${arg}`)},
            "message": "Exception for Document object",
            "description":"Documents reference themselves through doctype that create loops"
        },
        // {
        //     "label":"template", //example
        //     "condition": () => {return (/*condition*/)},
        //     "code": () => {},
        //     "message": "That"s a thing",
        //     "description":"Allen, it"s a thing"
        // }
    ];

    (function recurse(obj) {
        for (let key in obj) {
            //When you pass over a key, save it to the path array in case it holds more objects
            path.push(key);
            let exceptionThrown = false;
            //will loop through all Exceptions first
            rules.forEach((rule) => {
                if (rule.condition(obj[key])) {
                    //console.log(rule.message)
                    exceptionThrown = true;
                    (!!rule.code && typeof rule.code == "function") ? rule.code(key) : console.log("No code");
                }
            })
            if (!exceptionThrown) {
                if (key.toLowerCase().indexOf(needle) > -1) {
                    var result = {key: key, path: path.join("."), prop: obj[key]}
                    results.push(result)
                }
                if (typeof obj[key] == "object" && Array.isArray(obj[key]) == false) {
                    recurse(obj[key])
                }
            }
            path.pop();
        }
    })(haystack)
    window.haystackResults.push({
        "term": needle,
        "object": haystack,
        "results":results
    });
    return results;
}

findThe("needle", object)
