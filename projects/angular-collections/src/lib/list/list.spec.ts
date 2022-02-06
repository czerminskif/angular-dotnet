import { List } from "./list";

describe("List of numbers", () => {

    let list: List<number>;

    beforeEach(() => {
        list = new List<number>();
        list.add(8);
        list.add(10);
        list.add(3);
        list.add(-5);
    });

    it("after addRange() of array list contains all added elements", () =>
    {
        let array: number[] = [2, 3, 5];
        list.addRange(array);

        expect(list).toContain(8);
        expect(list).toContain(10);
        expect(list).toContain(3);
        expect(list).toContain(-5);

        expect(list).toContain(2);
        expect(list).toContain(3);
        expect(list).toContain(5);

        expect(list.length).toEqual(7);
    });

    it("getRange() can return center part of list", () =>{

        let result: List<number> = list.getRange(1, 3);

        expect(result).toContain(10, result);
        expect(result).toContain(3, result);

        expect(result.length).toEqual(2);

    });

    it("getRange() return whole list if 0 and list.length provided", () =>{

        let result: List<number> = list.getRange(0, list.length);

        expect(result.length).toEqual(4);

    });

    it("indexOf() can find number", () =>{

        let result: number = list.indexOf(-5);

        expect(result).toEqual(3);

    });

    it("insert() really inserts item at right position", () =>{

        list.insertAt(2, 99);

        expect(list.get(2)).toEqual(99);
        expect(list.length).toEqual(5);

    });

    it("insert() can insert at beggining", () =>{

        list.insertAt(0, 99);

        expect(list.get(0)).toEqual(99);
        expect(list.length).toEqual(5);

    });

    it("insert() can insert at the end", () =>{

        list.insertAt(list.length, 99);

        expect(list.get(list.length-1)).toEqual(99);
        expect(list.length).toEqual(5);

    });

    it("insertRange() can insert at rigth position", () =>{

        list.insertRange(2, List.from([98, 99]));

        expect(list.get(2)).toEqual(98);
        expect(list.get(3)).toEqual(99);
        expect(list.length).toEqual(6);

    });

    it("remove() removes right element", () =>{

        list.remove(3);

        expect(list.get(0)).toEqual(8);
        expect(list.get(1)).toEqual(10);
        expect(list.get(2)).toEqual(-5);

        expect(list.length).toEqual(3);

    });

    it("remove() does nothing if there is no such elem in list", () =>{

        list.remove(99);

        expect(list.get(0)).toEqual(8);
        expect(list.get(1)).toEqual(10);
        expect(list.get(2)).toEqual(3);
        expect(list.get(3)).toEqual(-5);

        expect(list.length).toEqual(4);

    });

    it("sortCustom() sort numbers by given comparison func", () =>{

        list.sortCustom((a, b) => Math.abs(a) - Math.abs(b));

        expect(list.get(0)).toEqual(3);
        expect(list.get(1)).toEqual(-5);
        expect(list.get(2)).toEqual(8);
        expect(list.get(3)).toEqual(10);

        expect(list.length).toEqual(4);

    });

    it("aggregateWithInitial() can e.g. sum all elements", () =>{

        let sum: number  = list.aggregateWithInitial(0, (agg, next) => agg + next);

        expect(sum).toEqual(10 + 8 + 3 - 5);

    });

    it("aggregate() can e.g. be used to calculate sum of all positive elements", () =>{

        let avg: number  = list.aggregate((agg, next) => next > 0 ? agg + next : agg);

        expect(avg).toEqual(10 + 8 + 3);

    });

    it("disctint() returns array without duplicates", () =>{

        list.add(8);
        list.add(8);
        list.add(-5);

        let result: List<number> = list.distinct();

        expect(result.length).toEqual(4);
    });

    it("maxByField() returns biggest elem", () =>{
        let result: number = list.maxByField(elem => elem);

        expect(result).toEqual(10);
    });

    it("max() returns item that is biggest in terms of given comparison func", () =>{
        list.add(-99);

        let result: number = list.max((a, b) => Math.abs(a) - Math.abs(b));

        expect(result).toEqual(-99);
    });

    it("reverse() returns reversed list", () =>{
        let result: List<number> = list.reverse();

        expect(result.get(0)).toEqual(-5);
        expect(result.get(1)).toEqual(3);
        expect(result.get(2)).toEqual(10);
        expect(result.get(3)).toEqual(8);

        expect(result.length).toEqual(4);
    });
});

