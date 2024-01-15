# ransom-note

Ransom-Note is an npm package that provides a simple and easy-to-use interface for generating ransom note-style images and GIFs. It exports a class, `RansomNote`, with various methods to generate and save images and GIFs with customizable options.

## Installation

```sh
npm install ransom-note
```

## Usage

The **RansomNote** npm package offers two ways to use it:

1. Instance Methods with Custom Default Values: Personalize your default settings during object instantiation, allowing consistent customization across multiple calls.

2. Static Methods without Instance: Access the core functionality directly without instantiation, providing a quick and straightforward approach to ransom note-style image and GIF generation. Choose the method that suits your preferences and project requirements.

**Object**

With the RansomNote object, you have the flexibility to set your own default values for the entire instance. This feature allows you to define default settings once during instantiation, eliminating the need to pass them individually with every function call.
```javascript
const { RansomNote } = require('ransom-note');

// Set custom default values when instantiating the object
const defaultOptions = {
  seed: 12345,
  backgroundColor: 'RED',
  spacing: 2,
};

const ransomNote = new RansomNote(defaultOptions);

// Now, when using instance methods, the default values will be applied
const { imageBuffer, text, options } = await ransomNote.generateImageBuffer('Your text here');
```

**Static Methods**

The RansomNote class provides static methods that can be used directly without creating an instance. These methods offer a convenient way to utilize the functionality without the need for instantiation.

```javascript
const { RansomNote } = require('ransom-note');

// Use static method to generate an image buffer
const { imageBuffer, text, options } = await RansomNote.generateImageBuffer('Your text here');

// Use static method to generate and save an image
const { text, filePath, options } = await RansomNote.generateAndSaveRansomNoteImage('Your text here', '/path/to/output/folder');
```


## Class: RansomNote

**Constructor**

```javascript
const ransomNote = new RansomNote(options);
```

options (optional): An object with the following properties:
-seed (number): Seed for randomization (default: random number).
-backgroundColor (string): Background color (default: 'TRANSPARENT').
-spacing (number): Spacing between characters (default: 0).

**Methods**

```javascript
generateImageBuffer(text, options)
```

Generate an image buffer.

-text (string): The text to be used in the ransom note.
-options (optional): Options object with properties seed, backgroundColor, and spacing.
-Returns a Promise resolving to an object with properties imageBuffer, text, and options.

```javascript
generateAndSaveRansomNoteImage(text, outputFolder, options)
```

Generate and save a ransom note image.

-text (string): The text to be used in the ransom note.
-outputFolder (string): The path to the output folder where the image will be saved.
-options (optional): Options object with properties seed, backgroundColor, and spacing.
Returns a Promise resolving to an object with properties text, filePath, and options.

```javascript
generateGIFBuffer(text, numberOfFrames, frameDelay, options)
```

Generate a GIF buffer.

-text (string): The text to be used in the ransom note.
-numberOfFrames (number): The number of frames in the GIF.
-frameDelay (number): The delay between frames in milliseconds.
-options (optional): Options object with properties seed, backgroundColor, and spacing.
Returns a Promise resolving to an object with properties gifBuffer, text, and options.

```javascript
generateAndSaveRansomNoteGif(text, outputFolder, numberOfFrames, frameDelay, options)
```
Generate and save a ransom note GIF.

-text (string): The text to be used in the ransom note.
-outputFolder (string): The path to the output folder where the GIF will be saved.
-numberOfFrames (number): The number of frames in the GIF.
-frameDelay (number): The delay between frames in milliseconds.
-options (optional): Options object with properties seed, backgroundColor, and spacing.
Returns a Promise resolving to an object with properties text, filePath, and options.

**Static Methods**
All the methods mentioned above are available as static methods for direct usage without creating an instance of RansomNote.

## License

tbd
