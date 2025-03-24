import User from "../../models/userManagement/User.js";

const DeactivateUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: "No user IDs provided" });
        }

        const updatedUsers = await Promise.all(
            userIds.map(async (id) => {
                const user = await User.findById(id);
                if (!user) {
                    return null;
                }
                // If the status field doesn't exist, create it and set it to false.
                user.status = false;
                await user.save();
                return user;
            })
        );

        const successfulUpdates = updatedUsers.filter(user => user !== null);

        res.status(200).json({ message: 'Users deactivated successfully', users: successfulUpdates });
    } catch (error) {
        res.status(500).json({ message: 'Error deactivating users', error: error.message });
    }
};

export default DeactivateUsers;
