$(function () {
    $('#message-form').submit(function (event) {
        event.preventDefault();
        let $messageBody = $(this).find("textarea[name='message[body]']")
        Remote.messaging.sendMessage($messageBody.val());
        $messageBody.val(null);
    });

    var hint = $('#hint');

    $('.emoji').on('click', function (event) {
        // Remote.messaging.sendMessage(event.target.innerText)
        var currentEmojis = hint.val() + event.target.innerText;
        hint.val(currentEmojis);
        console.log(currentEmojis)
        Remote.messaging.sendHint(currentEmojis)
    });

    // $('#hint').on('change', function (event) {
    //     alert("asd")
    // });


//     var elem = $('#hint');
//     function f(){
//         alert('qqq')
//     }
//
// //elem.onchange = f;
//     elem.onkeyup = f;
//     elem.onkeydown = f;


    $(Remote.messaging).on('received', function (event, data) {

        let {body: body, created_at: createdAt} = data.message;
        let {uid} = data.user;
        let hint = data.hint;
        if (!hint) {
            let html = `<li class='messages-list-item'>
                  <div class='messages-list-item-name'>
                    ${ uid }
                  </div>
                  <div class='messages-list-item-body'>
                    ${ body }
                    <span class='messages-list-item-timestamp'>
                      ${ createdAt }
                    </span>
                  </div>
                </li>`;

            $('#messages-list').append($(html));
        } else {
            hint.val(body)
        }
    });
});
