function geo_decode(anchor) {
    var href = $(anchor).attr('href');
    var address = href.replace(/.*contact\/([a-z0-9._%-]+)\+([a-z0-9._%-]+)\+([a-z.]+)/i, '$1' + '@' + '$2' + '.' + '$3');
    var subject = '';

    if ($(anchor).hasClass('f')) {
        subject = 'Feedback for Smart Patients';
    }

    if (href != address) {
        $(anchor).prop('href', 'mailto:' + address + '?subject=' + subject);
    }
}
function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}
function calcHeight(ele, subtractedHeight) {
    return $(ele).outerHeight() - subtractedHeight;
}
$(document).ready(function() {
    $('a.o').each(function() {
        geo_decode($(this));
    });
    $('.panel')
        .on('keyup.autocomplete', '#query', function() {
            $(this).autocomplete({
                source: '/AutoSuggest',
                minLength: 2,
                select: function(event, ui) {
                    $('#query').val(ui.item.value);
                    $('#miniSearchForm').submit();
                }
            })
        });
    Handlebars.registerHelper('trimString', function(passedString, length) {
        if (passedString.length <= length) {
            return new Handlebars.SafeString(passedString);
        }
        else {
            return new Handlebars.SafeString(passedString.substring(0,length)+'...');
        }
    });
    $('a.toggle').on('click', function() {
        $('#'+$(this).data('element')).slideToggle();
    });
});
jQuery.disableButton = function(button) {
    $(button).attr('disabled', 'disabled').addClass('disabled');
};
jQuery.enableButton = function(button) {
    $(button).removeAttr('disabled').removeClass('disabled');
};