//  create a variable to hold db connection
let db;
//  establish connection to IndexedDB database called 'budget-tracker' and set to version 1
const request = indexedDB.open('budget-tracker', 1);
// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc)
request.onupgradeneeded = function(event) {
    // create a variable to hold the database
    const db = event.target.result;
    // create an object store called 'new-item' and set to autoIncrement true
    db.createObjectStore('new-item', {autoIncrement: true});
};
// this event will emit if the database connection is successful
request.onsuccess = function(event) {
    //  when db is successfully created with its object store, or simply established a connection to an existing database, assign the result to db in global  variable
    db = event.target.result;
    // check if app is online, if so, call getData() to retrieve data from local storage
    if (navigator.onLine) {
        getData();
    }
};
// this event will emit if there is an error with the database connection
request.onerror = function(event) {
    console.log(event.target.error(code));
}
// function to save data to IndexedDB
function saveData(data) {
    // create a transaction on the 'new-item' object store with readwrite access
    const transaction = db.transaction(['new-item'], 'readwrite');
    // access the 'new-item' object store
    const store = transaction.objectStore('new-item');
    // add data to the object store
    store.add(data);
}
