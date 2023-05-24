const events = require('events');
const { EventEmitter } = require('stream');
const util = require('util');
// const eventEmitter = new events.EventEmitter();

// eventEmitter.on('trigger',() => console.log('trigger event is emitted'));

// eventEmitter.emit('trigger');

var Person = function(name){
    this.name = name;
}
util.inherits(Person, events.EventEmitter)

var Sangam = new Person('Sangam Bgk')

Sangam.on( 'called', (name ) => console.log('Event is called :',name));

Sangam.emit('called', ' Hello what are you doing !');