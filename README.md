# wordpress-shortcode-functions-js

Searches a string for Wordpress shortcodes and calls a mapped function with the attributes as parameters. Return values replace the shortcode in the string.

## Installation

```zsh
npm i wordpress-shortcode-functions-js
```

## API

`WPShortcodes` { Function }

### Parameters

- `string` { string }

  String which contains you wordpress shortcodes.

- `functionMap` { object }

  Here you specify shortcodes and functions that will transform them.

  Structure:

  ```js
  {
  'shortcodeNameOne': shortcodeOneTransformerFunction,
  'shortcodeNameTwo': shortcodeTwoTransformerFunction
  }
  ```

  Where `shortcodeTransformerFunction` is a callback function that gets shortcode attributes in parameters as array:

  ```js
  const shortcodeOneTransformerFunction = (attributes) => {
    attributes.forEach((attribute) => {
      console.log(attribute.name, attribute.value);
    });
  };
  ```

## Return value

Returns an object with the following structure:

```js
{
  markup: "The returned markup",
  shortcodes: [
    {
      code: "The shortcode name",
      raw: "The entire shortcode",
      attributes: [
        {
          name: "The name of the attribute.",
          value: "The value of the attribute.",
        },
      ],
    },
  ],
};
```

## Example

```js
import WPShortcodes from "wordpress-shortcode-functions-js";

const content = 'Hello world, [message_shortcode message="have a nice day!"]';

const handleMessageShortcode = (attributes) => {
  const message = attributes.find((attribute) => attribute.name === "message");
  return message;
};

WPShortcodes(content, { message_shortcode, handleMessageShortcode });

/*
output
{
  markup: 'Hello world, have',
  shortcodes: [
    {
      code: 'message_shortcode',
      raw: '[message_shortcode message="have a nice day!"]',
      attributes: [Array]
    }
  ]
}
*/
```
