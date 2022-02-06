import { ListIterator } from './list.iterator';

export class List<T> implements Iterable<T> {

    protected items: T[] = [];

    [Symbol.iterator](): Iterator<T> {
        return new ListIterator<T>(this);
    }

    public get length(): number {
        return this.items.length;
    }

    public get isEmpty(): boolean {
        return this.length == 0;
    }

    public get isNotEmpty(): boolean {
        return this.length != 0;
    }

    public static from<T>(items: Iterable<T>): List<T> {
        let list = new List<T>();
        for(let item of items){
            list.add(item);
        }

        return list;
    }

    public get(index: number): T {

        if(index < 0 || index > this.length) {
            throw Error("Index out of range");
        }

        return this.items[index];
    }

    public toArray(): T[] {
        return this.items;
    }

    public add(item: T): void {
        this.items.push(item);
    }

    public addRange(items: Iterable<T>): void {
        for (let item of items){
            this.add(item);
        }
    }

    public clear(): void {
        this.items = [];
    }

    public contains(item: T): boolean {
        return this.items.includes(item);
    }

    public find(predicate: (item: T, index: number) => boolean): T | undefined {
        return this.items.find(predicate);
    }

    public findIndex(predicate: (item: T, index: number) => boolean): number {

        for (let i:number = 0; i < this.length; i++) {
            if (predicate(this.items[i], i)) {
                return i;
            }
        }

        return -1;
    }

