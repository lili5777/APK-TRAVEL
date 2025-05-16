import varint from 'varint';

export default class DecodeLSB {
  constructor(action) {
    this.pixelIndex = 0;

    if (action !== undefined) {
      this.action = action;
    } else {
      this.action = () => {
        return;
      };
    }
  }

  decode(imageData, startDecodingAt = 0) {
    this.pixelIndex = startDecodingAt;
    const messageLength = this.getMessageLength(imageData);
    const binaryMessage = [];

    for (let i = 0; i < messageLength; i += 1) {
      const byte = this.decodeNextByte(imageData);
      binaryMessage.push(byte);
    }
    return binaryMessage;
  }

  decodeVarint(imageData) {
    let completed = false;
    const messageVarint = [];

    while (!completed) {
      const byte = this.decodeNextByte(imageData);
      const num = parseInt(byte, 2);

      messageVarint.push(num);
      if (messageVarint.slice(-1)[0] < 128) {
        completed = true;
      }
    }
    return messageVarint;
  }

  decodeNextByte(imageData) {
    let byte = '';

    for (let j = 0; j < 8; j += 1) {
      const currentPixel = imageData[this.pixelIndex];
      let lsb = '0';
      if (currentPixel % 2 === 1) {
        lsb = '1';
      }

      byte += lsb;
      this.pixelIndex += 1;
      this.action();
    }
    return byte;
  }

  getCurrentIndex() {
    return this.pixelIndex;
  }

  getMessageLength(imageData) {
    const messageVarint = this.decodeVarint(imageData);
    const messageLength = varint.decode(messageVarint);
    return messageLength;
  }
}