describe("List of objects", () => {

    let list: List<any>;
    let first: any = {value: 8, name: "bb", date: new Date(Date.UTC(1999, 10, 10, 5, 49)), bool: true };
    let second: any = {value: 10, name: "a", date: new Date(Date.UTC(1999, 10, 10, 5, 50)), bool: false };
    let third: any = {value: 3, name: "ccc", date: new Date(Date.UTC(1999, 10, 10, 5, 48)), bool: false };
    let fourth: any = {value: -5, name: "dddd", date: new Date(Date.UTC(2001, 10, 10, 5, 49)), bool: true };

    beforeEach(() => {
        list = new List<number>();
        list.add(first);
        list.add(second);
        list.add(third);
        list.add(fourth);
    });

    it("indexOf() find right elem", () =>
    {
        let result: any = list.indexOf(third);

        expect(result).toEqual(2);
    });

    it("remove() removes right elem", () =>
    {
        list.remove(third);

        expect(list.get(0)).toEqual(first);
        expect(list.get(1)).toEqual(second);
        expect(list.get(2)).toEqual(fourth);

        expect(list.length).toEqual(3);

    });

    it("sortByNumberField() sorts in asc order", () =>
    {
        list.sortByNumberField(item => item.value);

        expect(list.get(0)).toEqual(fourth);
        expect(list.get(1)).toEqual(third);
        expect(list.get(2)).toEqual(first);
        expect(list.get(3)).toEqual(second);

        expect(list.length).toEqual(4);

    });

    it("sortByDateField() sorts in asc order", () =>
    {
        list.sortByDateField(item => item.date);

        expect(list.get(0)).toEqual(third);
        expect(list.get(1)).toEqual(first);
        expect(list.get(2)).toEqual(second);
        expect(list.get(3)).toEqual(fourth);

        expect(list.length).toEqual(4);

    });

    it("sortByDateFieldDesc() sorts in desc order", () =>
    {
        list.sortByDateFieldDesc(item => item.date);

        expect(list.get(0)).toEqual(fourth);
        expect(list.get(1)).toEqual(second);
        expect(list.get(2)).toEqual(first);
        expect(list.get(3)).toEqual(third);

        expect(list.length).toEqual(4);

    });

    it("sortByBooleanField() sorts in desc order", () =>
    {
        list.sortByBooleanField(item => item.bool);

        expect(list.get(0)).toEqual(third);
        expect(list.get(1)).toEqual(second);
        expect(list.get(2)).toEqual(first);
        expect(list.get(3)).toEqual(fourth);

        expect(list.length).toEqual(4);

    });

    it("sortByBooleanFieldDesc() sorts in desc order", () =>
    {
        list.sortByBooleanFieldDesc(item => item.bool);

        expect(list.get(0)).toEqual(fourth);
        expect(list.get(1)).toEqual(first);
        expect(list.get(2)).toEqual(second);
        expect(list.get(3)).toEqual(third);

        expect(list.length).toEqual(4);

    });

    it("sortByStringField() sorts in asc alphanumeric order", () =>
    {
        list.sortByStringField(item => item.name);

        expect(list.get(3)).toEqual(fourth);
        expect(list.get(2)).toEqual(third);
        expect(list.get(1)).toEqual(first);
        expect(list.get(0)).toEqual(second);

        expect(list.length).toEqual(4);

    });

    it("disctinct() returns list without duplicates (comparing by reference)", () =>
    {
        list.add(first);
        list.add(second);

        let result: List<any> = list.distinct();

        expect(result).toContain(first);
        expect(result).toContain(second);
        expect(result).toContain(third);
        expect(result).toContain(fourth);

        expect(result.length).toEqual(4);

    });

    it("disctinct() does not count indentical objects as duplicate if this is not the same object in terms of reference", () =>
    {
        list.add({value: first.value, name: first.name});

        let result: List<any> = list.distinct();

        expect(result).toContain(first);
        expect(result).toContain(second);
        expect(result).toContain(third);
        expect(result).toContain(fourth);

        expect(result.length).toEqual(5);

    });

    it("disctinctBy() works", () =>
    {
        list.add({value: first.value, name: first.name});

        let result: List<any> = list.distinctBy(e => e.value);

        expect(result).toContain(first);
        expect(result).toContain(second);
        expect(result).toContain(third);
        expect(result).toContain(fourth);

        expect(result.length).toEqual(4);

    });

    it("maxByField() returns max elem by numeric 'value' field", () =>
    {
        let max: any = list.maxByField(elem => elem.value);

        expect(max).toEqual(second);

    });

});


