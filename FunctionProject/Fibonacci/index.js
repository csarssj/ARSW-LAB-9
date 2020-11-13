var bigInt = require("big-integer");

men = []
function memory(n){
    if (men[n]!= null){
        return men[n];
    }
    else {
        men[n] = memory(n-1).add(memory(n-2));
        return men[n]
    }

}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;

    if (nth < 0)
        throw 'must be greater than 0'
    else if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
       /* for (var i = 0; i < nth - 1; i++) {
            answer = nth_2.add(nth_1)
            nth_2 = nth_1
            nth_1 = answer
        }*/
        answer = memory(nth);
    }

    context.res = {
        body: answer.toString()
    };
}