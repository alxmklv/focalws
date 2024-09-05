
//Script for website selctor

        $(document).ready(function(){
            // Show the autocomplete list when the input field is focused
            $('.site_input_field').focus(function() {
                $('.autocomplite_list').show();
            });

            // Hide the autocomplete list when clicking outside
            $(document).click(function(event) {
                if (!$(event.target).closest('.site_input_field, .autocomplite_list').length) {
                    $('.autocomplite_list').hide();
                }
            });

            // Set the input field value and hide the list when an item is clicked
            $('.autocomplite_item').click(function() {
                $('.site_input_field').val($(this).text());
                $('.autocomplite_list').hide();
                checkInput();
            });

            // Check input field content on keyup (input event)
            $('.site_input_field').on('input', function() {
                checkInput();
            });

            // Function to toggle the .active class based on input field content
            function checkInput() {
                if ($('.site_input_field').val().trim() !== '') {
                    $('.landing-enter-button').addClass('active');
                } else {
                    $('.landing-enter-button').removeClass('active');
                }
            }
        });
