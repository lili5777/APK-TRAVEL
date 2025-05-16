export default class EncodeLSB {
  constructor(action) {
    if (action !== undefined) {
      this.action = action;
    } else {
      this.action = () => {
        return;
      };
    }
  }

  encode(imageData, binaryMessage, startEncodingAt = 0) {
    const newPixelData = imageData;

    let pixelIndex = startEncodingAt;
    for (const bit of binaryMessage) {
      const pixelValue = imageData[pixelIndex];
      const newPixelValue = this.getNewPixelValue(pixelValue, bit);

      newPixelData[pixelIndex] = newPixelValue;
      pixelIndex += 1;
      this.action();
    }
    return newPixelData;
  }

  getNewPixelValue(pixelValue, bit) {
    let newPixelValue = pixelValue;

    if (bit === '0' && pixelValue % 2 === 1) {
      newPixelValue -= 1;
      if (newPixelValue === -1) {
        newPixelValue = 1;
      }
    } else if (bit === '1' && pixelValue % 2 === 0) {
      newPixelValue += 1;
    }
    return newPixelValue;
  }
}
