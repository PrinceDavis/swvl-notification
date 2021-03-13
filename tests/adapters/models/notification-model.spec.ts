import {database} from '../../../src/adapters/database';
import {NotificationModel} from '../../../src/adapters/models/notification';
import { UserModel } from '../../../src/adapters/models/user';

describe('User model', () => {

    beforeAll(async() => {
        await database.sync({force: true});
    });

    test('can insert new user into the database', async (done) => {
        const user = await UserModel.create({
            deviceId: 'hdaheahfani1233',
            messagePreference: 'sms',
            userType: 'passenger',
            phone: '977437839373',
        });
        const notification = await NotificationModel.create({
            recipientId: user.id,
            lastRecipientId: user.id,
            recipientType: "passenger",
            message: "$199 promo code is yours!",
        });
        const result = await NotificationModel.findOne({ 
            where: { id: notification.id, }, 
            include: ['recipient'] 
        });
        expect(result.recipient.messagePreference).toEqual(user.messagePreference);
        expect(result.lastRecipientId).toEqual(notification.lastRecipientId);
        expect(result.recipientType).toEqual(notification.recipientType);
        expect(result.recipientId).toEqual(notification.recipientId);
        expect(result.recipient.deviceId).toEqual(user.deviceId);
        expect(result.recipient.userType).toEqual(user.userType);
        expect(result.message).toEqual(notification.message);
        expect(result.recipient.phone).toEqual(user.phone);
        expect(result.multipleRecipient).toBe(false);
        expect(result.status).toBe("scheduled");
        done()
    });
})