import { List } from "./list";

export class ListIterator<T> implements Iterator<T> {

    public constructor(private list: List<T>) { }

    private pointer = 0;

    public next(): IteratorResult<T> {
        if (this.pointer < this.list.length) {
            return {
                done: false,
                value: this.list.get(this.pointer++)
            }
        }
        else {
            return {
                done: true,
                value: null
            }
        }
    }
}
