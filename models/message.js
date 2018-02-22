function Message(name, email, description) {
  this.name = name;
  this.email = email;
  this.description = description;  
}

Message.prototype.greet = function() {
  console.log('New message: ', this.name + ' ' + this.email + ' ' + this.description);
};

module.exports = Message;