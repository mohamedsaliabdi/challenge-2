// write your code here
document.addEventListener("DOMContentLoaded", () => {
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => {
        initializeApp(data.images);
      });
  });
  
  function initializeApp(images) {
    const imageList = document.getElementById("image-list");
    const imageTitle = document.getElementById("card-title");
    const imageElement = document.getElementById("card-image");
    const likeCount = document.getElementById("like-count");
    const likeButton = document.getElementById("like-button");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment");
    const commentsList = document.getElementById("comments-list");
  
    populateImageList(images, imageList);
  
    // Event listener for selecting an image
    imageList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const selectedImage = images.find(
          (image) => image.id === parseInt(event.target.dataset.imageId)
        );
        displayImageDetails(selectedImage, imageTitle, imageElement, likeCount, commentsList);
      }
    });
  
    // Like button event listener
    likeButton.addEventListener("click", () => {
      const selectedImage = images.find((image) => image.id === 1); // Assuming we're always viewing the first image
      selectedImage.likes += 1;
      likeCount.textContent = `${selectedImage.likes} likes`;
    });
  
    // Comment form submission event listener
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newComment = commentInput.value.trim();
      if (newComment) {
        addComment(newComment, images, commentsList);
        commentInput.value = ""; // Clear the input field
      }
    });
  }
  
  function populateImageList(images, imageList) {
    images.forEach((image) => {
      const li = document.createElement("li");
      li.textContent = image.title;
      li.dataset.imageId = image.id;
      imageList.appendChild(li);
    });
  }
  
  function displayImageDetails(image, imageTitle, imageElement, likeCount, commentsList) {
    imageTitle.textContent = image.title;
    imageElement.src = image.image;
    imageElement.alt = image.title;
    likeCount.textContent = `${image.likes} likes`;
  
    // Display the comments
    commentsList.innerHTML = "";
    image.comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment.content;
      commentsList.appendChild(li);
    });
  }
  
  function addComment(content, images, commentsList) {
    const selectedImage = images.find((image) => image.id === 1); // Assuming we're always viewing the first image
    const newComment = {
      id: selectedImage.comments.length + 1,
      imageId: selectedImage.id,
      content: content,
    };
  
    selectedImage.comments.push(newComment);
  
    const li = document.createElement("li");
    li.textContent = newComment.content;
    commentsList.appendChild(li);
  }
  