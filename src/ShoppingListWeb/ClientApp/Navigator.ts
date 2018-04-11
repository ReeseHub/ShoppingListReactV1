
import { createBrowserHistory, History } from 'history';

export class Navigator{

    static history: History;

    public static setHistory  (historyItem: History){

        this.history = historyItem;
    }

    public static navigateTo(url: string) {

        this.history.push(url);
    }

    public static getHistory() : History {
        return this.history;
    }

}

