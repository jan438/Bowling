var prefix = Deck.prefix;
var transform = prefix('transform');
var translate = Deck.translate;
var $container = document.getElementById('container');
var $topbar = document.getElementById('topbar');
var $Bowling = document.createElement('button');
$Bowling.setAttribute("style", "background-color:Chartreuse; font-size:2em;");
$Bowling.setAttribute("id", "solitaire");
$Bowling.textContent = 'Bowling';
$topbar.appendChild($Bowling);
var deck = Deck();
$Bowling.addEventListener('click', function () {
  deck.queue(function (next) {
    deck.cards.forEach(function (card, i) {
      setTimeout(function () {
        card.setSide('back')
      }, i * 7.5)
    })
    next()
  })
  deck.shuffle()
  deck.shuffle()
  deck.Bowling()
});
deck.mount($container);
deck.intro();
deck.sort();
