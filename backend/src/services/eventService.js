import Event from '../models/Event.js';

export const createNewEvent = async (eventData, userId) => {
    const { title, description, date, location } = eventData;

    const duplicate = await Event.findOne({ title, createdBy: userId });
    if (duplicate) {
        throw new Error('An event with this title already exists for you');
    }

    const event = new Event({
        title,
        description,
        date,
        location,
        createdBy: userId
    });

    return await event.save();
};

export const getUserEvents = async (userId) => {
    return await Event.find({ createdBy: userId }).sort({ date: 1 });
};

export const deleteUserEvent = async (eventId, userId) => {
    const event = await Event.findById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }

    if (event.createdBy.toString() !== userId.toString()) {
        throw new Error('Not authorized to delete this event');
    }

    await event.deleteOne();
    return { message: 'Event deleted' };
};

export const getPublicEventById = async (eventId) => {
    const event = await Event.findById(eventId).populate('createdBy', 'name');
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};
