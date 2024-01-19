# ransom-note

![RansomNote](https://github.com/EliaRitzmann/ransom-note/assets/69593308/a9e73129-2c2b-4e49-8765-7a15f882c859)

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

With the RansomNote object, you have the flexibility to set your own RansomNoteOptions for the entire instance. This feature allows you to define default settings once during instantiation, eliminating the need to pass them individually with every function call. If you leave it empty the default values are applied.

```javascript
const { RansomNote } = require("ransom-note");

// Set custom default values when instantiating the object
const defaultOptions = {
  seed: 12345,
  backgroundColor: "RED",
  spacing: 2,
};

const ransomNote = new RansomNote(defaultOptions);

// Now, when using instance methods, the default values will be applied
const { imageBuffer, text, options } = await ransomNote.generateImageBuffer(
  "Your text here"
);

//Overwrite one (or more) default Options
const { imageBuffer, text, options } = await ransomNote.generateImageBuffer(
  "Your text here",
  { seed: 123, backgroundColor: BACKGROUNDCOLOR.RED, spacing: 30 }
);
```

**Static Methods**

The RansomNote class provides static methods that can be used directly without creating an instance. These methods offer a convenient way to utilize the functionality without the need for instantiation.

```javascript
const { RansomNote } = require("ransom-note");

// Use static method to generate an image buffer
const { imageBuffer, text, options } = await RansomNote.generateImageBuffer(
  "Your text here"
);

// Use static method to generate and save an image
const { text, filePath, options } =
  await RansomNote.generateAndSaveRansomNoteImage(
    "Your text here",
    "/path/to/output/folder"
  );

// Use static method with one (or more) additional options
const { imageBuffer, text, options } = await RansomNote.generateImageBuffer(
  "Your text here",
  { spacing: 2 }
);
```

## Class: RansomNote

**Constructor**

```javascript
const ransomNote = new RansomNote(options);
```

-options (optional): RansomNoteOptions object with properties seed, backgroundColor, and spacing.

**Methods**

```javascript
generateImageBuffer(text, options);
```

Generate an image buffer.

-text (string): The text to be used in the ransom note.
-options (optional): RansomNoteOptions object with properties seed, backgroundColor, and spacing.
-Returns a Promise resolving to an object with properties imageBuffer, text, and options.

```javascript
generateAndSaveRansomNoteImage(text, outputFolder, options);
```

Generate and save a ransom note image.

-text (string): The text to be used in the ransom note.
-outputFolder (string): The path to the output folder where the image will be saved.
-options (optional): RansomNoteOptions object with properties seed, backgroundColor, and spacing.
Returns a Promise resolving to an object with properties text, filePath, and options.

```javascript
generateGIFBuffer(text, numberOfFrames, frameDelay, options);
```

Generate a GIF buffer.

-text (string): The text to be used in the ransom note.
-numberOfFrames (number): The number of frames in the GIF.
-frameDelay (number): The delay between frames in milliseconds.
-options (optional): RansomNoteOptions object with properties seed, backgroundColor, and spacing.
Returns a Promise resolving to an object with properties gifBuffer, text, and options.

```javascript
generateAndSaveRansomNoteGIF(
  text,
  outputFolder,
  numberOfFrames,
  frameDelay,
  options
);
```

Generate and save a ransom note GIF.

-text (string): The text to be used in the ransom note.
-outputFolder (string): The path to the output folder where the GIF will be saved.
-numberOfFrames (number): The number of frames in the GIF.
-frameDelay (number): The delay between frames in milliseconds.
-options (optional): RansomNoteOptions object with properties seed, backgroundColor, and spacing.
Returns a Promise resolving to an object with properties text, filePath, and options.

**Static Methods**
All the methods mentioned above are available as static methods for direct usage without creating an instance of RansomNote.

## Interface: RansomNoteOptions

The RansomNoteOptions interface defines the customizable properties that can be used when interacting with the RansomNote class. These properties include:

-seed (optional): A numerical seed for randomization.
-backgroundColor (optional): The background color, utilizing the BackgroundColor type.
-spacing (optional): The spacing between characters in the ransom note.

```javascript
interface RansomNoteOptions {
  seed?: number;
  backgroundColor?: BackgroundColor;
  spacing?: number;
}
```

## Type: BackgroundColor

The BackgroundColor type defines the structure of background colors used in the RansomNote class. It includes the red (r), green (g), and blue (b) components, along with an alpha value representing transparency.

```javascript
interface BackgroundColor {
  r: number;
  g: number;
  b: number;
  alpha: number;
}
```

You have the flexibility to specify your preferred background color by providing an object adhering to the BackgroundColor structure. A predefined set of colors is available in the BACKGROUND_COLOR constant, but you can also leverage external libraries like [Color](https://www.npmjs.com/package/color) for more extensive color manipulation if desired.

Example with BACKGROUND_COLORS:

```javascript
import { BACKGROUND_COLOR, RansomNote } from "ransom-note";

await RansomNote.generateGIF("Color", 123, BACKGROUND_COLOR.RED, 10, 4, 300);
```

Example with Color library:

```javascript
import Color from "colors";

const color = new Color("red");

await RansomNote.generateGIF("Color", 123, color.object(), 10, 4, 300);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Images: [OnlyGFX.com](https://www.onlygfx.com/130-newspaper-and-magazine-cutout-letters-png-transparent/)