describe("Optional parameters test", () => {

    let list: List<number>;

    beforeEach(() => {
        list = new List<number>();
        list.add(8);
        list.add(10);
        list.add(3);
        list.add(-5);
    });

    function isEven(n: number): boolean {
        return n % 2 == 0;
    }

    function isEvenAndEvenIndex(n: number, index: number): boolean {
        return n % 2 == 0 && index % 2 == 0;
    }

    it("where() with only one parameter", () =>
    {
        let result: List<number> = list.where(isEven);

        expect(result).toContain(8);
        expect(result).toContain(10);

        expect(result.length).toEqual(2);
    });

    it("where() with two parameters", () =>
    {
        let result: List<number> = list.where(isEvenAndEvenIndex);

        expect(result).toContain(8);

        expect(result.length).toEqual(1);
    });

});

describe("Can iterate over List", () => {

    it("Can iterate over number list", () =>
    {
        let list: List<number>;
        list = new List<number>();
        list.add(8);
        list.add(10);
        list.add(3);
        list.add(-5);

        let result: List<number> = new List();

        for(let n of list) {
            result.add(n);
        }

        expect(result).toContain(8);
        expect(result).toContain(10);
        expect(result).toContain(3);
        expect(result).toContain(-5);

        expect(result.length).toEqual(4);
    });

    it("Can iterate over object list", () =>
    {
        let list: List<any> = new List<number>();
        let first: any = {value: 8, name: "bb"};
        let second: any = {value: 10, name: "a"};
        let third: any = {value: 3, name: "ccc"};
        let fourth: any = {value: -5, name: "dddd"};

        list.add(first);
        list.add(second);
        list.add(third);
        list.add(fourth);

        let result: List<any> = new List();

        for(let n of list) {
            result.add(n);
        }

        expect(result).toContain(first);
        expect(result).toContain(second);
        expect(result).toContain(third);
        expect(result).toContain(fourth);

        expect(result.length).toEqual(4);
    });

    it("Iteration is not one time. Can iterate again", () =>
    {
        let list: List<any> = new List<number>();
        let first: any = {value: 8, name: "bb"};
        let second: any = {value: 10, name: "a"};
        let third: any = {value: 3, name: "ccc"};
        let fourth: any = {value: -5, name: "dddd"};

        list.add(first);
        list.add(second);
        list.add(third);
        list.add(fourth);

        let result: List<any> = new List();

        for(let n of list) {
            result.add(n);
        }

        for(let n of list) {
            result.add(n);
        }

        expect(result).toContain(first);
        expect(result).toContain(second);
        expect(result).toContain(third);
        expect(result).toContain(fourth);

        expect(result.length).toEqual(8);
    });

});
