// examensarbete-arlanda/arlanda-mx/app/pages/api/events.js
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: String,
    date: Date,
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

const handler = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect('mongodb://localhost:27017/yourdbname', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    const events = await Event.find({});
    res.status(200).json(events);
};

export default handler;