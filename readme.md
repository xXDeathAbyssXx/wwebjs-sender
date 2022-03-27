<div align="center">

[![Npm package version](https://badgen.net/npm/v/@deathabyss/wwebjs-sender)](https://www.npmjs.com/package/@deathabyss/wwebjs-sender) [![Npm package weekly downloads](https://badgen.net/npm/dw/@deathabyss/wwebjs-sender)](https://www.npmjs.com/package/@deathabyss/wwebjs-sender) [![GitHub stars](https://img.shields.io/github/stars/xXDeathAbyssXx/wwebjs-sender.svg)](https://github.com/xXDeathAbyssXx/wwebjs-sender/watchers)

</div>

This package creates embeds and buttons in a very simple way using the [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js) module for whatsapp.

> NOTE : Internally [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js) is being used to send and receive messages. Though it has been safe as per my testing, I cannot promise that your number will not be blocked by Whatsapp. Also, this project is not affiliated, associated, authorized or endorsed with Whatsapp or any of its subsidiaries or affiliates in any way.

---

## 🔗 Links

- [github](https://github.com/xXDeathAbyssXx/wwebjs-sender)
- [npm](https://www.npmjs.com/package/@deathabyss/wwebjs-sender)

---

## 🚀 Installation:

<table><tr><td colspan="3">

Install the package @deathabyss/wwebjs-sender with npm or yarn

</td></tr><tr><td valign="top">

<details><summary> npm </summary><p>

```bash
npm i @deathabyss/wwebjs-sender
```

</p></details></td><td valign="top">

<details><summary> yarn </summary><p>

```bash
yarn add @deathabyss/wwebjs-sender
```

</p></details></td></tr></table>
<br>
<table><tr><td colspan="3">

Install the package whatsapp-web.js with npm or yarn

</td></tr><tr><td valign="top">

<details><summary> npm </summary><p>

```bash
npm i whatsapp-web.js
```

</p></details></td><td valign="top">

<details><summary> yarn </summary><p>

```bash
yarn add whatsapp-web.js
```

</p></details></td></tr></table>

## Update 🔁

<table><tr><td colspan="3">

Update the package @deathabyss/wwebjs-sender with npm or yarn

</td></tr><tr><td valign="top">

<details><summary> npm </summary><p>

```bash
npm r @deathabyss/wwebjs-sender && npm i @deathabyss/wwebjs-sender
```

</p></details></td><td valign="top">

<details><summary> yarn </summary><p>

```bash
yarn remove @deathabyss/wwebjs-sender && yarn add @deathabyss/wwebjs-sender
```

</p></details></td></tr></table>

<br>

<table><tr><td colspan="3">

Update the package whatsapp-web.js with npm or yarn

</td></tr><tr><td valign="top">

<details><summary> npm </summary><p>

```bash
npm r whatsapp-web.js && npm i whatsapp-web.js
```

</p></details></td><td valign="top">

<details><summary> yarn </summary><p>

```bash
yarn remove whatsapp-web.js && yarn add whatsapp-web.js
```

</p></details></td></tr></table>

---

## ✨ Features:

- Create embeds in an easy way
- Create buttons in an easy way
- Reply to messages with embed
- Send messages to a number with embeds and buttons at the same time in an easy way

---

## 👀 Example usage:

```js
const WwebjsSender = require("@deathabyss/wwebjs-sender");
const { Client } = require("whatsapp-web.js");

const client = new Client();

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (msg) => {
  if (msg.body == "!command") {
    const { from } = msg;
    let embed = new WwebjsSender.MessageEmbed()
      .sizeEmbed(28)
      .setTitle("✅ | Successful process!")
      .setDescription("The process has been successful!")
      .addField("✔", "To confirm")
      .addField("❌", "To cancel")
      .addFields({
        name: "Now you have 2 buttons to   choose!",
        value: "✔ or ❌",
      })
      .setFooter("WwebjsSender")
      .setTimestamp();

    let button1 = new WwebjsSender.MessageButton()
      .setCustomId("confirm")
      .setLabel("✔");

    let button2 = new WwebjsSender.MessageButton()
      .setCustomId("cancel")
      .setLabel("❌");

    WwebjsSender.send({
      client: client,
      number: from,
      embed: embed,
      button: [button1, button2],
    });
  }
});

client.initialize();
```

## 👀 Example Result:

<div align="center">
<img height="400vh" src="https://i.imgur.com/zuvJ5iR.jpeg">
</div>

---

## 📚 Usage:

### `MessageEmbed`

```js
let embed = new MessageEmbed() //Call the constructor MessageEmbed
  .sizeEmbed(28) //Set horizontal size of the embed in pixel [optional] [default 28 pixels]
  .setTitle("Title") //Set a title for the embed [optional]
  .setDescription("Description") //Set a description for the embed [required]
  .setFooter("Footer") //Set a footer for the embed [optional]
  .addField("Name", "Value") //Set a field name for the embed [optional]
  .addFields({ name: "Name", value: "Value" }) //set fields for the embed [optional]
  .setTimestamp(); //Set a timestamp for the embed [optional]
```

### `MessageButton`

```js
let button = new MessageButton() //Call the constructor MessageButton
  .setCustomId("Id") //Set a custom id for the button [optional]
  .setLabel("Label"); //Set a label for the button [required]
```

### `Reply`

```js
reply({
  message: msg, //The message that was received [required]
  embed: embed, //The embed [required]
});
```

### `Send`

```js
send({
  client: client, //The client of the bot [required]
  number: number, //The number to send the message [required]
  embed: embed, //The embed [required]
  button: [button], //The button/s [optional]
});
```

---

## 📁 Contributing

1 - Fork it (https://github.com/yourname/yourproject/fork)

2 - Create your feature branch (`git checkout -b features/thing`)

3 - Commit your changes (`git commit -am 'feat(image): Add some thing'`)

4 - Push to the branch (`git push origin feature/thing`)

5 - Create a new Pull Request

---

## 👥 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><a href="https://github.com/xXDeathAbyssXx"><img src="https://i.imgur.com/B2xcm3E.gif" width="100px;"/><br /><sub><b>DeathAbyss</b></sub></a><br /><a href="https://github.com/xXDeathAbyssXx" title="Code">💻</a> <a title="Design">🎨</a> <a title="Tests">🧪</a> <a title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📖 License

This project is licensed under the MIT License, see the [LICENSE](https://github.com/xXDeathAbyssXx/wwebjs-sender/blob/main/LICENSE) file for details.

---
