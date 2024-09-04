

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



        // Function to display the selected content
         function showContent(type, src) {
             const mainContent = document.getElementById('main-content');
             mainContent.innerHTML = ''; // Clear current content

             if (type === 'image') {
                 const img = document.createElement('img');
                 img.src = src;
                 img.alt = 'Main Content';
                 mainContent.appendChild(img);
             } else if (type === 'video') {
                 const video = document.createElement('video');
                 video.src = src;
                 video.controls = true;
                 mainContent.appendChild(video);
             }

             // Update the active preview
             const previews = document.getElementById('previews').getElementsByTagName('img');
             for (let i = 0; i < previews.length; i++) {
                 previews[i].classList.remove('active');
             }
             event.target.classList.add('active');
         }

         // Function to initialize the lightbox with the first preview
         function initializeLightbox() {
             const firstPreview = document.querySelector('.previews img');
             if (firstPreview) {
                 const type = firstPreview.getAttribute('data-type');
                 const src = firstPreview.getAttribute('data-src');
                 showContent(type, src);
                 firstPreview.classList.add('active'); // Mark the first preview as active
             }
         }

         // Event listener for clicks on previews
         document.getElementById('previews').addEventListener('click', function(event) {
             if (event.target.tagName === 'IMG') {
                 const type = event.target.getAttribute('data-type');
                 const src = event.target.getAttribute('data-src');
                 showContent(type, src);
             }
         });

         // Event listener for button clicks with specific class
         document.addEventListener('click', function(event) {
             if (event.target.classList.contains('init-lightbox-btn')) {
                 initializeLightbox();
             }
         });
