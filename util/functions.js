const { Buttons } = require("whatsapp-web.js");
const isPhone = require("is-phone");

exports.awaitMessage = async function (client, timeout = time, from = null) {
  return new Promise((resolve) => {
    client.on("message_create", (message) => {
      if (typeof from == "string") {
        if (message.author === from || message.from === from) resolve(message);
      } else {
        resolve(message);
      }
    });

    setTimeout(() => resolve(false), timeout);
  });
};

exports.eesend = function ({ client, number, embed, button }) {
  if (typeof client === "object") {
    if (typeof number === "string") {
      let checkisreal = number.split("@");
      let checknumber = checkisreal[0];
      let checkid = checkisreal[1];
      let checknumbernpm = isPhone(checknumber);
      if (checknumbernpm === false) {
        throw new TypeError("You must pass a valid number");
      }
      if (!(checkid === "c.us")) {
        throw new TypeError("You must pass a valid number");
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
              size_embed === undefined ||
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
              size_embed === undefined ||
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
            throw new TypeError("MessageEmbed need description to work.");
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
                      throw new TypeError(
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
                      throw new TypeError(
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
                  throw new TypeError("MessageEmbed fields must be a array.");
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
          if (Array.isArray(button) === false) {
            throw new TypeError("Button/s can only be passed by array.");
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
            let size_embed = embed.px;
            let max = 28;
            if (
              !(
                size_embed === null ||
                size_embed === undefined ||
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
                size_embed === undefined ||
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
              throw new TypeError("MessageEmbed need description to work.");
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
                        throw new TypeError(
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
                        throw new TypeError(
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
                    throw new TypeError("MessageEmbed fields must be a array.");
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
