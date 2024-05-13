function addReview() {
 const productName = document.getElementById('productName').value;
 const reviewText = document.getElementById('reviewText').value;
 if (!productName || !reviewText) {
     alert('Пожалуйста, заполните все поля!');
     return;
 }

 const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
 if (!reviews[productName]) {
     reviews[productName] = [];
 }
 reviews[productName].push(reviewText);
 localStorage.setItem('reviews', JSON.stringify(reviews));
 displayReviews();
 document.getElementById('productName').value = '';
 document.getElementById('reviewText').value = '';
}

function displayReviews() {
 const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
 const reviewsContainer = document.getElementById('reviewsContainer');
 reviewsContainer.innerHTML = '';
 Object.keys(reviews).forEach(productName => {
     const productDiv = document.createElement('div');
     productDiv.className = 'review';
     const productNameElement = document.createElement('h3');
     productNameElement.innerText = productName;
     productNameElement.onclick = () => toggleReviews(productName);
     productDiv.appendChild(productNameElement);
     const reviewList = document.createElement('ul');
     reviewList.style.display = 'none';
     reviews[productName].forEach((review, index) => {
         const reviewItem = document.createElement('li');
         reviewItem.innerText = review;
         const deleteButton = document.createElement('button');
         deleteButton.innerText = 'Удалить';
         deleteButton.onclick = () => deleteReview(productName, index);
         reviewItem.appendChild(deleteButton);
         reviewList.appendChild(reviewItem);
     });
     productDiv.appendChild(reviewList);
     reviewsContainer.appendChild(productDiv);
 });
}

function toggleReviews(productName) {
 const productDivs = document.getElementById('reviewsContainer').children;
 for (const productDiv of productDivs) {
     const reviewList = productDiv.children[1];
     if (productDiv.children[0].innerText === productName) {
         reviewList.style.display = reviewList.style.display === 'none' ? 'block' : 'none';
     } else {
         reviewList.style.display = 'none';
     }
 }
}

function deleteReview(productName, index) {
 const reviews = JSON.parse(localStorage.getItem('reviews'));
 reviews[productName].splice(index, 1);
 if (reviews[productName].length === 0) {
     delete reviews[productName];
 }
 localStorage.setItem('reviews', JSON.stringify(reviews));
 displayReviews();
}

window.onload = displayReviews;
