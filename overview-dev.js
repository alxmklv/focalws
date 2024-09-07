

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
    var issueData = {};  // Object to hold JSON data for issues
    var fixData = {};    // Object to hold JSON data for fixes

    // Load issues JSON data
    $.ajax({
        url: 'https://alxmklv.github.io/focalws/issues.json',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, issue) {
                issueData[issue.issueID] = issue;

                // Clone the template for each issue in the list
                var $template = $('#issueTemplate').clone().removeAttr('id');
                $template.css('display', '');  // Make the cloned item visible

                // Update the cloned template with issue data for the list (using unique data-target names)
                $template.find('[data-target-list="issue-title"]').text(issue['issue-type']);
                $template.find('[data-target-list="issue-product"]').text(issue['issue-product']);
                $template.find('[data-target-list="issue-product-link"]').text(issue['issue-product']).attr('href', issue['issue-product-url']);
                $template.find('[data-target-list="issue-revenue"]').text(issue['issue-revenue']);

                // Add the issue ID as a data attribute for future use
                $template.attr('data-issue-id', issue['issueID']);

                // Update severity class for the issue in the list template
                var severityElement = $template.find('[data-target-list="issue-severity"]');
                severityElement.removeClass('error warning info').addClass(function() {
                    switch (issue['issue-severity']) {
                        case 'High': return 'error';
                        case 'Medium': return 'warning';
                        case 'Low': return 'info';
                        default: return '';
                    }
                });

                // Append the populated issue to the list
                $('#itemList').append($template);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Failed to load issues JSON data:", textStatus, errorThrown);
        }
    });

    // Load fixes JSON data
    $.ajax({
        url: 'https://alxmklv.github.io/focalws/howto.json',
        dataType: 'json',
        success: function(data) {
            fixData = data;  // Store the fixes data for later use
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Failed to load fixes JSON data:", textStatus, errorThrown);
        }
    });

    // Handle sidebar updates when an issue is clicked
    $('#itemList').on('click', '.issues_table_row', function() {
        var issueID = $(this).data('issue-id');
        var issue = issueData[issueID];  // Get issue details by ID

        if (issue) {
            // Find fix data by matching typeID from issues.json with howto.json
            var fix = fixData[issue['typeID']];

            // Log the fixes to the console to verify if they are loaded correctly
            console.log("Fixes for issue:", issue['issue-product'], fix);

            // Update the sidebar content based on the selected issue
            $('[data-target="issue-title"]').text(issue['issue-type']);
            $('[data-target="issue-product"]').text(issue['issue-product']);
            $('[data-target="issue-product-link"]').text(issue['issue-product']).attr('href', issue['issue-product-url']);
            $('[data-target="issue-revenue"]').text(issue['issue-revenue']);
            $('[data-target="issue-description"]').text(issue['issue-description']);

            // Update issue image and video
            $('[data-target="image"]').attr('src', issue['issue-image-link']);
            $('[data-target="video"]').attr('src', issue['issue-video-link']);

            // Dynamically populate the fixes in both containers using the existing HTML template
            var $firstFixContainer = $('#firstFixesContainer');
            var $secondFixContainer = $('#secondFixesContainer');

            // Clear previous fixes
            $firstFixContainer.empty();
            $secondFixContainer.empty();

            if (fix) {
                $.each(fix, function(index, fixObject) {
                    // Clone the fix template for the first container
                    var $fixTemplate1 = $('#fixTemplate').clone().removeAttr('id').css('display', 'block');
                    $fixTemplate1.find('[data-target="fix-header"]').text(fixObject.header);
                    $fixTemplate1.find('[data-target="fix-content"]').text(fixObject.content);
                    $firstFixContainer.append($fixTemplate1);

                    // Clone the fix template for the second container
                    var $fixTemplate2 = $('#fixTemplate').clone().removeAttr('id').css('display', 'block');
                    $fixTemplate2.find('[data-target="fix-header"]').text(fixObject.header);
                    $fixTemplate2.find('[data-target="fix-content"]').text(fixObject.content);
                    $secondFixContainer.append($fixTemplate2);
                });
            } else {
                $firstFixContainer.text("No fixes available");
                $secondFixContainer.text("No fixes available");
            }

            // Update issue metadata time
            $('[data-target="issue-meta-time"]').text(issue['issue-meta-time']);

            // Update severity class in the sidebar
            var severityElement = $('[data-target="issue-severity"]');
            severityElement.removeClass('error warning info').addClass(function() {
                switch (issue['issue-severity']) {
                    case 'High': return 'error';
                    case 'Medium': return 'warning';
                    case 'Low': return 'info';
                    default: return '';
                }
            });

            // Update issue inspect URL
            $('[data-target="issue-inspect"]').attr('href', issue['issue-product-url']);
        } else {
            console.error("Issue not found:", issueID);
        }
    });
});

// cloning


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


  ///Accordion


          $(document).ready(function(){
              $(".fix_accordion_header").click(function(){
                  var body = $(this).siblings(".fix_accordion_body");  // Target sibling
                  var icon = $(this).find(".icon-m");  // Target the child icon

                  body.slideToggle(300, function(){
                      if(body.is(":visible")){
                          body.css("display", "flex");  // Ensure display: flex when shown
                      }
                  });

                  icon.toggleClass("rotated");  // Toggle the rotated class for the icon
              });
          });
