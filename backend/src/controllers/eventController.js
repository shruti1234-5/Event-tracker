import * as eventService from '../services/eventService.js';

export const createEvent = async (req, res) => {
    try {
        const event = await eventService.createNewEvent(req.body, req.user._id);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getMyEvents = async (req, res) => {
    try {
        const events = await eventService.getUserEvents(req.user._id);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const result = await eventService.deleteUserEvent(req.params.id, req.user._id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPublicEvent = async (req, res) => {
    try {
        const event = await eventService.getPublicEventById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
