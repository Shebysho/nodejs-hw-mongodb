import { getAllContactsService, getContactByIdService } from '../services/contacts.js'; 

export const getAllContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContactsService();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error); 
  }
};
export const getContactByIdController = async (req, res, next) => {
    try {
      const { contactId } = req.params; 
      const contact = await getContactByIdService(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' }); 
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  };