import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const checkContactOwner = async (req, res, next) => {
  const { user } = req;
  const { contactId } = req.params;

  if (!user) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  if (!contactId) {
    return next(createHttpError(400, 'Contact ID is required'));
  }

  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId: user._id,
  });

  if (!contact) {
    return next(createHttpError(403, 'Access forbidden'));
  }

  next();
};
