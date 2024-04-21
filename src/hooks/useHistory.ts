import { Database } from "../utils/db";
import { useDexieLiveQuery } from "./useDexie";
import { computed, ref } from "vue";
const db = new Database();

export function useHistory() {
    const searchText = ref('');
    function setHistory(value: string) {
        db.setHistory(value);
    }

    function onSearch(text: string) {
        searchText.value = text;
    }

    //     const historyData = useObservable(
    //     from(
    //         liveQuery(async () => {
    //             return (await db.history.toArray()).reverse();
    //         })
    //     )
    // );

    const historyData = useDexieLiveQuery(
        () => db.history.limit(50).toArray(),
        { initialValue: [] }
    );

    const list = computed(() => historyData.value.reverse().filter((it) => (!searchText) || it.text.includes(searchText.value)));
    return {
        historyData: list,
        setHistory,
        onSearch,
        searchText,
    }
}