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
