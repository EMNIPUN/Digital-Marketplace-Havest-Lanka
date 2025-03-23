import express from 'express';
import mongoose from 'mongoose';
import User from '../../../models/userManagement/User.js';

const PieChartData = async (req, res) => {
    try {
        const accounts = await User.find();
        const percentages = calcFvS(accounts);

        res.status(200).json(percentages);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const calcFvS = (accounts) => {
    const total = accounts.length;

    if (total === 0) {
        return { farmerPercentage: 0, shopOwnerPercentage: 0, driverPercentage: 0 };
    }

    const farmerCount = accounts.filter(acc => acc.role === 'farmer').length;
    const shopOwnerCount = accounts.filter(acc => acc.role === 'shopowner').length;
    const driverCount = accounts.filter(acc => acc.role === 'driver').length;

    const farmerPercentage = ((farmerCount / total) * 100).toFixed(2);
    const shopOwnerPercentage = ((shopOwnerCount / total) * 100).toFixed(2);
    const driverPercentage = ((driverCount / total) * 100).toFixed(2);

    return { farmerPercentage, shopOwnerPercentage, driverPercentage };
};

export default PieChartData;
