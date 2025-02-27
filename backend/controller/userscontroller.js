import { UserProfile } from '../models/userprofilemodel.js';
import { User } from '../models/usersmodel.js'; // Assuming you have a User model
import { sequelize } from '../database/db.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const getUserById = async (req, res) => {
  try {
      const userId = parseInt(req.params.id);  // Convert string to integer
      if (isNaN(userId)) {
          return res.status(400).json({ error: "Invalid user ID" });  // Handle invalid input
      }

      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
    const userId = req.params.id;

    try {
      // Start a transaction
      await pool.query('BEGIN');
  
      // Delete related records in the UserProfiles table
      await pool.query('DELETE FROM "UserProfiles" WHERE "userId" = $1', [userId]);
  
      // Delete the user from the Users table
      await pool.query('DELETE FROM "Users" WHERE "id" = $1', [userId]);
  
      // Commit the transaction
      await pool.query('COMMIT');
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      // Rollback the transaction in case of an error
      await pool.query('ROLLBACK');
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json({ message: 'User updated successfully', user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Start a transaction
        await sequelize.transaction(async (transaction) => {
            // Delete related records in the UserProfiles table
            await UserProfile.destroy({ where: { userId }, transaction });

            // Delete the user from the Users table
            const user = await User.findByPk(userId, { transaction });
            if (user) {
                await user.destroy({ transaction });
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user contains the authenticated user's information
        const userProfile = await UserProfile.findOne({ where: { userId } });
        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }

        res.json({
            profilePic: userProfile.profilePic,
            fullName: userProfile.fullName,
            email: userProfile.email,
            phone: userProfile.phone,
            gender: userProfile.gender,
            address: userProfile.address
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user contains the authenticated user's information
        const { fullName, email, phone, gender, address } = req.body;
        const profilePic = req.file ? req.file.path : null;

        const userProfile = await UserProfile.findOne({ where: { userId } });
        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }

        userProfile.fullName = fullName || userProfile.fullName;
        userProfile.email = email || userProfile.email;
        userProfile.phone = phone || userProfile.phone;
        userProfile.gender = gender || userProfile.gender;
        userProfile.address = address || userProfile.address;
        if (profilePic) {
            userProfile.profilePic = profilePic;
        }

        await userProfile.save();

        res.json({ message: "Profile updated successfully", profilePic: userProfile.profilePic });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const makeUserAdmin = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.isAdmin = true;
            await user.save();
            res.status(200).json({ message: 'User is now an admin', user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error making user admin:', error);
        res.status(500).json({ error: 'Failed to make user admin' });
    }
};