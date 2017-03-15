/*jslint esversion: 6, browser: true*/
/*global window, $, jQuery, alert*/

$(document).ready( function () {
  const searchField = $('#search'); // Search input field
  const searchMessage = $('<h5></h5>'); // Element to display number of matched images
  const searchMessageParent = $('header'); // Parent container for searchMessage
  const searchButton = $('#search-btn'); // Button to clear search term
  const photoGalleryLink = $('.photo-gallery-img a'); // Photo gallery links
  const imageTotal = photoGalleryLink.length; // Total number of photos
  
  // Update search massage with matched image count and image total 
  function updateSearchMessage(searchCount, imageTotal) {
    // Update the matched image count and display message
    let imagesShown;

    if (searchCount === -1) {
      // All images are being displayed at page load
      imagesShown = imageTotal;
      //Create element to hold message
      searchMessageParent.append(searchMessage);
    } else if (searchCount > 0) {
      // x of y images showing based on search result
      imagesShown = searchCount;
    } else {
      // No matching search results
      imagesShown = 0;
    }
    // Change search message
    searchMessage.text("Displaying " + imagesShown + " of " + imageTotal + " images");
  }
  
  // Filter search results in real-time as the user types
  function searchFilter() {
    let searchTerm = searchField.val(); // Store search input text
    let searchCount = 0; // Store number of matches from search
    
    // Loop through each photo gallery image link
    photoGalleryLink.each( function () {
      // If the data title does not contain the search term, fade out its parent container
      if ($(this).attr("data-title").search(new RegExp(searchTerm, "i")) < 0) {
          $(this).parent().fadeOut(400);
//          $(this).attr("data-lightbox", "");

      // Show parent container if the search term matches and increase the match by 1
      } else {
          $(this).parent().fadeIn(400);
//          $(this).attr("data-lightbox", "travels");
          searchCount++;
      }
    });
    
    // Call to update search message
    updateSearchMessage(searchCount, imageTotal);
  }
  
  // Clear search results and display all photos
  searchButton.click( function () {
    searchField.val("");
    searchFilter();
  });
  
  // Call to initially set search message
  updateSearchMessage(-1, imageTotal);
  
  // Perform search after each keyup event in the search input field
  searchField.keyup( searchFilter );
});


