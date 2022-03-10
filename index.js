const { Buttons } = require("whatsapp-web.js");
const isPhone = require("is-phone");

/**
 * Represents an embed in a message with strings ascii design
 */
exports.MessageEmbed = function () {
  /**
   * Represents the possible options for a MessageEmbed
   * @property {string} [title] The title of this embed
   * @property {string} [description] The description of this embed
   * @property {string} [footer] The footer of this embed
   * @property {*} [timestamp=Date.now()] Show/Hide the timestamp of this embed
   */
  let title;
  let description;
  let footer;
  let timestamp = false;
  let title_embed = "";
  let desc_embed = "";
  let footer_embed = "";
  let timestap_embed = "";

  let max = 28;
  let up_l = "┌";
  let up_r = "┐";
  let down_l = "└";
  let down_r = "┘";
  let wall = "│";
  let space = " ";

  return {
    /**
     * Sets the title of this embed.
     * @param {string} title The title
     * @returns {MessageEmbed}
     */
    setTitle: function (title) {
      if (typeof title === "string") {
        let lenstr = title.length;
        if (lenstr > max) {
          let o = lenstr + 1;
          let parts = 28;
          let parts_count = 0;
          let parts_count_loop = 0;
          let help_loop = false;
          let final_count = 0;
          let arr_parts = [];
          for (let i = 0; i < o; i++) {
            if (i === parts) {
              arr_parts.push(i);
              parts_count++;
              parts_count_loop++;
              parts = parts + 28;
            }
            if (i === lenstr) {
              help_loop = true;
              let lastElement = arr_parts[arr_parts.length - 1];
              final_count = i - lastElement;
              final_count = final_count + lastElement;
              arr_parts.push(final_count);
            }
          }
          if (help_loop === true) {
            parts_count_loop++;
          }

          let arr = [];
          let liceit = 0;
          let liceitagain = 28;
          let see_final = parts_count_loop - 1;
          for (let i = 0; i < parts_count_loop; i++) {
            if (i === see_final) {
              let neednum = i - 1;
              let fix_another_last = arr_parts[neednum];
              let fix_last = arr_parts[i];
              let maketheslicefix = title.slice(fix_another_last, fix_last);
              let final_result = wall + space + " *" + maketheslicefix + "* ";
              arr.push(final_result);
              break;
            }
            let maketheslice = title.slice(liceit, liceitagain);
            let final_result = wall + space + " *" + maketheslice + "* ";
            arr.push(final_result);
            liceit = liceit + 28;
            liceitagain = liceitagain + 28;
          }
          let titlearr = "";
          let see_final_arr = arr.length - 1;
          for (let i = 0; i < arr.length; i++) {
            if (i === see_final_arr) {
              titlearr = titlearr + arr[i];
              break;
            }
            titlearr = titlearr + arr[i] + "\n";
          }
          title_embed = titlearr;
        } else {
          if (lenstr < 29) {
            let getspaces = 28 - lenstr;
            if (getspaces === 0) {
              let spacessums = space;
              for (let i = 0; i < getspaces; i++) {
                spacessums = spacessums + space;
              }
              let titletoembed = wall + space + " *" + title + "* ";
              title_embed = titletoembed;
            } else {
              let spacessums = "";
              for (let i = 0; i < getspaces; i++) {
                spacessums = spacessums + space;
              }
              let titletoembed = wall + space + " *" + title + "* ";
              title_embed = titletoembed;
            }
          }
        }
      } else {
        return console.error("MessageEmbed title must be a string.");
      }
      this.title = title_embed;
      return this;
    },
    /**
     * Sets the description of this embed.
     * @param {string} description The description
     * @returns {MessageEmbed}
     */
    setDescription: function (description) {
      if (typeof description === "string") {
        let lenstr = description.length;

        if (lenstr < 1) {
          return console.error(
            "MessageEmbed description must be non-empty strings."
          );
        }

        if (lenstr > max) {
          let o = lenstr + 1;
          let parts = 28;
          let parts_count = 0;
          let parts_count_loop = 0;
          let help_loop = false;
          let final_count = 0;
          let arr_parts = [];
          for (let i = 0; i < o; i++) {
            if (i === parts) {
              arr_parts.push(i);
              parts_count++;
              parts_count_loop++;
              parts = parts + 28;
            }
            if (i === lenstr) {
              help_loop = true;
              let lastElement = arr_parts[arr_parts.length - 1];
              final_count = i - lastElement;
              final_count = final_count + lastElement;
              arr_parts.push(final_count);
            }
          }
          if (help_loop === true) {
            parts_count_loop++;
          }

          let arr = [];
          let liceit = 0;
          let liceitagain = 28;
          let see_final = parts_count_loop - 1;
          for (let i = 0; i < parts_count_loop; i++) {
            if (i === see_final) {
              let neednum = i - 1;
              let fix_another_last = arr_parts[neednum];
              let fix_last = arr_parts[i];
              let maketheslicefix = description.slice(
                fix_another_last,
                fix_last
              );
              let final_result = wall + space + maketheslicefix;
              arr.push(final_result);
              break;
            }
            let maketheslice = description.slice(liceit, liceitagain);
            let final_result = wall + space + maketheslice;
            arr.push(final_result);
            liceit = liceit + 28;
            liceitagain = liceitagain + 28;
          }
          let descarr = "";
          let see_final_arr = arr.length - 1;
          for (let i = 0; i < arr.length; i++) {
            if (i === see_final_arr) {
              descarr = descarr + arr[i];
              break;
            }
            descarr = descarr + arr[i] + "\n";
          }
          desc_embed = "\n" + descarr + "\n";
        } else {
          if (lenstr < 29) {
            let getspaces = 28 - lenstr;
            if (getspaces === 0) {
              let spacessums = space;
              for (let i = 0; i < getspaces; i++) {
                spacessums = spacessums + space;
              }
              let desctoembed = wall + space + description;
              desc_embed = "\n" + desctoembed + "\n";
            } else {
              let spacessums = "";
              for (let i = 0; i < getspaces; i++) {
                spacessums = spacessums + space;
              }
              let desctoembed = wall + space + description;
              desc_embed = "\n" + desctoembed + "\n";
            }
          }
        }
      } else {
        return console.error("MessageEmbed description must be a string.");
      }

      this.description = desc_embed;
      return this;
    },
    /**
     * Sets the footer of this embed.
     * @param {string} footer The footer
     * @returns {MessageEmbed}
     */
    setFooter: function (footer) {
      if (typeof footer === "string") {
        let lenstr = footer.length;

        if (lenstr > 10) {
          footer_embed = "";
        } else {
          footer_embed = wall + space + "```" + footer + "```";
        }
      } else {
        return console.error("MessageEmbed footer must be a string.");
      }

      this.footer = footer_embed;
      return this;
    },
    /**
     * Sets the timestamp of this embed.
     * @param {*} [timestamp=Date.now()] The timestamp or date.
     * If `null` then the timestamp will be unset (i.e. when editing an existing {@link MessageEmbed})
     * @returns {MessageEmbed}
     */
    setTimestamp: function (timestamp) {
      if (timestamp === undefined) {
        const today = new Date();
        const date =
          today.getMonth() +
          "/" +
          (today.getDate() + 1) +
          "/" +
          today.getFullYear();

        timestap_embed = `  *•*  ${date}`;
      }

      this.timestamp = timestap_embed;
      return this;
    },
    build: function () {
      return new MessageEmbed(title, description, footer, timestamp);
    },
  };
};
/**
 * Represents an button object to set in a sendMessage method
 */
