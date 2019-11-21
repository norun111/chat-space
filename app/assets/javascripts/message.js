$(function(){
  function buildMessage(message){
    var image_if = message.image ? `<img class="lower-message__image" src="${message.image}" alt=""></img>` : ''
    
    var html = `<div class="contents_wrapper_message">
                <div class="contents_wrapper_message_nest">
                <div class="contents_wrapper_message_nest__group-name">
                  ${message.name}
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
});



