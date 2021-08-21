import Datastore from "nedb";
import config from "../config/db.configuration";
import DBException from "./db.exception";

class DBService {

    private _collection: string;
    private _payload: any;
    private _method: string;
    private _query: object;
    private _dbPath: string = config.DB_PATH;

    constructor(request: any) {
        this._payload = request.body.payload;
        this._collection = request.body.collection;
        this._method = request.body.method;
        this._query = request.body.query;
        this.distribute();
    }

    async distribute() {
        switch (this._method) {
            case "insert":
                return this.insert();
            case "find":
                return this.find();
            case "findOne":
                return this.findOne();
            case "update":
                return this.update();
            case "remove":
                return this.remove();
            case "count":
                return this.count();
        }
    }

    private insert() {
        new Datastore({ filename: `${this._dbPath}/${this._collection}.db`, autoload: true }).insert(this._payload, (error, insertedDoc) => {
            if (error) {
                throw new DBException(500, "Failed to insert document in the db");
            } else {
                return insertedDoc;
            }
        });
    }

    private find() { }

    private findOne() { }

    private count() { }

    private update() {

    }

    private remove() { }


}

export default DBService;