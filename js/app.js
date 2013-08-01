/* global sharing */

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

function getContext(source) {
  console.log('hi');
  var word = $('#word').val();
  if (source) {
    word = source.innerText;
  }
  $.when(
    $.ajax({
      url: 'http://api.wordnik.com/v4/word.json/' + word + '/relatedWords?useCanonical=false&relationshipTypes=same-context&limitPerRelationshipType=100&api_key='+key.API_KEY,
      async: false,
      dataType:'json'
    })).done(function(result) {
      if (!result[0]) {
        $('#red').fadeIn('fast', function() {
           $(this).fadeOut('fast');
        });
        return;
      }
      var contexts = result[0].words;
      var $ul = $('<ul class="col"></ul>');
      $('#content').append($ul);
      for (var i=0;i<contexts.length;i++) {
        $ul.append('<li class="context">'+contexts[i]+'</li>');
      }
      var $last = $('#content').children().last();
      if ($last.width()*2 + $last.position().left + 200 > $('body').width()) {
        $('#content').children().first().fadeOut('fast', function() {
          this.remove();
        });
      }
      $ul.children().one('click', function() {
        getContext(this);
      });
  });
}

$('#getContext').one('click',function() { getContext(); });
if (sharing.gup('word') === '') {
//  getWords();
}
else {
//  var verb = sharing.decodeStr(unescape(sharing.gup('word')).split('$')[0]);
//  var nounPlural = sharing.decodeStr(unescape(sharing.gup('word')).split('$')[1]);
//  getWords(true);
//  generate(nounPlural, verb);
}
