var form = document.getElementById('bookmarkForm');
var siteUrl = document.getElementById('siteUrl');
var siteName = document.getElementById('siteName');
var updateButton = document.getElementById('updateButton');
var books = JSON.parse(localStorage.getItem('data')) ?? [];
var bookmarkList = document.getElementById('bookmarkList');
var submitButton = document.getElementById('submitButton');
var searchInput = document.getElementById('searchInput');

display(books);
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log("Dsa");
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
    display(books);
}
function clearForm(){
    siteName.value = null ;
    siteUrl.value = null ;
}
function display(data){
    bookmarkList.innerHTML = '';
    data.forEach(function(bookmark, index) {
        var row = bookmarkList.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = index + 1;
        cell2.innerHTML = bookmark.siteName;
        cell3.innerHTML = `<a href="${bookmark.siteUrl}" target="_blank" class="btn btn-success">Visit</a>  `;
        cell4.innerHTML = `<button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button> <button class="btn btn-success" type = 'button' onclick="editBookmark(${index})">Edit</button>`;
    });
}
function deleteBookmark(index){
  
    books.splice(index, 1);
    localStorage.setItem('data' , JSON.stringify( books))
    display(books)
}
var updatedIndex ;
function editBookmark(index){
    siteName.value = books[index]['siteName'];
  siteUrl.value = books[index]['siteUrl'];
  updatedIndex =  index ;
  updateButton.classList.add("d-block");
  submitButton.classList.add("d-none");

}
updateButton.addEventListener('click', function() {
  updateBookmark(updatedIndex)
});
function updateBookmark(index){
  books[index]['siteName'] = siteName.value ;
  books[index]['siteUrl'] =  siteUrl.value ;
  localStorage.setItem('data' , JSON.stringify( books))
  display(books)
  submitButton.classList.remove("d-none");
  updateButton.classList.remove("d-block");

}
document.getElementById('siteUrl').addEventListener('input', function () {
    const urlInput = this;
    const urlFeedback = document.getElementById('urlFeedback');
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    if (urlInput.value === '') {
      urlInput.classList.remove('is-invalid');
      urlFeedback.style.display = 'none';
    } else if (!urlPattern.test(urlInput.value)) {
      urlInput.classList.add('is-invalid');
      urlFeedback.style.display = 'block';
    } else {
      urlInput.classList.remove('is-invalid');
      urlFeedback.style.display = 'none';
    }
  });
  function search(word){
    var searchedData = [];
    for (let i = 0; i < books.length; i++) {

      if(books[i]['siteName'].trim().toLowerCase().includes(word.toLowerCase())   ){
        searchedData.push(books[i]);
      }
     
    }
   
    display( searchedData);
  }
  searchInput.addEventListener('input', function(event) {
search(this.value);
});