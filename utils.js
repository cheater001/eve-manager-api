module.exports = {
  Payload
};

function Payload(data, error) {
  this.apiVersion = '0.0.1';
  this.data = data instanceof Buffer ? JSON.parse(data.toString()) : data;

  if (error) {
    this.error = error;
  }
}