const Sentencer = require('sentencer')
const randy = require('randy')
const Readable = require('stream').Readable
const stemplates = require('../resources/stemplates.json');
const phrases = require('../resources/phrases.json');

module.exports = function(app) {

  app.get('/text/', function (req, res) {
    const numberOfSentences = req.body.size || randy.randInt(5,10)
    const datastream = new Readable
    let count = 0
    datastream.push('{"text":"')
    datastream._read = function() {
      count += 1
      let isLast = count == numberOfSentences
      datastream.push( generateSentenceForStream(isLast) )
      if(isLast) {
        datastream.push('"}')
        return datastream.push(null)
      }
    }

    res.setHeader("Content-Type", "application/json")
    datastream.pipe(res)
  })
}

function generateSentenceForStream(isLastSentence) {
  var phrase = Math.random() < 0.25 ? `${randy.choice(phrases)} ` : ""
  const generated = Sentencer.make(randy.choice(stemplates))
  var sentence = capitalize(phrase + generated) + "."
  sentence += isLastSentence ? "" : " "
  return sentence
}

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)
