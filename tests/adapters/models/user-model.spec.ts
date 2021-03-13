import {UserModel} from '../../../src/adapters/models/user';
import {database} from '../../../src/adapters/database';

describe('User model', () => {

    beforeAll(async() => {
        await database.sync({force: true});
    });

    test('can insert new user into the database', async (done) => {
        const tg = await UserModel.create({
            deviceId: 'hdaheahfani1233',
            messagePreference: 'sms',
            userType: 'passenger',
            phone: '977437839373',
        });
        const user = await UserModel.findOne({ where: { id: tg.id } });
        expect(tg.messagePreference).toEqual(user?.messagePreference);
        expect(tg.deviceId).toEqual(user?.deviceId);
        expect(tg.userType).toEqual(user?.userType);
        expect(tg.phone).toEqual(user?.phone);
        done()
    });
})