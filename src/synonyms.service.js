export const getSynonyms = async(word) => {
    const resp = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);

    return resp.json();
}