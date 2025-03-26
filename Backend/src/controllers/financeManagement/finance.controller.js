import Transaction from "../../models/financeManagement/Transaction.js";

const getTransactions = async (req, res) => {
   try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
   } catch (error) {
      res.status(500).json({ message: "Error fetching transactions", error });
   }
};

// 2. Add a new transaction
const addTrasaction = async (req, res) => {
   try {
      const { userid, type, category, amount, date, description } = req.body;
      const newTransaction = new Transaction({
         userid,
         type,
         category,
         amount,
         date,
         description,
      });
      await newTransaction.save();
      res.status(201).json(newTransaction);
   } catch (error) {
      res.status(500).json({ message: "Error adding transaction", error });
   }
};

// 3. Update a transaction
const updatedTrans = async (req, res) => {
   try {
      const { id } = req.params;
      const { type, category, amount, date, description } = req.body;
      const updatedTransaction = await Transaction.findByIdAndUpdate(
         id,
         { type, category, amount, date, description },
         { new: true } // Return the updated document
      );
      if (!updatedTransaction) {
         return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(updatedTransaction);
   } catch (error) {
      res.status(500).json({ message: "Error updating transaction", error });
   }
};

// 4. Delete a transaction
const deletedTrans = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
      if (!deletedTransaction) {
         return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json({ message: "Transaction deleted successfully" });
   } catch (error) {
      res.status(500).json({ message: "Error deleting transaction", error });
   }
};

export default { getTransactions, addTrasaction, updatedTrans, deletedTrans };
