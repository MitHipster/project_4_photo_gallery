/*jslint esversion: 6, browser: true*/
/*global window, $, jQuery, alert*/

$(document).ready( function () {
  let photoCaptionsArray = []; // Array to hold photo captions
  const searchField = $('#search'); // Search input field
  const searchMessage = $('<h5></h5>'); // Element to display number of matched images
  const searchMessageParent = $('header'); // Parent container for searchMessage
  const searchButton = $('#search-btn'); // Button to clear search term
  const photoGalleryLink = $('.photo-gallery-img a'); // Photo gallery links
  const photoGalleryCaption = $('.photo-gallery-desc figcaption'); // Photo gallery captions
  const imageTotal = photoGalleryLink.length; // Total number of photos
  const frClass = 'fresco'; // Class name to tag Fresco lightbox links
  const frCaptionAttr = 'data-fresco-caption'; // Fresco caption title attribute
  const frGroupAttr = 'data-fresco-group'; // Fresco image group attribute
  const frGroupVal = 'travels'; // Fresco image group attribute value
  const frOptionsAttr = 'data-fresco-group-options'; // Fresco image group options attribute
  const frOptionsShow = '500'; // Fresco transition show value
  const frOptionsHide = '400'; // Fresco transition hide value
  const frOptionsVal = `effects: {
                              content: { show: ${frOptionsShow}, hide: ${frOptionsHide} },
                              window: { show: ${frOptionsShow}, hide: ${frOptionsHide} }
                            }`; // Fresco image group effects option setting
  
  // Build photo caption array for use in assigning caption attribute below
  photoGalleryCaption.each( function () {
    photoCaptionsArray.push($(this).text());
  });

  // Dynamically add needed attributes to photo gallery links for lightbox functionality
  photoGalleryLink.each( function (index) {
    let $this = $(this);
    $(this).addClass(frClass);
    $(this).attr(frGroupAttr, frGroupVal);
    $(this).attr(frCaptionAttr, photoCaptionsArray[index]);
    $(this).attr(frOptionsAttr, frOptionsVal);
  });
  
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
      if ($(this).attr(frCaptionAttr).search(new RegExp(searchTerm, "i")) < 0) {
          $(this).parent().fadeOut(frOptionsHide);
          // Remove group attribute so filtered images do not appear in lightbox
          $(this).attr(frGroupAttr, "");

      // Show parent container if the search term matches and increase the match by 1
      } else {
          $(this).parent().fadeIn(frOptionsShow);
          // Add group attribute so matching images appear in lightbox
          $(this).attr(frGroupAttr, frGroupVal);
          // Increment match count
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


