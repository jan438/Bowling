var prefix = Deck.prefix
var transform = prefix('transform')
var translate = Deck.translate
var $container = document.getElementById('container')
var $topbar = document.getElementById('topbar')
var $sort = document.createElement('button')
var $shuffle = document.createElement('button')
var $bysuit = document.createElement('button')
var $Bowling = document.createElement('button')
var $flip = document.createElement('button')
$shuffle.textContent = 'Shuffle'
$sort.textContent = 'Sort'
$bysuit.textContent = 'By suit'
$Bowling.textContent = 'Bowling'
$flip.textContent = 'Flip'
$topbar.appendChild($flip)
$topbar.appendChild($shuffle)
$topbar.appendChild($bysuit)
$topbar.appendChild($Bowling)
$topbar.appendChild($sort)
var deck = Deck()
$shuffle.addEventListener('click', function () {
  deck.shuffle()
  deck.shuffle()
})
$sort.addEventListener('click', function () {
  deck.sort()
})
$bysuit.addEventListener('click', function () {
  deck.sort(true)
  deck.bysuit()
})
$flip.addEventListener('click', function () {
  deck.flip()
})
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
})
deck.mount($container)
deck.intro()
deck.sort()

