import mongoose from "mongoose";
import { userSchema } from "../models/publicUserModel.js";
import { masterSchema } from "../models/masterModel.js";

export const publicUserDb = async () => {
    const db = await mongoose.connection.useDb(`public_db`, {
        useCache: true
    });

    if (!db.models['User']) {
        db.model("User", userSchema);
    }
    const userModel = db.model("User")

    return userModel
}



export const adminMasterModel = async () => {
    const db = await mongoose.connection.useDb(`admin`, {
        useCache: true
    });

    if (!db.models['Master']) {
        db.model("Master", masterSchema);
    }
    const masterModel = db.model("Master")

    return masterModel
}

export const adminUserModel = async () => {
    const db = await mongoose.connection.useDb(`admin`, {
        useCache: true
    });

    if (!db.models['User']) {
        db.model("User", userSchema);
    }
    const userModel = db.model("User")

    return userModel
}

export const masterUserModel = async (masterId) => {
    const db = await mongoose.connection.useDb(`tenant_${masterId}`, {
        useCache: true
    });

     if (!db.models['User']) {
        db.model("User", userSchema);
    }
    const userModel = db.model("User")

    return userModel
}