exports.MessageButton = function () {
  /**
   * A `Partial` object is a representation of any existing object.
   * This object contains between 0 and all of the original objects parameters.
   * This is true regardless of whether the parameters are optional in the base object.
   * @typedef {Object} Partial
   */

  /**
   * Represents the possible options for a MessageButton
   * @property {string} [id] The custom of this button
   * @property {string} [label] The label of this button
   */

  let id;
  let label;
  let id_btn = "";
  let label_btn = "";

  return {
    /**
     * Sets the custom id of this button.
     * @param {string} id The custom id of the button
     * @returns {MessageButton}
     */
    setCustomId: function (id) {
      if (typeof id === "string") {
        id_btn = id;
      } else {
        return console.error("MessageButton id must be a string.");
      }
      this.id = id_btn;
      return this;
    },
    /**
     * Sets the label of this button.
     * @param {string} label The label of the button
     * @returns {MessageButton}
     */
    setLabel: function (label) {
      if (typeof label === "string") {
        label_btn = label;
      } else {
        return console.error("MessageButton label must be a string.");
      }
      this.label = label_btn;
      return this;
    },
    build: function () {
      return new MessageButton(id, label);
    },
  };
};

/**
 * Reply a message with a MessageEmbed string
 * @property {object} [message] The message to reply
 * @property {string} [embed] The embed to reply
 */

