import mongoose, { Schema, models } from "mongoose";

const applicationsSchema = new Schema(
    {
        description: { type: String },
        resume: {
            originalname: { type: String },
            buffer: { type: Buffer },
            encoding: { type: String },
            mimetype: { type: String },
            size: { type: Number },
        },
        // references: {
        //     url: { type: String },
        //     params: [{ type: String }],
        //     id: { type: String },
        //     slug: { type: String },
        //     link: { type: String },
        //     ref: { type: String }
        // },
        // ip: { type: String },
        // city: { type: String },
        // country_name: { type: String },
        // region_name: { type: String },
        // zip_code: { type: String },
        // latitude: { type: Number },
        // longitude: { type: Number },
        // country_code: { type: String }
    },
    { timestamps: true }
);

const Applications = models.Application || mongoose.model("Application", applicationsSchema);
export default Applications;