    public findLast(predicate: (item: T, index: number) => boolean): T | null {

        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this.items[i], i)) {
                return this.items[i];
            }
        }

        return null;
    }

    public findLastIndex(predicate: (item: T, index: number) => boolean): number {

        for (let i:number = this.length - 1; i >= 0; i--) {
            if (predicate(this.items[i], i)) {
                return i;
            }
        }

        return -1;
    }

    public indexOf(item: T): number {
        return this.findIndex(i => i == item);
    }

    public lastIndexOf(item: T): number {
        return this.findLastIndex(i => i == item);
    }

    public forEach(action: (item: T, index: number, list: List<T>) => void): void {
        for (let i: number = 0; i < this.length; i++) {
            action(this.items[i], i, this);
        }
    }

    //shallow copy
    public getRange(startInclusive: number, endExclusive:number): List<T> {

        if (startInclusive < 0 || startInclusive > this.length) {
            throw Error("Index out of range. Parameter: startInclusive");
        }

        if (endExclusive < 0 || endExclusive > this.length) {
            throw Error("Index out of range. Parameter: endExclusive");
        }

        if (startInclusive > endExclusive) {
            throw Error("Invalid argument. Parameter startInclusive has to be smaller than endExclusive");
        }

        return List.from(this.items.slice(startInclusive, endExclusive));
    }

    public insertAt(index: number, item: T): List<T> {

        if (index < 0 || index > this.length) {
            throw Error("Index out of range. Parameter: index");
        }

        this.items.splice(index, 0, item);
        return this;
    }

    public insertRange(index: number, items: List<T>): List<T> {

        if (index < 0 || index > this.length) {
            throw Error("Index out of range. Parameter: index");
        }

        let newList: List<T> = new List<T>();
        if (index > this.length) {
            index = this.length;
        }

        for (let i = 0; i < index; i++) {
            newList.add(this.items[i]);
        }

        items.forEach(item => newList.add(item));

        for (let i = index; i < this.length; i++) {
            newList.add(this.items[i]);
        }

        this.items =  newList.items;
        return this;
    }

    public remove(item: T): List<T> {
        let index: number = this.indexOf(item);

        if (index != -1) {
            this.items.splice(index, 1);
        }

        return this;
    }

    public removeAll(predicate: (item: T, index: number) => boolean): List<T> {
        let items: List<T> =  this.where(predicate);

        for (let item of items) {
            this.remove(item);
        }

        return this;
    }

    public removeAt(index: number): List<T> {

        if(index < 0 || index > this.length) {
            throw Error("Index out of range. Parameter: index");
        }

        this.items.splice(index, 1);
        return this;
    }

    public removeRange(startIndex: number, count: number): List<T> {

        if(startIndex < 0 || startIndex > this.length) {
            throw Error("Index out of range. Parameter: startIndex");
        }

        this.items.splice(startIndex, count);
        return this;
    }

    public sort(): List<T> {
        this.items.sort();
        return this;
    }

    public sortByNumberField(selector: (item: T) => number): List<T> {
        this.items.sort((a, b) => selector(a) - selector(b));
        return this;
    }

    public sortByNumberFieldDesc(selector: (item: T) => number): List<T> {
        this.items.sort((a, b) => selector(b) - selector(a));
        return this;
    }

    public sortByStringField(selector: (item: T) => string): List<T> {
        this.items.sort((a, b) => selector(a).localeCompare(selector(b)));
        return this;
    }

    public sortByStringFieldReversed(selector: (item: T) => string): List<T> {
        this.items.sort((a, b) => selector(b).localeCompare(selector(a)));
        return this;
    }

    public sortByDateField(selector: (item: T) => Date): List<T> {
        this.items.sort((a, b) => selector(a).getTime() - selector(b).getTime());
        return this;
    }

    public sortByDateFieldDesc(selector: (item: T) => Date): List<T> {
        this.items.sort((a, b) => selector(b).getTime() - selector(a).getTime());
        return this;
    }

    public sortByBooleanField(selector: (item: T) => boolean): List<T> {
        this.items.sort((a, b) => selector(a) ? 1 : -1);
        return this;
    }

    public sortByBooleanFieldDesc(selector: (item: T) => boolean): List<T> {
        this.items.sort((a, b) => selector(a) ? -1 : 1);
        return this;
    }

    public sortCustom(comparison: (a: T, b: T) => number): List<T> {
        this.items.sort(comparison);
        return this;
    }

    public all(predicate: (item: T, index: number) => boolean): boolean {
        return this.items.every(predicate);
    }

    public any(predicate: (item: T, index: number) => boolean): boolean {
        return this.items.some(predicate);
    }

    public where(predicate: (item: T, index: number) => boolean): List<T> {
        return List.from(this.items.filter(predicate));
    }

    public select<U>(mapping: (item: T, index: number) => U): List<U> {
        return List.from(this.items.map(mapping));
    }

    public aggregateWithInitial<A>(initialValue: A, func: (accumulated: A, next: T) => A): A {

        let current: A = initialValue;
        this.forEach(item => {
            current = func(current, item);
        });

        return current;
    }

    public aggregate(func: (accumulated: T, next: T) => T): T {

        let accumulated: T = this.items[0];
        for (let i:number = 1; i < this.length; i++) {
            accumulated = func(accumulated, this.get(i));
        }

        return accumulated;
    }

    public distinct(): List<T> {
        let set: Set<T> = new Set(this.items);
        let list: List<T> = new List();
        set.forEach(elem => list.add(elem));
        return list;
    }

    public distinctCustom(areEqual: (item1: T, item2: T) => boolean): List<T> {
        let list: List<T> = new List();

        this.forEach(item => {
            if (list.findIndex(elem => areEqual(elem, item)) == -1) {
                list.add(item);
            }
        });

        return list;
    }

    public distinctBy<U>(selector: (item: T) => U): List<T> {
        let list: List<T> = new List();
        this.forEach(item => {
            if (list.findIndex(elem => selector(elem) == selector(item)) == -1) {
                list.add(item);
            }
        });

        return list;
    }

    public max(comparison: (a: T, b: T) => number): T {
        let max: T = this.get(0);

        for (let i = 1; i < this.length; i++) {
            if (comparison(this.get(i), max) > 0) {
                max = this.get(i);
            }
        }

        return max;
    }

    public maxByField(selector: (item: T) => number): T {
        return this.max((a, b) => selector(a) - selector(b));
    }

    public min(comparison: (a: T, b: T) => number): T {
        let min: T = this.get(0);

        for (let i = 1; i < this.length; i++) {
            if (comparison(this.get(i), min) < 0) {
                min = this.get(i);
            }
        }

        return min;
    }

    public minByField(selector: (item: T) => number): T {
        return this.min((a, b) => selector(a) - selector(b));
    }

    public reverse(): List<T> {
        let list: List<T> = new List<T>();

        for (let i = this.length - 1; i >= 0; i--) {
            list.add(this.get(i));
        }

        return list;
    }
}
