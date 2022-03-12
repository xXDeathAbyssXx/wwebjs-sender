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
    let embed = new WwebjsSender.MessageEmbed()
      .setTitle("Title")
      .setDescription(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      )
      .setFooter("Footer")
      .setTimestamp();

    let button1 = new WwebjsSender.MessageButton()
      .setCustomId("id_1")
      .setLabel("Label");

    let button2 = new WwebjsSender.MessageButton()
      .setCustomId("id_2")
      .setLabel("Label");

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

---

## 📚 Usage:

### `MessageEmbed`

```js
let embed = new MessageEmbed() //Call the constructor MessageEmbed
  .setTitle("Title") //Set a title for the embed [optional]
  .setDescription("Description") //Set a description for the embed [required]
  .setFooter("Footer") //Set a footer for the embed [optional]
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
