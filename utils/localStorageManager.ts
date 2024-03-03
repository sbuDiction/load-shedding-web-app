export type Subscription = {
    sid: string
}
export default class LocalStorageManager {
    static saveSubuscription = (subscription: Subscription) => new Promise((resolve) => {
        const store = localStorage.getItem('store');
        if (!store) {
            localStorage.setItem('store', JSON.stringify([subscription]));
            resolve('Adding to Store');
        } else {
            const subscriptions: Subscription[] = JSON.parse(store);
            const isExists = subscriptions.find(sub => sub.sid === subscription.sid);
            if (!isExists) {
                subscriptions.push(subscription);
                localStorage.setItem('store', JSON.stringify(subscriptions));
                resolve('Updating Store');
            }
            resolve('Already subscribed')
        }
    })

    static getSubscriptions = () => {
        const store = localStorage.getItem('store');
        if (store) {
            const subscriptions: Subscription[] = JSON.parse(store);
            return subscriptions;
        }
        return [];
    }

}