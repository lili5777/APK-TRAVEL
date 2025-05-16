import {NativeModules} from 'react-native';
import {stringToArray} from 'utf8-to-bytes';
import varint from 'varint';
import LZUTF8 from 'lzutf8';

import {ImageNotEncodedError, MessageTooLongError} from './exceptions';
import {DecodeLSB, EncodeLSB} from './LSB';

export default class Steganography {
  numToAlgorithmTypes = {
    0: 'LSBv1',
  };

  constructor(imageURI) {
    this.imageURI = imageURI;
    this.progress = {
      increment: 0,
      value: 0,
    };
  }

  async encode(message, algorithm = 'LSBv1', metadata) {
    try {
      var output = LZUTF8.compress(message);
      const binaryMessage = this.convertMessageToBits(output);
      const imageData = await this.getImageData(
        this.imageURI,
        binaryMessage.length + 8,
      );
      const newImageData = this.encodeData(
        imageData,
        binaryMessage,
        algorithm,
        metadata,
      );
      const url = await this.getEncodedImageURI(newImageData);
      return url;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new MessageTooLongError('Message too long to encode', message);
      } else {
        throw new Error(error);
      }
    }
  }

  async decode() {
    try {
      const imageData = await this.getImageData(this.imageURI, 200);
      const decodedDecimalData = this.decodeData(imageData);
      const message = LZUTF8.decompress(decodedDecimalData);
      return message;
    } catch (error) {
      if (error instanceof RangeError) {
        throw new ImageNotEncodedError(
          'Image is not encoded with any data',
          this.imageURI,
        );
      } else {
        throw new Error(error);
      }
    }
  }

  updateProgress() {
    this.progress.value += this.progress.increment;
  }

  getProgress() {
    return this.progress.value;
  }

  convertMessageToBits(message) {
    const messageLength = varint.encode(message.length);
    const arrayToEncode = [...messageLength, ...message];

    let bitsToEncode = '';
    for (const element of arrayToEncode) {
      bitsToEncode += this.convertDecimalToBytes(element);
    }

    return bitsToEncode;
  }

  async getImageData(imageURI, length) {
    const pixels = await NativeModules.Bitmap.getPixels(imageURI, length);
    return pixels;
  }

  encodeData(imageData, data, algorithm, metadata) {
    this.progress.increment = 100 / data.length;
    metadata = this.setDefaultMetaData(
      metadata && algorithm !== 'LSBv1' ? metadata : {},
      algorithm,
    );
    const {newImageData, startEncodingAt} = this.encodeMetadata(
      imageData,
      metadata,
    );

    let encodedData;
    switch (algorithm) {
      default: {
        encodedData = new EncodeLSB(this.updateProgress.bind(this)).encode(
          newImageData,
          data,
          startEncodingAt,
        );
      }
    }

    return encodedData;
  }

  setDefaultMetaData(metadata, algorithm) {
    const algorithmNum = this.algorithmsTypesToNum(algorithm);
    metadata.algorithm = algorithmNum;

    return metadata;
  }

  algorithmsTypesToNum(algorithm = 'LSBv1') {
    const values = Object.values(this.numToAlgorithmTypes);
    return values.indexOf(algorithm);
  }

  encodeMetadata(imageData, metadata) {
    const metadataToEncode = [];
    const dataToEncode = ['algorithm'];

    for (const data of dataToEncode) {
      const tempData = metadata[data];
      if (!tempData && tempData !== 0) {
        continue;
      }

      let decimalDataToEncode;
      if (typeof tempData === 'string') {
        decimalDataToEncode = stringToArray(tempData);
      } else {
        decimalDataToEncode = varint.encode(tempData);
      }
      metadataToEncode.push(...decimalDataToEncode);
    }

    let binaryMetadata = '';
    for (const data of metadataToEncode) {
      binaryMetadata += this.convertDecimalToBytes(data);
    }
    const imageDataWithMetadata = new EncodeLSB().encode(
      imageData,
      binaryMetadata,
    );

    return {
      newImageData: imageDataWithMetadata,
      startEncodingAt: binaryMetadata.length,
    };
  }

  async getEncodedImageURI(data) {
    const uri = await NativeModules.Bitmap.setPixels(this.imageURI, data);
    return uri;
  }

  decodeData(imageData) {
    const {algorithm, startDecodingAt} = this.decodeMetadata(imageData);
    let decodedMessage;

    switch (algorithm) {
      default: {
        decodedMessage = new DecodeLSB(this.updateProgress.bind(this)).decode(
          imageData,
          startDecodingAt,
        );
      }
    }

    const decodedDecimal = [];
    for (const byte of decodedMessage) {
      const decimal = this.convertBytesToDecimal(byte);
      decodedDecimal.push(decimal);
    }

    return new Uint8Array(decodedDecimal);
  }

  decodeMetadata(imageData) {
    const decodeLSB = new DecodeLSB();
    const algorithmTypeBinary = decodeLSB.decodeNextByte(imageData);
    const algorithmNum = this.convertBytesToDecimal(algorithmTypeBinary);
    const algorithm = this.numToAlgorithmTypes[algorithmNum] || 'LSBv1';
    const metadata = {};

    const startDecodingAt = decodeLSB.getCurrentIndex();
    return {
      algorithm,
      metadata,
      startDecodingAt,
    };
  }

  convertDecimalToBytes(data) {
    const binaryString = data.toString(2);
    const nearestByte = Math.ceil(binaryString.length / 8) * 8;
    const byte = binaryString.padStart(nearestByte, '0');
    return byte;
  }

  convertBytesToDecimal(bytes) {
    const decimal = parseInt(bytes, 2);
    return decimal;
  }
}
