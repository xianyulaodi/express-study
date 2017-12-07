$(function() {
  create();
});


var create = (function(win,$) {

  function drawUploadPic() {
    var $ipt=document.getElementById('content');
    $ipt.ondragover=function (e){
     e.preventDefault();
    }
    $ipt.ondrop=function (e){
     e.preventDefault();
     var file = e.dataTransfer.files[0];//获取到第一个上传的文件对象
     uploadPic(file);
    }
  }

  function uploadPic(file) {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      url: "/posts/upload",
      contentType: false,
      processData: false,
      data: formData,
      type: 'post',
      success: function(res) {
        if(res.status == 200) {
          var val = $('#content').val();
          val += '![]('+ res.picUrl +')';
          $('#content').val(val);
          $('#articleContent').html(marked(val));
        }
      },
      error: function(err) {
        console.log('error');
      }
    })
  }

  function initToggle() {
    var val = $('#content').val();
    $('#articleContent').html(marked(val));
  }

  function bindEvent() {

    $('#typeList').on('click','li',function() {
      $(this).addClass('active').siblings('li').removeClass('active');
      $('#type').val($(this).html());
    });

    $('#content').keyup(function() {
      var val = $('#content').val();
      $('#articleContent').html(marked(val));
    });
  }

  function init() {
    bindEvent();
    drawUploadPic();
    initToggle();
  }

  return init;

})(window,jQuery)

