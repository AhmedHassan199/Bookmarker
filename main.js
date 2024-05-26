var form = document.getElementById('bookmarkForm');
var siteUrl = document.getElementById('siteUrl');
var siteName = document.getElementById('siteName');
var books = JSON.parse(localStorage.getItem('data')) ?? [];
var bookmarkList = document.getElementById('bookmarkList');
display();
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    addBook();
    clearForm()
});

 function addBook(){
    var bookData = {
        siteName : siteName.value, 
        siteUrl : siteUrl.value, 
    }
    books.push(bookData);
    localStorage.setItem('data' , JSON.stringify( books))
    display();
}
function clearForm(){
    siteName.value = null ;
    siteUrl.value = null ;
}
function display(){
    bookmarkList.innerHTML = '';
    books.forEach(function(bookmark, index) {
        var row = bookmarkList.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = index + 1;
        cell2.innerHTML = bookmark.siteName;
        cell3.innerHTML = `<a href="${bookmark.siteUrl}" target="_blank" class="btn btn-success">Visit</a>`;
        cell4.innerHTML = `<button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button>`;
    });
}
function deleteBookmark(index){
  
    books.splice(index, 1);
    localStorage.setItem('data' , JSON.stringify( books))
    display()
}