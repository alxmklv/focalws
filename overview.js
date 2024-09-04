

// Issue Select feature
// script.js
$(document).ready(function() {
    // Variable to keep track of selection status
    var isSelected = false;

    // Container to update based on selection status
    var infoDrawer = $('.info_drawer');

    $('#itemList').on('click', '.issues_table_row', function() {
        var $this = $(this);

        // Check if the clicked item is already selected
        if ($this.hasClass('selected')) {
            // Deselect the item
            $this.removeClass('selected');
            isSelected = false;
        } else {
            // Remove 'selected' class from all rows
            $('.issues_table_row').removeClass('selected');

            // Add 'selected' class to the clicked row
            $this.addClass('selected');
            isSelected = true;
        }

        // Update the visibility of selection status elements
        if (isSelected) {
            infoDrawer.find('.has-selection').show();
            infoDrawer.find('.no-selection').hide();
        } else {
            infoDrawer.find('.has-selection').hide();
            infoDrawer.find('.no-selection').show();
        }
    });

    // Remove this part to stop deselecting items when clicking outside
    /*
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#itemList').length) {
            $('.issues_table_row').removeClass('selected');
            isSelected = false;
            infoDrawer.find('.has-selection').hide();
            infoDrawer.find('.no-selection').show();
        }
    });
    */
});



// Sparkline


        $(document).ready(function() {
            var errorValues = [0, 0, 0, 0, 0, 0, 52];
            var warningValues = [0, 0, 0, 0, 0, 0, 103];
            var infoValues = [0, 0, 0, 0, 0, 0, 196];

            $('#errors').sparkline(errorValues, {
                type: 'line',
                width: '100%',
                height: '100%',
                lineColor: '#EE3939',
                fillColor: 'rgba(238, 57, 57, 0.2)',
                spotColor: '#EE3939',
                minSpotColor: '#EE3939',
                maxSpotColor: '#EE3939',
                highlightSpotColor: '#EE3939',
                highlightLineColor: '#EE3939',
                spotRadius: 1
            });

            $('#warnings').sparkline(warningValues, {
                type: 'line',
                width: '100%',
                height: '100%',
                lineColor: '#FF7B43',
                fillColor: 'rgba(255, 123, 67, 0.2)',
                spotColor: '#FF7B43',
                minSpotColor: '#FF7B43',
                maxSpotColor: '#FF7B43',
                highlightSpotColor: '#FF7B43',
                highlightLineColor: '#FF7B43',
                spotRadius: 1
            });

            $('#info').sparkline(infoValues, {
                type: 'line',
                width: '100%',
                height: '100%',
                lineColor: '#4998F5',
                fillColor: 'rgba(73, 152, 245, 0.2)',
                spotColor: '#4998F5',
                minSpotColor: '#4998F5',
                maxSpotColor: '#4998F5',
                highlightSpotColor: '#4998F5',
                highlightLineColor: '#4998F5',
                spotRadius: 1
            });
        });

//////////////////////////////
$(document).ready(function() {
   // Function to open the modal
   function openModal(modalId) {
     $('#' + modalId).fadeIn(); // Fade in the modal
   }

   // Function to close the modal
   function closeModal(modalId) {
     $('#' + modalId).fadeOut(); // Fade out the modal
   }

   // Function to load content into the main content area
   function loadContent(contentUrl, isVideo) {
     var $mainContent = $('#mainContent');
     if (isVideo) {
       $mainContent.html('<video controls><source src="' + contentUrl + '" type="video/mp4"></video>');
     } else {
       $mainContent.html('<img src="' + contentUrl + '" alt="Content">');
     }
   }

   // Function to initialize the gallery
   function initializeGallery(previews) {
     var $previewList = $('#previewList');
     $previewList.empty();
     previews.forEach(function(preview, index) {
       var isActive = index === 0 ? ' active' : '';
       var itemHtml = '<div class="preview-item' + isActive + '" data-content-url="' + preview.url + '" data-is-video="' + preview.isVideo + '">'
                    + '<img src="' + preview.thumbnail + '" alt="Preview">'
                    + '</div>';
       $previewList.append(itemHtml);
     });

     // Load the initial content
     if (previews.length > 0) {
       var firstPreview = previews[0];
       loadContent(firstPreview.url, firstPreview.isVideo);
     }
   }

   // Event handler to handle clicks on elements with data-action attribute
   $(document).on('click', '[data-action]', function() {
     var action = $(this).data('action');
     var modalId = $(this).data('modal-id');

     if (action === 'open-modal') {
       openModal(modalId);
     } else if (action === 'close-modal') {
       closeModal(modalId);
     }
   });

   // Event handler for preview clicks
   $(document).on('click', '.preview-item', function() {
     $('.preview-item').removeClass('active');
     $(this).addClass('active');
     var contentUrl = $(this).data('content-url');
     var isVideo = $(this).data('is-video');
     loadContent(contentUrl, isVideo);
   });

   // Close the modal if the user clicks outside of it
   $(window).click(function(event) {
     if ($(event.target).attr('id') === 'lightbox') {
       closeModal('lightbox');
     }
   });

   // Initialize the gallery with sample data
   var previews = [
     { url: 'image1.jpg', thumbnail: 'thumb1.jpg', isVideo: false },
     { url: 'video1.mp4', thumbnail: 'thumb2.jpg', isVideo: true },
     { url: 'image2.jpg', thumbnail: 'thumb3.jpg', isVideo: false }
   ];
   initializeGallery(previews);
 });
