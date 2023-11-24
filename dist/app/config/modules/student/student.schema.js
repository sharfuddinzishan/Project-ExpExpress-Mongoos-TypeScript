"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    id: { type: String },
    name: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
    },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String },
        motherContactNo: { type: String },
    },
    localGuardian: {
        name: { type: String, required: true },
        occupation: { type: String },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
    },
    isActive: { type: String, required: true },
    profileImg: { type: String },
});
