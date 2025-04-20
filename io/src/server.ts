// io/src/server.ts
import { Server } from "socket.io";
import config from 'config';

const port = config.get<number>('io.port');

const io = new Server({
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    console.log('got a new connection');

    // Vacation events
    socket.on('newVacation', (data) => {
        console.log('New vacation added:', data);
        io.emit('newVacation', data);
    });

    socket.on('vacationUpdated', (data) => {
        console.log('Vacation updated:', data);
        io.emit('vacationUpdated', data);
    });

    socket.on('vacationDeleted', (data) => {
        console.log('Vacation deleted:', data);
        io.emit('vacationDeleted', data);
    });

    // Tag events
    socket.on('vacationTagged', (data) => {
        console.log('Vacation tagged:', data);
        io.emit('vacationTagged', data);
    });

    socket.on('vacationUntagged', (data) => {
        console.log('Vacation untagged:', data);
        io.emit('vacationUntagged', data);
    });

    // General forwarding of events (optional, for development)
    socket.onAny((eventName, payload) => {
        console.log(`received event ${eventName} with payload`, payload);
        // Only forward events that aren't already handled specifically
        if (!['newVacation', 'vacationUpdated', 'vacationDeleted',
            'vacationTagged', 'vacationUntagged'].includes(eventName)) {
            io.emit(eventName, payload);
        }
    });

    socket.on('disconnect', () => {
        console.log('client disconnected...');
    });
});

io.listen(port);
console.log(`io server started on ${port}`);