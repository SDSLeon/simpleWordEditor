import { observable, action, decorate } from "mobx";
import { getSynonyms } from './synonyms.service'

class Synonyms {
    list = observable.array([]);

    fetchSynonyms = async (word) => {
        const synonyms = await getSynonyms(word.replace(/(\.|,|!|\?)/g, ''));

        this.setSynonyms(synonyms.map(({word}) => word))
    }

    setSynonyms(synonyms) {
        this.list.replace(synonyms);
    }
}

decorate(Synonyms, {
    list: observable,
    setSynonyms: action.bind()
});

const singleton = new Synonyms();

export default singleton;
