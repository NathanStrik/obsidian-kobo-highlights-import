import * as chai from 'chai';
import { readFileSync } from 'fs';
import SqlJs, { Database } from 'sql.js';
import { binary } from '../binaries/sql-wasm';
import { Repository } from '../database/repository';

describe('Repository', async function () {
    let db: Database
    let repo: Repository

    before(async function () {
        const SQLEngine = await SqlJs({
            wasmBinary: binary
        })

        db = new SQLEngine.Database(readFileSync("KoboReader.sqlite"))
        repo = new Repository(db);
    })

    after(function () {
        db.close()
    })

    it('getAllBookmark', async function () {
        chai.expect(await repo.getAllBookmark()).length.above(0)
    });
    it('getAllContent', async function () {
        chai.expect(await repo.getAllContent()).length.above(0)
    });
    it('getContentByContentId', async function () {
        const content = await repo.getAllContent(1)
        chai.expect(await repo.getContentByContentId(content.pop()?.contentId ?? "")).not.null
    });
    it('getContentByContentId no results', async function () {
        chai.expect(await repo.getContentByContentId("")).null
    });
    it('getAllContentByBookTitle', async function () {
        const contents = await repo.getAllContent()
        const titles: string[] = []
        contents.forEach(c => {
            if (c.bookTitle != null) {
                titles.push(c.bookTitle)
            }
        });
        chai.expect(await repo.getAllContentByBookTitle(titles.at(Math.floor(Math.random() * titles.length)) ?? "")).length.above(0)
    });
});
