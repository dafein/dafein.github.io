var guide = {
    layers: 8,
    overlayId: 'overlay',
    usedIds: [],
    activateHideBtns: function() {
        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                guide.hideGuide();
                guide.deactivateHideBtns();
            }
        });
        $('<img />', {
            id: 'closeGuideBtn',
            src: "/img/red-delete.png"
        }).appendTo('#'+guide.overlayId);
        $('#closeGuideBtn').on('click', function() {
            guide.hideGuide();
        });
    },
    circleGuide: function() {
        var guide = $('#guide');
        var offset = $(guide).offset();
        var html = $('<div/>', {'id':'guide_div', 'text': 'Show this guide.'});
        $(guide).after(html);

        $('#guide_div').offset({
            top: offset.top - 15,
            left: offset.left - 15
        }).css({'zIndex': 999}).hide().fadeIn('slow');
    },
    cookieIsNull: function(page) {
        return ($.cookie(page) === null);
    },
    deactivateHideBtns: function() {
        $(document).unbind("keyup", guide.hideGuide());
        $('#closeGuideBtn').remove();
    },
    init: function() {
        $('#guide').on('click', function() {
            guide.showGuide();
        });
    },
    hasGuideElements: function() {
        return !!$('.info-guide').length;
    },
    hideGuide: function() {
        guide.hideOverlay();
        guide.hideMessages();
        guide.resetUsedIds();
        guide.removeCircleGuide();
    },
    hideMessages: function() {
        $('.info-guide-div').fadeOut(function() {
            $(this).remove();
        });
    },
    hideOverlay: function() {
        $('#'+guide.overlayId+'').fadeOut(function() {
            $(this).remove();
        });
    },
    launchInfoGuide: function(page) {
//        if (guide.cookieIsNull(page)) {
//            guide.showGuide();
//            $.cookie(page, true);
//        }
    },
    removeCircleGuide: function() {
        $('#guide_div').fadeOut(function() {
            $(this).remove();
        });
    },
    resetUsedIds: function() {
        guide.usedIds = [];
    },
    showGuide: function() {
        guide.showMessages();
        guide.showOverlay();
        guide.circleGuide();
        guide.activateHideBtns();
    },
    showMessages: function() {
        $('.info-guide').each(function() {
            var guideName = $(this).data('info_guide');

            if ($.inArray(guideName, guide.usedIds) === -1) {
                var offset = $(this).offset();
                var template = Handlebars.compile($("#info_guide_template").html());
                var context = {
                    message: $(this).data('message'),
                    'id': guideName+'_tpl'
                }
                var html = template(context);
                //$(this).parent().css('position', 'relative');
                $(this).after(html);

                $('#'+guideName+'_tpl').offset({
                    top: offset.top,
                    left: offset.left + $(this).outerWidth() + 10
                }).css({'zIndex': guide.layers}).hide().fadeIn('slow');
                guide.layers++;
                guide.usedIds.push(guideName);
            }
        });
    },
    showOverlay: function() {
        $('<div />', {
            id: guide.overlayId
        }).prependTo('body').fadeTo("slow", 0.7).on('click', function() {
            guide.hideGuide()
        });
    }
}

$(document).ready(function() {
    guide.init();
});
