

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

//


//Ajax textStatus

$.getJSON('https://alxmklv.github.io/focalws/issues.json', function(data) {
    console.log("Data loaded successfully:", data);
}).fail(function(jqXHR, textStatus, errorThrown) {
    console.error("Failed to load JSON data:", textStatus, errorThrown);
});


/// issueS
$(document).ready(function() {
    var issueData = [];  // Holds the issue objects.
    var howToData = {};  // This could hold related how-to data if you need to load it.

    // Load issue data from JSON
    $.getJSON('https://alxmklv.github.io/focalws/issues.json', function(data) {
        console.log("Data loaded:", data);
        issueData = data;
        populateIssues();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Failed to load issue data:", textStatus, errorThrown);
    });

    // Function to populate the issue list
    function populateIssues() {
        var $list = $('#itemList');
        $list.empty();
        console.log("Populating issues...");

        $.each(issueData, function(index, issue) {
            var $template = $('#issueTemplate').clone().removeAttr('id').show();

            if (!$template.length) {
                console.error("Template cloning failed.");
                return;
            }

            $template.find('[data-target-list="issue-title"]').text(issue['issue-type']);
            $template.find('[data-target-list="issue-product-link"]').attr('href', issue['issue-product-url']).text(issue['issue-product']);
            $template.find('[data-target-list="issue-revenue"]').text(issue['issue-revenue']);
            $template.data('issue-id', issue['issueID']);  // Store issue ID for later use
            $list.append($template);
        });

        console.log("Issues populated:", $list.children().length);
    }

    // Click event handler for issue list items
    $('#itemList').on('click', '.issues_table_row', function() {
        var issueID = $(this).data('issue-id');
        var issue = issueData.find(issue => issue.issueID === issueID);

        if (issue) {
            updateSidebar(issue);
        } else {
            console.error("Issue not found:", issueID);
        }
    });

    // Update the sidebar with issue details
    function updateSidebar(issue) {
        $('[data-target="issue-title"]').text(issue['issue-type']);
        $('[data-target="issue-product-link"]').attr('href', issue['issue-product-url']).text(issue['issue-product']);
        $('[data-target="issue-revenue"]').text(issue['issue-revenue']);
        $('[data-target="issue-description"]').text(issue['issue-description']);
        $('[data-target="image"]').attr('src', issue['issue-image-link']);
        $('[data-target="video"]').attr('src', issue['issue-video-link']);

        // Example of setting how-to data if you have that data structure
        // updateHowToLists(issue['issue-type'], '#howToList');
    }

    // Optionally, function to update how-to steps (assuming how-to data is structured and loaded similarly)
    function updateHowToLists(issueType, containerSelector) {
        var steps = howToData[issueType] || [];
        var $list = $(containerSelector).empty();

        steps.forEach(function(step) {
            var $template = $('#howToTemplate').clone().removeAttr('id').css('display', '');
            $template.find('[data-target="how-to-heading"]').text(step.heading);
            $template.find('[data-target="how-to-description"]').text(step.description);
            $list.append($template);
        });
    }
});


// cloning

$(document).ready(function() {
    var $template = $('#issueTemplate').clone().removeAttr('id').show();
    if ($template.length) {
        console.log("Template cloned successfully");
    } else {
        console.error("Template cloning failed.");
    }
});


//// Modal



  $(document).ready(function() {
    // Function to open the modal
    function openModal(modalId) {
      $('#' + modalId).fadeIn(); // Fade in the modal
    }

    // Function to close the modal
    function closeModal(modalId) {
      $('#' + modalId).fadeOut(); // Fade out the modal
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
  });
