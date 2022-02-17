const catchAsync = require("../../../utils/catchAsync");
const PoliceContact = require("../../../models/PoliceContacts");
const factory = require("../../../controllers/handlerFactory");

exports.getAllContacts = factory.getAll(PoliceContact);
exports.getContact = factory.getOne(PoliceContact);
exports.createContact = factory.createOne(PoliceContact);
exports.updateContact = factory.updateOne(PoliceContact);
exports.deleteContact = factory.deleteOne(PoliceContact);

exports.getNearbyContacts = catchAsync(async (req, res, next) => {});
