import express from 'express'
import mongoose, { mongo } from 'mongoose'

const CriticalAlertsSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('CriticalAlerts', CriticalAlertsSchema)