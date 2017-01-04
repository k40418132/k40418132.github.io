init();
function init(){
  if (getQueryString('id')==null) {
    avatar_init();
    bg_init();
    edit_input();
    angular.module("app", ["modA", "modB"]);
  }else {
    index_input();
  }
}

function avatar_init() {
    angular.module('modA', ['ngImgCrop'])
        .controller('CtrlA', function($scope) {
            $scope.myImage = '';
            $scope.myCroppedImage = '';

            var handleFileSelect = function(evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#avatar_input')).on('change', handleFileSelect);
        });
}

function bg_init() {
    angular.module('modB', ['ngImgCrop'])
        .controller('CtrlB', function($scope) {
            $scope.myBG = '';
            $scope.myCroppedBG = '';

            var handleFileSelect = function(evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.myBG = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#BG_input')).on('change', handleFileSelect);
        });
}

function slide(id) {
    var ul = document.getElementById('article_ul');
    ul.style.transform = 'translateX(-' + ul.clientWidth / 2 * id + 'px)';
}


function edit_slide(id) {
    var ul = document.getElementById('edit_ul');
    ul.style.transform = 'translateX(-' + ul.clientWidth / 6 * id + 'px)';
}

















function save_acc(){
  var content = document.getElementById('name').value;
  var pw = document.getElementById('pass').value;
  var id = window.localStorage['id'];
  if (pw!='') {
    var pw2 = document.getElementById('pass2').value;
    var flag= document.getElementById('acc_flag');
    if (pw!=pw2) {
      flag.style.visibility='visible';
      return;
    }else {
      flag.style='';
      window.localStorage['pass']=pw;
      var fx = function(ret){
        console.log(ret);
      };
      ajax("save_pass","id="+id+"&pass="+pw,fx);
    }
  }

  var fx = function(ret) {
      console.log(ret);
  };
  ajax("save_name", "id=" + id + "&content=" + content, fx);

}

function save_welcome() {
    var content = document.getElementById('welcome').value;
    var id = window.localStorage['id'];
    var fx = function(ret) {
        console.log(ret)
    };
    ajax("save_welcome", "id=" + id + "&content=" + content, fx);
}

function save_intro() {
    var content = document.getElementById('intro').value;
    content = encodeURIComponent(content);
    var id = window.localStorage['id'];
    var fx = function(ret) {
        console.log(ret);
    };
    ajax("save_intro", "id=" + id + "&content=" + content, fx);
}


function index_input() {
  var id = getQueryString('id');
  var fx = function(ret) {
      var tmp = ret.split("|");
      document.getElementById('pro_name').innerHTML = tmp[0];
      document.getElementById('pro_id').innerHTML = tmp[1];
      document.getElementById('introduce').innerHTML = tmp[2];
      document.getElementById('welcome').innerHTML = tmp[3];
  };
  ajax("get_all", "id=" + id, fx);
}

function edit_input() {
    var id = window.localStorage['id'];
    var fx = function(ret) {
        var tmp = ret.split("|");
        document.getElementById('pro_name').innerHTML = tmp[0];
        document.getElementById('name').value= tmp[0];
        document.getElementById('pro_id').innerHTML = tmp[1];
        document.getElementById('intro').value = tmp[2];
    };
    ajax("get_all", "id=" + id, fx);
}










function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function add_info(){
  var left = document.getElementById('info_leftbox');
  var right = document.getElementById('info_rightbox');
  left.appendChild(document.createElement('input'));
  right.appendChild(document.createElement('input'));
}







function ajax(mode, send, fx) {
    if (window.XMLHttpRequest) {
        var xmlhttp = new XMLHttpRequest();
    } else {
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var ret = xmlhttp.responseText;
            fx(ret);
        }
    }
    xmlhttp.open("POST", "../../plutoindex/assist/js/client.asp", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("passw=9456XN&mode=" + mode + "&" + send);
}
