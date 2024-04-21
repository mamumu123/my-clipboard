import Dexie from 'dexie';

export class Database extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instantiated by Dexie in stores() method)
    history!: Dexie.Table<IHistory, number>; // number = type of the primkey
    //...other tables goes here...

    constructor() {
        super("Database");
        this.version(1).stores({
            history: '++id, text',
        });
    }

    getHistory() {
        return this.history.toArray();
    }

    setHistory(text: string) {
        // 先找到是不是存在，存在的话，就删除，然后放到第一个。
        const oldFilter = this.history.filter((item) => item.text === text);
        oldFilter.toArray().then((items) => {
            items.forEach((item) => {
                if (item.id) {
                    this.history.delete(item.id);
                }
            })
        });

        this.history.add({ text: text })
    }
}

export interface IHistory {
    id?: number,
    text: string
}