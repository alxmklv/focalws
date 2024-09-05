

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
  function loadContent(src, type) {
    var $mainContent = $('#mainContent');
    if (type === 'video') {
      $mainContent.html('<video controls><source src="' + src + '" type="video/mp4"></video>');
    } else {
      $mainContent.html('<img src="' + src + '" alt="Content">');
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
    var src = $(this).data('src');
    var type = $(this).data('type');
    loadContent(src, type);
  });

  // Close the modal if the user clicks outside of it
  $(window).click(function(event) {
    if ($(event.target).attr('id') === 'lightbox') {
      closeModal('lightbox');
    }
  });

  // Close the modal if the Escape key is pressed
  $(document).keydown(function(event) {
    if (event.key === "Escape") {
      closeModal('lightbox');
    }
  });

  // Load the initial content from the first preview
  var $firstPreview = $('.preview-item').first();
  if ($firstPreview.length) {
    var initialSrc = $firstPreview.data('src');
    var initialType = $firstPreview.data('type');
    loadContent(initialSrc, initialType);
    $firstPreview.addClass('active');
  }
});


/////

// Load JSON and clone the template for each issue
$.getJSON('https://alxmklv.github.io/focalws/issues.json', function(data) {
    var template = $('#issue-template');
    var issuesList = $('#issues-list');

    $.each(data, function(index, issue) {
        // Clone the template and populate the data
        var clonedIssue = template.clone().removeAttr('id').show();
        clonedIssue.find('.issue-title').text(issue['issue-type']);
        clonedIssue.find('.issue-severity').text(issue['issue-severity']);

        // Attach the data attributes for later use
        clonedIssue.attr('data-issue-id', issue.issueID)
            .attr('data-title', issue['issue-type'])
            .attr('data-severity', issue['issue-severity'])
            .attr('data-product', issue['issue-product'])
            .attr('data-url', issue['issue-product-url'])
            .attr('data-revenue', issue['issue-revenue'])
            .attr('data-description', issue['issue-description'])
            .attr('data-image', issue['issue-image-link'])
            .attr('data-video', issue['issue-video-link']);

        // Append the cloned issue to the list
        issuesList.append(clonedIssue);
    });
});

// Update sidebar when an issue is clicked
$(document).on('click', '#issues-list div', function() {
    var issueTitle = $(this).data('title');
    var issueSeverity = $(this).data('severity');
    var issueProduct = $(this).data('product');
    var issueUrl = $(this).data('url');
    var issueRevenue = $(this).data('revenue');
    var issueDescription = $(this).data('description');
    var issueImage = $(this).data('image');
    var issueVideo = $(this).data('video');

    // Update sidebar content
    $('#issue-title').text(issueTitle);
    $('#issue-severity').text(issueSeverity);
    $('#issue-product-link').text(issueProduct).attr('href', issueUrl);
    $('#issue-revenue').text(issueRevenue);
    $('#issue-description').text(issueDescription);
    $('#issue-image').attr('src', issueImage);
    $('#issue-video-link').attr('href', issueVideo);
});
