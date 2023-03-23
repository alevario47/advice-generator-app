const resultsDiv = document.querySelector('#results');

const numberDiv = document.querySelector('#advice-number')

const resultsButton = document.querySelector('#get-advice')




let adviceObject = null;

function getAdvice(){
    
    //fetch method doumentation: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //the fetch() method provides a logical way to literally fetch resources across the network


    // the fetch method does not directly return the JSON response body but instead returns a promise, here our promise is the res object!
    // A "promise" is essentially a placeholder for a task that isn't completed yet. e.g., we are getting the advice, but we don't have it yet.
    // So we make a promise, the promise then uses the '.then' statement to complete a sequential action, or a '.catch' statement if there is no item placed in the 'promise'
    // the res object not not directly contain the actual json. The res object is simply a representation of the entire http response. 
    //To extract content from the JSON body from the res object, we use the json() method
    fetch ('https://api.adviceslip.com/advice',{cache: "no-store"})
    .then(response => {
    return response.json();
    }).then(adviceData => {
        //Here you are making a variable, and assigning that variable with the advice data. The '.slip' function is a function from the API we are using. Which gives us the advice information we need
        adviceObject = adviceData.slip;
        numberDiv.innerHTML = `<p> ADVICE #${adviceObject.id}<p>`;
        resultsDiv.innerHTML = `<p> "${adviceObject.advice}"<p>`;
        //In case we do not recieve anything, we use the '.catch' method to  'catch' the error and prevent our program from completely stopping
    }).catch(error => {
        console.log(error);
    }); //end of fetch
} //end of getAdvice function

resultsButton.addEventListener('click', () => {
    getAdvice();
})


// an event listener not attached to any specific element in the dom. The event to be met is the LOAD event
addEventListener("load", (event) => {
    // the word event     ^^^^ might throw you off. This is just to represent an event that takes place in the DOM
    //the DOM is essentially the 'structure' of our program. What we are doing is checking if the person has clicked anywhere
    getAdvice();
})