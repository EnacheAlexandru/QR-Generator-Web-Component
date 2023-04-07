# QR Generator Web Component

![example.png](https://i.ibb.co/sPFyR3L/example.png)

`<qr-generator>` is a web component that lets users generate a QR code based on a provided text or link. The generated QR code can also be customized and tweaked with the help of various pre-defined parameters using the provided inputs. 

Due to its nature, the web component can easily interoperate with any library or framework designed to work with DOM, including big frameworks like React, Angular or Vue and libraries like jQuery or others. The developers can quickly integrate the web component into their application if they want to allow their users to generate QR codes.

The web component is written in **TypeScript** and has been developed with the help of **Lit**, which is a simple library specialized in the creation of fast and lightweight web components.

## Description

The web component does not have its own QR code generation algorithm. Instead, it uses an API that returns a QR code image by sending a GET request with different parameters to a QR code generation server.

The chosen server can be found on [goqr.me](https://goqr.me) and is made by [Andreas Haerter](https://andreashaerter.com) and [Andreas Wolf](https://a-w.io). They have explicitly stated that any QR codes created by their generation algorithm on their server are completely free of charge (including personal and commercial).

Essentially, this web component is an attempt to simplify the use of the API by providing a friendly interface for the user and also simplify its integration in various applications. 

Alternatively, if the developer does not want to let the user control the parameters and only want to generate the QR code to be displayed on their page, the developer can use the `hide` attribute:

    <qr-generator hide="true"></qr-generator>

The developer can also set other HTML attributes directly. The attributes that can be used will be presented in the [QR Parameters](#qr-parameters) section below.

## Instalation

### Prerequisites
You should have **Node.js** and **npm** installed on your computer. These two can be downloaded together from their official website: [nodejs.org](https://nodejs.org).

> The *QR Generator Web Component* was developed using **Node.js v18.15** and **npm v9.5**.

---
To run and modify the web component, follow the steps below:
- in **root** folder: only the *first time* in order to install the dependencies required, run in a terminal:

		npm i

- in **root** folder: to build the web component locally, run in a terminal (keep it open):

		npm run build:watch

- in **root** folder: to run the web component locally, run in another terminal (also keep it open):

		npm run serve

- In a web browser, access the link provided by the terminal in which `npm run serve` was run. By default, it is set to `http://localhost:8000`. The port may be different if it is already being used by another process.

> The files used in the development of the web component are as following:
> - in **dev** folder: index.html 
> - in **src** folder: qr-generator.ts
> - in **src** folder: styles.ts

## Usage

Due to the fact that the web component uses an API, it tries to provide an interface for the GET parameters. 

The API that the web component currently uses is:

    https://api.qrserver.com/v1/create-qr-code/

Of course, to the API can be added the GET parameters. 

    ?data=Hello&size=128x128

The web component tries to respect the constraints established by the server. If an input happens to be incorrect and the user tries to export the QR code, the generate buttons will have a shaking animation that will inform the user that he should change the input according to the suggested boundaries.

## QR Parameters

### Data

- The actual text that will be stored inside the QR code
- Must have between 1 and 800 characters
- `<qr-generator text="World"></qr-generator>`
- By default, it is set to "Hello"

![data.png](https://i.ibb.co/h25VFGx/data.png)

### QR code size

- The QR code will always be square and the size is represented in pixels
- Must be between 100 and 1000 pixels
- `<qr-generator size="128"></qr-generator>`
- By default, it is set at 256 pixels

![size.png](https://i.ibb.co/zZJCSsK/size.png)

### Pattern color

- Represented in HEX, RGB or HSL color values
- The HEX value must be between #000000 and #FFFFFF
- The 3 RGB values must be between 0 and 255
- HSL
	- The hue (H) must be between 0 and 359 
	- The saturation (S) and lightness (L) must be between 0% and 100%
- `<qr-generator pattern="#ff00ff"></qr-generator>` (HEX and lowercase only)
- By default, it is set to black (#000000)

### Background color

All of the constraints are exactly the same as the previous parameter except the following:

- `<qr-generator background="#00ff00"></qr-generator>` (HEX and lowercase only)
- By default, it is set to white (#ffffff)

![pattern-background.png](https://i.ibb.co/PztGNTn/pattern-background.png)

An example where the generated QR code has a blue pattern and a yellow background
 
### Error correction code (ECC)

Determines the level of data redundancy. The more data redundancy there is, the more data can be recovered if a QR code is damaged. A higher ECC results in more data being stored, but also protects against data corruption.

- Represented in a dropdown menu and is a set of 4 values ordered progressively, starting from **Low** (L), **Medium** (M), **High** (Q) and **Very High** (H)
- `<qr-generator ecc="Q"></qr-generator>`
- By default, a Low error correction value is selected

![ecc.jpg](https://i.ibb.co/Jxtkwnt/ecc.jpg)

Same encoded message, but the left QR code has a low error correction and the right one has a very high error correction. We can clearly see that the higher the error correction, the more patterns the QR code will have.

### Quiet zone

The quiet zone is the blank margin around the QR code that is used to tell the reader where a QR code begins and ends. Its purpose is to help the reader locate the QR code and prevent it from picking up disturbing or redundant elements. The blank margin does not send a scanning signal, hence the name "quiet".

For example, the quiet zone value of 1 leads to a drawn margin around the QR code which is as thick as a pixel of the QR code.

- Must be a value between 0 and 10
- `<qr-generator qzone="3"></qr-generator>`
- By default, it is set to 0 (no quiet zone)

![qzone.jpg](https://i.ibb.co/Dpzq0zV/qzone.jpg)

Same encoded message, but the left QR code does not have a quiet zone and the right one has a quiet zone with the thickness of 3 QR pixels.

### File format

If all the parameters selected by the user are valid, the user will have the option to generate the QR code. Currently, there are 3 file format options: **JPG**, **PNG** or **SVG**. 

 `<qr-generator format="jpg"></qr-generator>` (lowercase only)

After the user presses the button with their preferred file format, a request is sent to the server, which responds with the generated QR code and embeds it into the web component for the user to scan or save it to their device.

![generate.png](https://i.ibb.co/CP1qhJ9/generate.png)

## Code

All the HTML attributes are optional. The missing attributes will be replaced with the default values, presented in the previous section. 

If one of the attributes does not respect the constraints presented in the previous section, all the QR related attributes will be replaced with the default values.

### Examples

This will generate all the inputs filled with the default values. The user may tweak the inputs according to his preference.

	<qr-generator></qr-generator>

---

This will generate the QR code. The missing attributes are replaced with the default values.

	<qr-generator
		text="Superb!"
		size="500"
		pattern="#0040ff"
		qzone="2">
	</qr-generator>

![example.png](https://i.ibb.co/sPFyR3L/example.png)

---

We can notice below that `qzone` does not respect the constraints. The default values will be used to generate the QR code. In addition, the `hide` attribute is enabled, i.e. only the QR code is generated, without any input that would allow its modification.

	<qr-generator
		hide="true"
		text="Superb!"
		size="500"
		pattern="#0040ff"
		qzone="15">
	</qr-generator>
