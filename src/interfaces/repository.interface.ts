
export interface IRepository<T> {
    getAll(): unknown;
    getById(id: string): unknown;
    save(obj: T): unknown;
    update(obj: T): unknown;
    delete(id: string): unknown;
}