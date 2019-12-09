$(function(){
  var reloadMessages = function() {
    // var url = location.pathname
    group_id = $('.chat_main').data('group-id');
    if(location.pathname.match(`/\/groups\/[0-9]+\/messages/`)){
    last_message_id = $('.contents_wrapper_message:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildMessage(message);
      });
      $('.contents_wrapper').append(insertHTML);
      $('.contents_wrapper').animate({scrollTop : $('.contents_wrapper')[0].scrollHeight });
    })
    .fail(function() {
      alert('error');
    });
    }
  }
    
  function buildMessage(message){
    var image_if = message.image ? `<img class="lower-message__image" src="${message.image}" >` : ''

    var html = `<div class="contents_wrapper_message" data-message-id="${message.id}">
                <div class="contents_wrapper_message_nest">
                <div class="contents_wrapper_message_nest__group-name">
                  ${message.user_name}
                </div>
                <div class="contents_wrapper_message_nest-time">
                  ${message.created_at}
                </div>
                </div>
                <div class="contents_wrapper__message_1">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                  ${image_if}
                </div>
                </div>`
    return html;
  }
  
  $('.new_message').on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this)
    const result = $('.chat_main').data('group-id');
    
    $.ajax({
      url: `/groups/${result}/messages`,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
       $('.contents_wrapper').append(html);
       $('.contents_wrapper').animate({scrollTop : $('.contents_wrapper')[0].scrollHeight });
       $('#new_message')[0].reset(); 
       $('.submit-btn').prop('disabled', false);
       })
    .fail(function(){
        alert('メッセージの送信に失敗しました')
    })
  });
  setInterval(reloadMessages, 5000);
});