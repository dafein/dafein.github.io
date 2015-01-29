$(document).keypress(function(event) {
    if ($('#q').length) {
        var keyCaptured = String.fromCharCode(event.keyCode || event.charCode);
        if ( !$('#q').is(":focus") && /[A-Za-z0-9 ]/.test(keyCaptured) ) {
            event.preventDefault();
            $("#q").focus().val($("#q").val() + keyCaptured);
        }
    }
});

$(document).ready(function() {
    $("#q")
        .autocomplete({
            source: '/AutoSuggest',
            minLength: 2,
            select: function(event, ui) {
                $('#q').val(ui.item.value);
                $("#UserTrialIndexForm").submit();
            }
        })
        .focus();
    $("body").on('submit', '#UserTrialIndexForm', function() {
        if (!$("#q").val()) {
            $("#submit-status").hide().addClass('status-error').text("Did you forget to enter a search term?").fadeIn();
            $("#q").focus();
            return false;
        }
        return true;
    });

    var userLoginForm = new FormManager('UserLoginForm');
    userLoginForm.init();

    var userInviteForm = new FormManager('UserInviteForm');
    userInviteForm.init();
});

function FormManager(formId) {
    this.form = $('#'+formId);
    this.inputs = $('#'+formId+' input[type="text"], #'+formId+' input[type="password"]');
    this.btn = $('#'+formId+' .btn');
}
FormManager.prototype = {
    bindEvents: function() {
        var self = this;
        $(this.inputs).on('keyup change', function() {
            if ($(this.form).valid()) {
                $.enableButton(self.btn);
            } else {

                $.disableButton(self.btn);
            }
        });
    },
    init: function() {
        this.validate();
        this.bindEvents();
        //this.setCheck();
    },
    setCheck: function() {
        var self = this;
        setInterval(function() {
            $(self.inputs).each(function() {
                if (!$.trim($(this).val()).length) {
                    $.disableButton(self.btn);
                }
            });
        }, 300);
    },
    validate: function() {
        $(this.form).validate({errorPlacement: function(error, element) {
            return true;
        }});
    }
}