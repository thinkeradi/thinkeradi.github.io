$(document).ready(function() {
    $('#contact-form').submit(function() {

        var buttonCopy = $('#contact-form button').html(),
            errorMessage = $('#contact-form button').data('error-message'),
            sendingMessage = $('#contact-form button').data('sending-message'),
            okMessage = $('#contact-form button').data('ok-message'),
            hasError = false;

        $('#contact-form .error-message').remove();

        $('.requiredField').each(function() {
            if ($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).parent().append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).is("input[type='email']") || $(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).parent().append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#contact-form button').html('<i class="fa fa-times"></i>' + errorMessage);
            setTimeout(function() {
                $('#contact-form button').html(buttonCopy);
            }, 2000);
        } else {
            $('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>' + sendingMessage);
            var form_id = "contact-form";
            var contactName = $("#" + form_id + " [name='contactName']").val();
            var email = $("#" + form_id + " [name='email']").val();
            var message = $("#" + form_id + " [name='comments']").val();


            var data = {
                "access_token": "ksmqclzha7a7w40amgz343fr"
            };
            data['subject'] = "Your are contacted by - " + contactName + " and email - " + email;
            data['text'] = message;

            $.post('https://postmail.invotes.com/send',
                data,
                onSuccess
            ).fail(onError);
            function onSuccess() {
                $('#contact-form button').html('<i class="fa fa-check"></i>' + okMessage);

                setTimeout(function() {
                    $('#contact-form')[0].reset();
                    $('#contact-form button').html(buttonCopy);
                }, 2000);
            }

            function onError(error) {
                $('#contact-form button').html('<i class="fa fa-times"></i>' + errorMessage);
                setTimeout(function() {
                    $('#contact-form button').html(buttonCopy);
                }, 2000);
            }
        }

        return false;
    });
});