
// For status change //
function statusChangeFunction(type, element) {

    swal({
        title: "Are you sure?",
        text: "But you will still be able to retrieve this data.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, status change it!",
        cancelButtonText: "No, cancel please!",

    }).then(function () {
        statusModifier(type, element);
    }, function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            swal(
                'Cancelled',
                'Your data is safe :)',
                'error'
            )
        }
    }).catch(swal.noop);
}

function statusModifier(type, element) {
    var id = $(element).attr('data-team');
    var url = apiBaseURL + "/" + type + "/status-change";
    var redirect_url = apiBaseURL + "/" + type + "/list";
    $.ajax({
        url: url,
        type: "POST",
        data: { "id": id },
        success: function (msg) {
            if (msg) {
                location.href = redirect_url;
            }
        }
    });
}
// For status change //

// For delete data //
$(document).on("click", ".delete", function (event) {
    var redirect_url = $(this).attr('href');
    event.preventDefault(); // prevent form submit
    swal({
        title: "Are you sure?",
        text: "But you will still be able to retrieve this data.",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel please!",

    }).then(function () {
        location.href = redirect_url;
    }, function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            swal(
                'Cancelled',
                'Your data is safe :)',
                'error'
            )
        }
    }).catch(swal.noop);

})
//Creator AutoComplete Search
$(document).ready(function () {
    $('#creator_select').multiselect({
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '300px',
    });
});
//End Creator AutoComplete Search




// Allow only decimal number //    
$(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
    //this.value = this.value.replace(/[^0-9\.]/g,'');
    $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

//ONLY FOR USER_PROFILE PAGE
$('.attribute').on('ifChecked ifUnchecked', function (event) {
    $('.attribute').valid();
    var getTextBoxId = "#attr_val_" + $(this).attr('data-id');
    if (event.type == 'ifChecked') {
        $(getTextBoxId).show();
    } else {
        $(getTextBoxId).parent()
            .find("em.invalid")
            .remove();
        $(getTextBoxId).val('');
        $(getTextBoxId).hide();

    }
});

/////  FOR Event Image Prevention ///////
$("#event_image_image").on("change", function (event) {
    var size = $(this).attr('data-team');
    var ext = $(this).val().split('.').pop().toLowerCase();
    if ($("#event_image_image")[0].files.length > size) {
        $(this).val('');
        $(".msg").text('Please Select Upto ' + size + ' Images');
    } else if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'x-ms-bmp']) == -1) {
        $(this).val('');
        $(".msg").text('Invalid Image Type');
    } else {
        $(".msg").text('');
    }
});
//for prventing first character to be space 
$("input").on("keypress", function (e) {
    var startPos = e.currentTarget.selectionStart;
    if (e.which === 32 && startPos == 0)
        e.preventDefault();
});
$("textarea").on("keypress", function (e) {
    var startPos = e.currentTarget.selectionStart;
    if (e.which === 32 && startPos == 0)
        e.preventDefault();
});
/* For google addrees place */
var autocomplete = new google.maps.places.Autocomplete($("#address")[0], {});
google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
});
//Delete Image
$(document).on("click", ".img_delete", function (event) {
    event.preventDefault();
    var url = $(this).attr('href');
    var redirect_url = window.location.href;
    var id = redirect_url.substring(redirect_url.lastIndexOf('/') + 1);
    var img = $(this).attr('data-team');
    swal({
        title: "Are you sure?",
        text: "But you will still be able to retrieve this data.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel please!",

    }).then(function () {
        $.ajax({
            url: url,
            type: "POST",
            data: { "id": id, img_name: img },
            success: function (msg) {
                if (msg) {
                    location.href = redirect_url;
                }
            }
        });

    }, function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            swal(
                'Cancelled',
                'Your data is safe :)',
                'error'
            )
        }
    }).catch(swal.noop);

});
//for banner Image Selection
$('input[name="banner_image"]').on('click', function (event) {
    if ($(this).attr('id') == 'existing_image') {

        $(".ex_img_0").prop("checked", true);
        $("#existing_banner_img").show();
        $('#event_img').hide();
        $('#event_video').hide();
        $('#type').val('exist_image');
    }
    else if ($(this).attr('id') == 'banner_image') {
        $(".ex_img_0").prop("checked", false);
        $('#existing_banner_img').hide();
        $('#event_img').show();
        $('#event_video').hide();
        $('#type').val('image');

    } else if ($(this).attr('id') == 'banner_video') {
        $(".ex_img_0").prop("checked", false);
        $('#existing_banner_img').hide();
        $('#event_img').hide();
        $('#event_video').show();
        $('#type').val('video');
    } else {
        $(".ex_img_0").prop("checked", false);
        $('#existing_banner_img').hide();
        $('#event_img').hide();
        $('#event_video').hide();
    }
});

$(document).on("change", "#event_image_image", function (event) {
    var ext = $(this).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'x-ms-bmp']) == -1) {
        $(this).val('');
        $(".img_msg").text('Invalid Image Type');

    } else {
        $(".img_msg").text('');

    }
});
$(document).on("change", "#event_image_video", function (event) {
    var ext = $(this).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['x-flv', 'mp4', 'x-mpegURL', 'MP2T', '3gpp', 'quicktime', 'x-msvideo', 'x-ms-wmv']) == -1) {
        $(this).val('');
        $(".video_msg").text('Invalid Video Type.');

    } else {
        $(".video_msg").text('');

    }
});
//Date picker
$('#start_date').pickadate({
    today: '',
    format: 'yyyy/mm/dd',
    close: 'Close Picker',
    clear: ''
});
$('#end_date').pickadate({
    today: '',
    format: 'yyyy/mm/dd',
    close: 'Close Picker',
    clear: ''
});
// Basic time
$('#start_time').pickatime();
$('#end_time').pickatime();

$(document).ready(function () {

    $("#userCreateFrm").validate({
        rules: {
            first_name: {
                noNumberAllowed: true
            },
            last_name: {
                noSpaceOrNumberAllowed: true
            },
            contact_no: {
                numbersOnly: true
            }
        }
    });

    $("#friendCreateFrm").validate({
        rules: {
            name: {
                noNumberAllowed: true
            }
        }

    });

    $("#countryCreateFrm").validate({
        rules: {
            country_name: {
                noNumberAllowed: true
            }
        }
    });

    $("#cityCreateFrm").validate({
        rules: {
            city_name: {
                noNumberAllowed: true
            }
        }
    });


    jQuery.validator.addMethod("noNumberAllowed", function (value, element) {
        return /^[a-zA-Z ]*$/.test(value);
    }, "Numbers are not allowed");

    jQuery.validator.addMethod("numbersOnly", function (value, element) {
        return /^(0|[1-9][0-9]*)$/.test(value);
    }, "Non numeric data are not allowed");

});

