const { Schema, model } = require("mongoose");

const chatBotSchema = new Schema({
    Guild: String,
    Channel: String
});

module.exports = model("chatbot_settings", chatBotSchema);