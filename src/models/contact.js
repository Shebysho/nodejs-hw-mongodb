import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        favorite: { type: Boolean, default: false },
    },
    { versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
