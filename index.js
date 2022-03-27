const { Buttons } = require("whatsapp-web.js");
const isPhone = require("is-phone");
const Util = require("./util/Util");

/**
 * Represents an embed in a message with strings ascii design
 */
exports.MessageEmbed = class MessageEmbed {
  /**
   * Represents the possible options for a MessageEmbed
   * @property {string} [title] The title of this embed
   * @property {string} [description] The description of this embed
   * @property {string} [footer] The footer of this embed
   * @property {*} [timestamp=Date.now()] Show/Hide the timestamp of this embed
   */

  constructor(data = {}, skipValidation = false) {
    this.setup(data, skipValidation);
  }

  setup(data, skipValidation) {
    /**
     * The title of this embed
     * @type {?string}
     */
    this.title = data.title ?? null;

    /**
     * The description of this embed
     * @type {?string}
     */
    this.description = data.description ?? null;

    /**
     * The timestamp of this embed
     * @type {?number}
     */
    this.timestamp =
      "timestamp" in data ? new Date(data.timestamp).getTime() : null;

    this.px = data.px ?? null;

    /**
     * Represents a field of a MessageEmbed
     * @typedef {Object} EmbedField
     * @property {string} name The name of this field
     * @property {string} value The value of this field
     */

    /**
     * The fields of this embed
     * @type {EmbedField[]}
     */
    this.fields = [];
    if (data.fields) {
      this.fields = skipValidation
        ? data.fields.map(Util.cloneObject)
        : this.constructor.normalizeFields(data.fields);
    }

    /**
     * The footer of this embed
     * @type {?string}
     */
    this.footer = data.footer ?? null;
  }

  /**
   * Checks if this embed is equal to another one by comparing every single one of their properties.
   * @param {MessageEmbed|APIEmbed} embed The embed to compare with
   * @returns {boolean}
   */
  equals(embed) {
    return (
      this.title === embed.title &&
      this.description === embed.description &&
      this.timestamp === embed.timestamp &&
      this.px === embed.px &&
      this.fields.length === embed.fields.length &&
      this.fields.every((field, i) =>
        this._fieldEquals(field, embed.fields[i])
      ) &&
      this.footer === embed.footer
    );
  }

  /**
   * Compares two given embed fields to see if they are equal
   * @param {EmbedFieldData} field The first field to compare
   * @param {EmbedFieldData} other The second field to compare
   * @returns {boolean}
   * @private
   */
  _fieldEquals(field, other) {
    return field.name === other.name && field.value === other.value;
  }

  sizeEmbed(px) {
    let embedsize = null;
    let line_convert = null;
    if (typeof px === "number") {
      if (px > 2 && px < 47) {
        let mathnum = px - 4;
        let fixmath = Math.abs(mathnum);
        line_convert = "";
        for (let i = 0; i < fixmath; i++) {
          line_convert = line_convert + "─";
        }
        embedsize = {
          char: px,
          line: line_convert,
        };
      } else {
        return console.error(
          `MessageEmbed sizeEmbed string cannot be less than 3 and greater than 47.`
        );
      }
    }
    this.px = embedsize;
    return this;
  }

  /**
   * Adds a field to the embed (max 25).
   * @param {string} name The name of this field
   * @param {string} value The value of this field
   * @param {boolean} [inline=false] If this field will be displayed inline
   * @returns {MessageEmbed}
   */
  addField(name, value) {
    return this.addFields({ name, value });
  }

  /**
   * Adds fields to the embed (max 25).
   * @param {...EmbedFieldData|EmbedFieldData[]} fields The fields to add
   * @returns {MessageEmbed}
   */
  addFields(...fields) {
    this.fields.push(...this.constructor.normalizeFields(fields));
    return this;
  }

  /**
   * Sets the description of this embed.
   * @param {string} description The description
   * @returns {MessageEmbed}
   */
  setDescription(description) {
    let desc_embed = "";
    let max = 28;
    let wall = "│";
    let space = " ";

    let size_embed = this.sizeEmbed();

    if (!(size_embed === null)) {
      max = size_embed.char;
    }

    let moremax = max + 1;

    if (typeof description === "string") {
      let lenstr = description.length;

      if (lenstr < 1) {
        return console.error(
          "MessageEmbed description must be non-empty strings."
        );
      }

      if (lenstr > max) {
        let o = lenstr + 1;
        let parts = max;
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
            parts = parts + max;
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
        let liceitagain = max;
        let see_final = parts_count_loop - 1;
        for (let i = 0; i < parts_count_loop; i++) {
          if (i === see_final) {
            let neednum = i - 1;
            let fix_another_last = arr_parts[neednum];
            let fix_last = arr_parts[i];
            let maketheslicefix = description.slice(fix_another_last, fix_last);
            let final_result = wall + space + maketheslicefix;
            arr.push(final_result);
            break;
          }
          let maketheslice = description.slice(liceit, liceitagain);
          let final_result = wall + space + maketheslice;
          arr.push(final_result);
          liceit = liceit + max;
          liceitagain = liceitagain + max;
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
        if (lenstr < moremax) {
          let getspaces = max - lenstr;
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
  }

  /**
   * Sets the footer of this embed.
   * @param {string} footer The footer
   * @returns {MessageEmbed}
   */
  setFooter(footer) {
    let footer_embed = "";
    let wall = "│";
    let space = " ";
    if (typeof footer === "string") {
      let lenstr = footer.length;

      if (lenstr > 20) {
        return console.error(
          `MessageEmbed footer string cannot be greater than 20.`
        );
      } else {
        footer_embed = wall + space + "```" + footer + "```";
      }
    } else {
      return console.error("MessageEmbed footer must be a string.");
    }

    this.footer = footer_embed;
    return this;
  }

  /**
   * Sets the timestamp of this embed.
   * @param {*} [timestamp=Date.now()] The timestamp or date.
   * If `null` then the timestamp will be unset (i.e. when editing an existing {@link MessageEmbed})
   * @returns {MessageEmbed}
   */
  setTimestamp(timestamp) {
    let timestap_embed = "";
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
  }

  /**
   * Sets the title of this embed.
   * @param {string} title The title
   * @returns {MessageEmbed}
   */
  setTitle(title) {
    let title_embed = "";
    let max = 28;
    let wall = "│";
    let space = " ";

    let size_embed = this.sizeEmbed();

    if (!(size_embed === null)) {
      max = size_embed.char;
    }

    let moremax = max + 1;

    if (typeof title === "string") {
      let lenstr = title.length;
      if (lenstr > max) {
        let o = lenstr + 1;
        let parts = max;
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
            parts = parts + max;
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
        let liceitagain = max;
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
          liceit = liceit + max;
          liceitagain = liceitagain + max;
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
        if (lenstr < moremax) {
          let getspaces = max - lenstr;
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
  }

  /**
   * Transforms the embed to a plain object.
   * @returns {APIEmbed} The raw data of this embed
   */
  toJSON() {
    return {
      title: this.title,
      description: this.description,
      timestamp: this.timestamp && new Date(this.timestamp),
      px: this.px,
      fields: this.fields,
      footer: this.footer,
    };
  }

  /**
   * Normalizes field input and verifies strings.
   * @param {string} name The name of the field
   * @param {string} value The value of the field
   * @returns {EmbedField}
   */
  static normalizeField(name, value) {
    return {
      name: Util.verifyString(name, RangeError, "EMBED_FIELD_NAME", false),
      value: Util.verifyString(value, RangeError, "EMBED_FIELD_VALUE", false),
    };
  }

  /**
   * Normalizes field input and resolves strings.
   * @param {...EmbedFieldData|EmbedFieldData[]} fields Fields to normalize
   * @returns {EmbedField[]}
   */
  static normalizeFields(...fields) {
    return fields
      .flat(2)
      .map((field) => this.normalizeField(field.name, field.value));
  }
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
 * @property {object} [embed] The embed to reply
 */

exports.reply = function ({ message, embed }) {
  if (typeof message === "object") {
    if (typeof embed === "object") {
      let result_embed = "";
      let fields_name_embed = "";
      let fields_value_embed = "";
      let fields_embed = "";
      let up_l = "┌";
      let up_r = "┐";
      let down_l = "└";
      let down_r = "┘";
      let wall = "│";
      let space = " ";
      let size_embed = embed.px;
      let max = 28;
      if (
        !(
          size_embed === null ||
          size_embed.char === null ||
          size_embed.char === undefined
        )
      ) {
        max = size_embed.char;
      }
      let moremax = max + 1;
      let getlessmax = max - 1;
      let lessmax = Math.abs(getlessmax);
      let lines = "────────────────────────";
      if (
        !(
          size_embed === null ||
          size_embed.line === null ||
          size_embed.line === undefined
        )
      ) {
        lines = size_embed.line;
      }
      let title = embed.title;
      let lentitle;
      if (title === null) {
        lentitle = 0;
      } else {
        lentitle = title.length;
      }
      let description = embed.description;
      if (description === null) {
        return console.error("MessageEmbed need description to work.");
      }
      let fields = embed.fields;
      if (!(fields === null)) {
        if (!(fields.length === null)) {
          if (!(fields.length === 0)) {
            if (typeof fields === "object") {
              let lenstr = fields.length;
              for (let i = 0; i < lenstr; i++) {
                let fields_name = fields[i].name;
                let fields_value = fields[i].value;
                let lenstr_name = fields_name.length;
                let lenstr_value = fields_value.length;
                let final_count_name = 0;
                let final_count_value = 0;
                let value_wall_fix = 0;
                if (lenstr_name < 1) {
                  return console.error(
                    "MessageEmbed name of field must be non-empty strings."
                  );
                }
                if (lenstr_name > max) {
                  let o = lenstr_name + 1;
                  let parts = max;
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
                      parts = parts + max;
                    }
                    if (i === lenstr_name) {
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
                  let liceitagain = max;
                  let see_final = parts_count_loop - 1;
                  for (let i = 0; i < parts_count_loop; i++) {
                    if (i === see_final) {
                      let neednum = i - 1;
                      let fix_another_last = arr_parts[neednum];
                      let fix_last = arr_parts[i];
                      let maketheslicefix = fields_name.slice(
                        fix_another_last,
                        fix_last
                      );
                      final_count_name = maketheslicefix.length;
                      let final_result;
                      if (i === 0) {
                        final_result = final_result =
                          wall + space + " *" + maketheslicefix;
                      } else {
                        final_result = wall + space + maketheslicefix;
                      }
                      arr.push(final_result);
                      break;
                    }
                    let maketheslice = fields_name.slice(liceit, liceitagain);
                    let final_result;
                    if (i === 0) {
                      final_result = final_result =
                        wall + space + " *" + maketheslice;
                    } else {
                      final_result = wall + space + maketheslice;
                    }
                    arr.push(final_result);
                    liceit = liceit + max;
                    liceitagain = liceitagain + max;
                  }
                  let fields_namearr = "";
                  let see_final_arr = arr.length - 1;
                  for (let i = 0; i < arr.length; i++) {
                    if (i === see_final_arr) {
                      fields_namearr = fields_namearr + arr[i];
                      break;
                    }
                    fields_namearr = fields_namearr + arr[i] + "\n";
                  }
                  fields_name_embed = fields_namearr + "*  |";
                } else {
                  if (lenstr_name < moremax) {
                    final_count_name = lenstr_name;
                    let getspaces = max - lenstr_name;
                    if (getspaces === 0) {
                      let spacessums = space;
                      for (let i = 0; i < getspaces; i++) {
                        spacessums = spacessums + space;
                      }
                      let fields_nametoembed =
                        wall + space + " *" + fields_name + "*" + "  |";
                      fields_name_embed = fields_nametoembed;
                    } else {
                      let spacessums = "";
                      for (let i = 0; i < getspaces; i++) {
                        spacessums = spacessums + space;
                      }
                      let fields_nametoembed =
                        wall + space + " *" + fields_name + "*" + "  |";
                      fields_name_embed = fields_nametoembed;
                    }
                  }
                }

                fields_embed = fields_embed + fields_name_embed;

                if (lenstr_value < 1) {
                  return console.error(
                    "MessageEmbed value of field must be non-empty strings."
                  );
                }

                if (lenstr_value > max) {
                  let o = lenstr_value + 1;
                  let parts = max;
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
                      parts = parts + max;
                    }
                    if (i === lenstr_value) {
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
                  let liceitagain = max;
                  let see_final = parts_count_loop - 1;
                  for (let i = 0; i < parts_count_loop; i++) {
                    if (i === see_final) {
                      let neednum = i - 1;
                      let fix_another_last = arr_parts[neednum];
                      let fix_last = arr_parts[i];
                      let maketheslicefix = fields_value.slice(
                        fix_another_last,
                        fix_last
                      );
                      final_count_value = maketheslicefix.length;
                      let final_result = wall + space + maketheslicefix;
                      arr.push(final_result);
                      break;
                    }
                    let maketheslice = fields_value.slice(liceit, liceitagain);
                    let final_result;
                    if (value_wall_fix === 0) {
                      final_result = space + maketheslice;
                      value_wall_fix++;
                    } else {
                      final_result = wall + space + maketheslice;
                    }
                    arr.push(final_result);
                    liceit = liceit + max;
                    liceitagain = liceitagain + max;
                  }
                  let fields_valuearr = "";
                  let see_final_arr = arr.length - 1;
                  for (let i = 0; i < arr.length; i++) {
                    if (i === see_final_arr) {
                      fields_valuearr = fields_valuearr + arr[i];
                      break;
                    }
                    fields_valuearr = fields_valuearr + arr[i] + "\n";
                  }
                  fields_value_embed = fields_valuearr + "\n";
                } else {
                  if (lenstr_value < moremax) {
                    final_count_value = lenstr_value;
                    let getspaces = max - lenstr_value;
                    if (getspaces === 0) {
                      let spacessums = space;
                      for (let i = 0; i < getspaces; i++) {
                        spacessums = spacessums + space;
                      }
                      let fields_valuetoembed = space + fields_value;
                      fields_value_embed = fields_valuetoembed + "\n";
                    } else {
                      let spacessums = "";
                      for (let i = 0; i < getspaces; i++) {
                        spacessums = spacessums + space;
                      }
                      let fields_valuetoembed = space + fields_value;
                      fields_value_embed = fields_valuetoembed + "\n";
                    }
                  }
                }
                let final_count_new_line = final_count_name + final_count_value;
                if (final_count_new_line < lessmax) {
                  fields_embed =
                    fields_embed +
                    fields_value_embed +
                    wall +
                    lines +
                    wall +
                    "\n";
                } else {
                  fields_embed =
                    fields_embed +
                    "\n" +
                    wall +
                    fields_value_embed +
                    wall +
                    lines +
                    wall +
                    "\n";
                }
              }
            } else {
              return console.error("MessageEmbed fields must be a array.");
            }
          }
        }
      }
      let footer = embed.footer;
      let lenfooter;
      if (footer === null) {
        lenfooter = 0;
      } else {
        lenfooter = footer.length;
      }
      let timestamp = embed.timestamp;
      if (lentitle > 2) {
        title = "\n" + title + "\n" + wall + lines + wall;
      } else {
        title = "";
      }

      if (timestamp === null) {
        timestamp = "";
      }

      if (lenfooter > 2) {
        footer =
          wall + lines + wall + "\n" + fields_embed + footer + timestamp + "\n";
      } else {
        footer = "";
      }

      result_embed =
        up_l +
        lines +
        up_r +
        title +
        description +
        footer +
        down_l +
        lines +
        down_r;

      return message.reply(result_embed);
    }
  }
};

/**
 * Send a message with buttons or MessageEmbed to a number
 * @property {object} [client] The client to send a message
 * @property {string} [number] The number to send a message
 * @property {object} [embed] The MessageEmbed to send a message
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
      if (button === null || button === undefined || button.length === 0) {
        if (typeof embed === "object") {
          let result_embed = "";
          let fields_name_embed = "";
          let fields_value_embed = "";
          let fields_embed = "";
          let up_l = "┌";
          let up_r = "┐";
          let down_l = "└";
          let down_r = "┘";
          let wall = "│";
          let space = " ";
          let size_embed = embed.px;
          let max = 28;
          if (
            !(
              size_embed === null ||
              size_embed.char === null ||
              size_embed.char === undefined
            )
          ) {
            max = size_embed.char;
          }
          let moremax = max + 1;
          let getlessmax = max - 1;
          let lessmax = Math.abs(getlessmax);
          let lines = "────────────────────────";
          if (
            !(
              size_embed === null ||
              size_embed.line === null ||
              size_embed.line === undefined
            )
          ) {
            lines = size_embed.line;
          }
          let title = embed.title;
          let lentitle;
          if (title === null) {
            lentitle = 0;
          } else {
            lentitle = title.length;
          }
          let description = embed.description;
          if (description === null) {
            return console.error("MessageEmbed need description to work.");
          }
          let fields = embed.fields;
          if (!(fields === null)) {
            if (!(fields.length === null)) {
              if (!(fields.length === 0)) {
                if (typeof fields === "object") {
                  let lenstr = fields.length;
                  for (let i = 0; i < lenstr; i++) {
                    let fields_name = fields[i].name;
                    let fields_value = fields[i].value;
                    let lenstr_name = fields_name.length;
                    let lenstr_value = fields_value.length;
                    let final_count_name = 0;
                    let final_count_value = 0;
                    let value_wall_fix = 0;
                    if (lenstr_name < 1) {
                      return console.error(
                        "MessageEmbed name of field must be non-empty strings."
                      );
                    }

                    if (lenstr_name > max) {
                      let o = lenstr_name + 1;
                      let parts = max;
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
                          parts = parts + max;
                        }
                        if (i === lenstr_name) {
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
                      let liceitagain = max;
                      let see_final = parts_count_loop - 1;
                      for (let i = 0; i < parts_count_loop; i++) {
                        if (i === see_final) {
                          let neednum = i - 1;
                          let fix_another_last = arr_parts[neednum];
                          let fix_last = arr_parts[i];
                          let maketheslicefix = fields_name.slice(
                            fix_another_last,
                            fix_last
                          );

                          final_count_name = maketheslicefix.length;

                          let final_result =
                            wall + space + " *" + maketheslicefix + "*";
                          arr.push(final_result);
                          break;
                        }
                        let maketheslice = fields_name.slice(
                          liceit,
                          liceitagain
                        );
                        let final_result =
                          wall + space + " *" + maketheslice + "*";
                        arr.push(final_result);
                        liceit = liceit + max;
                        liceitagain = liceitagain + max;
                      }
                      let fields_namearr = "";
                      let see_final_arr = arr.length - 1;
                      for (let i = 0; i < arr.length; i++) {
                        if (i === see_final_arr) {
                          fields_namearr = fields_namearr + arr[i];
                          break;
                        }
                        fields_namearr = fields_namearr + arr[i] + "\n";
                      }
                      fields_name_embed = fields_namearr + "  |";
                    } else {
                      if (lenstr_name < moremax) {
                        final_count_name = lenstr_name;
                        let getspaces = max - lenstr_name;
                        if (getspaces === 0) {
                          let spacessums = space;
                          for (let i = 0; i < getspaces; i++) {
                            spacessums = spacessums + space;
                          }
                          let fields_nametoembed =
                            wall + space + " *" + fields_name + "*" + "  |";
                          fields_name_embed = fields_nametoembed;
                        } else {
                          let spacessums = "";
                          for (let i = 0; i < getspaces; i++) {
                            spacessums = spacessums + space;
                          }
                          let fields_nametoembed =
                            wall + space + " *" + fields_name + "*" + "  |";
                          fields_name_embed = fields_nametoembed;
                        }
                      }
                    }

                    fields_embed = fields_embed + fields_name_embed;

                    if (lenstr_value < 1) {
                      return console.error(
                        "MessageEmbed value of field must be non-empty strings."
                      );
                    }

                    if (lenstr_value > max) {
                      let o = lenstr_value + 1;
                      let parts = max;
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
                          parts = parts + max;
                        }
                        if (i === lenstr_value) {
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
                      let liceitagain = max;
                      let see_final = parts_count_loop - 1;
                      for (let i = 0; i < parts_count_loop; i++) {
                        if (i === see_final) {
                          let neednum = i - 1;
                          let fix_another_last = arr_parts[neednum];
                          let fix_last = arr_parts[i];
                          let maketheslicefix = fields_value.slice(
                            fix_another_last,
                            fix_last
                          );
                          final_count_value = maketheslicefix.length;
                          let final_result = wall + space + maketheslicefix;
                          arr.push(final_result);
                          break;
                        }
                        let maketheslice = fields_value.slice(
                          liceit,
                          liceitagain
                        );
                        let final_result;
                        if (value_wall_fix === 0) {
                          final_result = space + maketheslice;
                          value_wall_fix++;
                        } else {
                          final_result = wall + space + maketheslice;
                        }
                        arr.push(final_result);
                        liceit = liceit + max;
                        liceitagain = liceitagain + max;
                      }
                      let fields_valuearr = "";
                      let see_final_arr = arr.length - 1;
                      for (let i = 0; i < arr.length; i++) {
                        if (i === see_final_arr) {
                          fields_valuearr = fields_valuearr + arr[i];
                          break;
                        }
                        fields_valuearr = fields_valuearr + arr[i] + "\n";
                      }
                      fields_value_embed = fields_valuearr + "\n";
                    } else {
                      if (lenstr_value < moremax) {
                        final_count_value = lenstr_value;
                        let getspaces = max - lenstr_value;
                        if (getspaces === 0) {
                          let spacessums = space;
                          for (let i = 0; i < getspaces; i++) {
                            spacessums = spacessums + space;
                          }
                          let fields_valuetoembed = space + fields_value;
                          fields_value_embed = fields_valuetoembed + "\n";
                        } else {
                          let spacessums = "";
                          for (let i = 0; i < getspaces; i++) {
                            spacessums = spacessums + space;
                          }
                          let fields_valuetoembed = space + fields_value;
                          fields_value_embed = fields_valuetoembed + "\n";
                        }
                      }
                    }
                    let final_count_new_line =
                      final_count_name + final_count_value;
                    if (final_count_new_line < lessmax) {
                      fields_embed =
                        fields_embed +
                        fields_value_embed +
                        wall +
                        lines +
                        wall +
                        "\n";
                    } else {
                      fields_embed =
                        fields_embed +
                        "\n" +
                        wall +
                        fields_value_embed +
                        wall +
                        lines +
                        wall +
                        "\n";
                    }
                  }
                } else {
                  return console.error("MessageEmbed fields must be a array.");
                }
              }
            }
          }
          let footer = embed.footer;
          let lenfooter;
          if (footer === null) {
            lenfooter = 0;
          } else {
            lenfooter = footer.length;
          }
          let timestamp = embed.timestamp;
          if (lentitle > 2) {
            title = "\n" + title + "\n" + wall + lines + wall;
          } else {
            title = "";
          }

          if (timestamp === null) {
            timestamp = "";
          }

          if (lenfooter > 2) {
            footer =
              wall +
              lines +
              wall +
              "\n" +
              fields_embed +
              footer +
              timestamp +
              "\n";
          } else {
            footer = "";
          }

          result_embed =
            up_l +
            lines +
            up_r +
            title +
            description +
            footer +
            down_l +
            lines +
            down_r;

          return client.sendMessage(number, result_embed);
        }
      } else {
        if (typeof button === "object") {
          if (button.length === null) {
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
            let fields_name_embed = "";
            let fields_value_embed = "";
            let fields_embed = "";
            let up_l = "┌";
            let up_r = "┐";
            let down_l = "└";
            let down_r = "┘";
            let wall = "│";
            let space = " ";
            let max = max;
            let title = embed.title;
            let lentitle;
            if (title === null) {
              lentitle = 0;
            } else {
              lentitle = title.length;
            }
            let description = embed.description;
            if (description === null) {
              return console.error("MessageEmbed need description to work.");
            }
            let fields = embed.fields;
            if (!(fields === null)) {
              if (!(fields.length === null)) {
                if (!(fields.length === 0)) {
                  if (typeof fields === "object") {
                    let lenstr = fields.length;
                    for (let i = 0; i < lenstr; i++) {
                      let fields_name = fields[i].name;
                      let fields_value = fields[i].value;
                      let lenstr_name = fields_name.length;
                      let lenstr_value = fields_value.length;
                      let final_count_name = 0;
                      let final_count_value = 0;
                      let value_wall_fix = 0;
                      if (lenstr_name < 1) {
                        return console.error(
                          "MessageEmbed name of field must be non-empty strings."
                        );
                      }

                      if (lenstr_name > max) {
                        let o = lenstr_name + 1;
                        let parts = max;
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
                            parts = parts + max;
                          }
                          if (i === lenstr_name) {
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
                        let liceitagain = max;
                        let see_final = parts_count_loop - 1;
                        for (let i = 0; i < parts_count_loop; i++) {
                          if (i === see_final) {
                            let neednum = i - 1;
                            let fix_another_last = arr_parts[neednum];
                            let fix_last = arr_parts[i];
                            let maketheslicefix = fields_name.slice(
                              fix_another_last,
                              fix_last
                            );

                            final_count_name = maketheslicefix.length;

                            let final_result = wall + space + maketheslicefix;
                            arr.push(final_result);
                            break;
                          }
                          let maketheslice = fields_name.slice(
                            liceit,
                            liceitagain
                          );
                          let final_result = wall + space + maketheslice;
                          arr.push(final_result);
                          liceit = liceit + max;
                          liceitagain = liceitagain + max;
                        }
                        let fields_namearr = "";
                        let see_final_arr = arr.length - 1;
                        for (let i = 0; i < arr.length; i++) {
                          if (i === see_final_arr) {
                            fields_namearr = fields_namearr + arr[i];
                            break;
                          }
                          fields_namearr = fields_namearr + arr[i] + "\n";
                        }
                        fields_name_embed = fields_namearr + "  |";
                      } else {
                        if (lenstr_name < moremax) {
                          final_count_name = lenstr_name;
                          let getspaces = max - lenstr_name;
                          if (getspaces === 0) {
                            let spacessums = space;
                            for (let i = 0; i < getspaces; i++) {
                              spacessums = spacessums + space;
                            }
                            let fields_nametoembed =
                              wall + space + fields_name + "  |";
                            fields_name_embed = fields_nametoembed;
                          } else {
                            let spacessums = "";
                            for (let i = 0; i < getspaces; i++) {
                              spacessums = spacessums + space;
                            }
                            let fields_nametoembed =
                              wall + space + fields_name + "  |";
                            fields_name_embed = fields_nametoembed;
                          }
                        }
                      }

                      fields_embed = fields_embed + fields_name_embed;

                      if (lenstr_value < 1) {
                        return console.error(
                          "MessageEmbed value of field must be non-empty strings."
                        );
                      }

                      if (lenstr_value > max) {
                        let o = lenstr_value + 1;
                        let parts = max;
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
                            parts = parts + max;
                          }
                          if (i === lenstr_value) {
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
                        let liceitagain = max;
                        let see_final = parts_count_loop - 1;
                        for (let i = 0; i < parts_count_loop; i++) {
                          if (i === see_final) {
                            let neednum = i - 1;
                            let fix_another_last = arr_parts[neednum];
                            let fix_last = arr_parts[i];
                            let maketheslicefix = fields_value.slice(
                              fix_another_last,
                              fix_last
                            );
                            final_count_value = maketheslicefix.length;
                            let final_result = wall + space + maketheslicefix;
                            arr.push(final_result);
                            break;
                          }
                          let maketheslice = fields_value.slice(
                            liceit,
                            liceitagain
                          );
                          let final_result;
                          if (value_wall_fix === 0) {
                            final_result = space + maketheslice;
                            value_wall_fix++;
                          } else {
                            final_result = wall + space + maketheslice;
                          }
                          arr.push(final_result);
                          liceit = liceit + max;
                          liceitagain = liceitagain + max;
                        }
                        let fields_valuearr = "";
                        let see_final_arr = arr.length - 1;
                        for (let i = 0; i < arr.length; i++) {
                          if (i === see_final_arr) {
                            fields_valuearr = fields_valuearr + arr[i];
                            break;
                          }
                          fields_valuearr = fields_valuearr + arr[i] + "\n";
                        }
                        fields_value_embed = fields_valuearr + "\n";
                      } else {
                        if (lenstr_value < moremax) {
                          final_count_value = lenstr_value;
                          let getspaces = max - lenstr_value;
                          if (getspaces === 0) {
                            let spacessums = space;
                            for (let i = 0; i < getspaces; i++) {
                              spacessums = spacessums + space;
                            }
                            let fields_valuetoembed = space + fields_value;
                            fields_value_embed = fields_valuetoembed + "\n";
                          } else {
                            let spacessums = "";
                            for (let i = 0; i < getspaces; i++) {
                              spacessums = spacessums + space;
                            }
                            let fields_valuetoembed = space + fields_value;
                            fields_value_embed = fields_valuetoembed + "\n";
                          }
                        }
                      }
                      let final_count_new_line =
                        final_count_name + final_count_value;
                      if (final_count_new_line < lessmax) {
                        fields_embed =
                          fields_embed +
                          fields_value_embed +
                          wall +
                          lines +
                          wall +
                          "\n";
                      } else {
                        fields_embed =
                          fields_embed +
                          "\n" +
                          wall +
                          fields_value_embed +
                          wall +
                          lines +
                          wall +
                          "\n";
                      }
                    }
                  } else {
                    return console.error(
                      "MessageEmbed fields must be a array."
                    );
                  }
                }
              }
            }
            let footer = embed.footer;
            let lenfooter;
            if (footer === null) {
              lenfooter = 0;
            } else {
              lenfooter = footer.length;
            }
            let timestamp = embed.timestamp;
            if (lentitle > 2) {
              title = "\n" + title + "\n" + wall + lines + wall;
            } else {
              title = "";
            }

            if (timestamp === null) {
              timestamp = "";
            }

            if (lenfooter > 2) {
              footer =
                wall +
                lines +
                wall +
                "\n" +
                fields_embed +
                footer +
                timestamp +
                "\n";
            } else {
              footer = "";
            }

            result_embed =
              up_l +
              lines +
              up_r +
              title +
              description +
              footer +
              down_l +
              lines +
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