exports.reply = function ({ message, embed }) {
  if (typeof message === "object") {
    if (typeof embed === "object") {
      let result_embed = "";
      let up_l = "┌";
      let up_r = "┐";
      let down_l = "└";
      let down_r = "┘";
      let wall = "│";
      let title = embed.title;
      let lentitle = title.length;
      let description = embed.description;
      let footer = embed.footer;
      let lenfooter = footer.length;
      let timestamp = embed.timestamp;

      if (lentitle > 2) {
        title = "\n" + title + "\n" + wall + "────────────────────────" + wall;
      } else {
        title = "";
      }

      if (timestamp === undefined) {
        timestamp = "";
      }

      if (lenfooter > 2) {
        footer =
          wall +
          "────────────────────────" +
          wall +
          "\n" +
          footer +
          timestamp +
          "\n";
      } else {
        footer = "";
      }

      result_embed =
        up_l +
        "────────────────────────" +
        up_r +
        title +
        description +
        footer +
        down_l +
        "────────────────────────" +
        down_r;

      return message.reply(result_embed);
    }
  }
};

/**
 * Send a message with buttons or MessageEmbed to a number
 * @property {object} [client] The client to send a message
 * @property {string} [number] The number to send a message
 * @property {string} [embed] The MessageEmbed to send a message
 * @property {object} [button] The buttons/s to send a message
 */
exports.send = function ({ client, number, embed, button }) {
  if (typeof client === "object") {
    if (typeof number === "string") {
      let checkisreal = number.split("@");
      let checknumber = checkisreal[0];
      let checkid = checkisreal[1];
      let checknumbernpm = isPhone(checknumber);
      if (checknumbernpm === false) {
        return console.error("You must pass a valid number");
      }
      if (!(checkid === "c.us")) {
        return console.error("You must pass a valid number");
      }
      if (button === undefined) {
        if (typeof embed === "object") {
          let result_embed = "";
          let up_l = "┌";
          let up_r = "┐";
          let down_l = "└";
          let down_r = "┘";
          let wall = "│";
          let title = embed.title;
          let lentitle = title.length;
          let description = embed.description;
          let footer = embed.footer;
          let lenfooter = footer.length;
          let timestamp = embed.timestamp;

          if (lentitle > 2) {
            title =
              "\n" + title + "\n" + wall + "────────────────────────" + wall;
          } else {
            title = "";
          }

          if (timestamp === undefined) {
            timestamp = "";
          }

          if (lenfooter > 2) {
            footer =
              wall +
              "────────────────────────" +
              wall +
              "\n" +
              footer +
              timestamp +
              "\n";
          } else {
            footer = "";
          }

          result_embed =
            up_l +
            "────────────────────────" +
            up_r +
            title +
            description +
            footer +
            down_l +
            "────────────────────────" +
            down_r;

          return client.sendMessage(number, result_embed);
        }
      } else {
        if (typeof button === "object") {
          if (button.length === undefined) {
            return console.error("Button/s can only be passed by array.");
          }
          let buttonlen = button.length;
          let buttonarray = [];
          for (let i = 0; i < buttonlen; i++) {
            let btnpass = button[i];
            let idpass = btnpass.id;
            let bodypass = btnpass.label;
            let pushpass = buttonarray.push({ id: idpass, body: bodypass });
          }
          let label = button.label;
          if (typeof embed === "object") {
            let result_embed = "";
            let up_l = "┌";
            let up_r = "┐";
            let down_l = "└";
            let down_r = "┘";
            let wall = "│";
            let title = embed.title;
            let lentitle = title.length;
            let description = embed.description;
            let footer = embed.footer;
            let lenfooter = footer.length;
            let timestamp = embed.timestamp;
            if (lentitle > 2) {
              title =
                "\n" + title + "\n" + wall + "────────────────────────" + wall;
            } else {
              title = "";
            }

            if (timestamp === undefined) {
              timestamp = "";
            }

            if (lenfooter > 2) {
              footer =
                wall +
                "────────────────────────" +
                wall +
                "\n" +
                footer +
                timestamp +
                "\n";
            } else {
              footer = "";
            }

            result_embed =
              up_l +
              "────────────────────────" +
              up_r +
              title +
              description +
              footer +
              down_l +
              "────────────────────────" +
              down_r;

            client.sendMessage(
              number,
              new Buttons(result_embed, buttonarray, ``, ``)
            );

            return;
          }
        }
      }
    }
  }
};
