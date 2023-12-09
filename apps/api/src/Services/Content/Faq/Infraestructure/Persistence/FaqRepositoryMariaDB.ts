import mariadb from 'mariadb';
import InternalException from '../../../../Shared/Domain/Exception/InternalException';
import NotFoundException from '../../../../Shared/Domain/Exception/NotFoundException';
import CommaTags from '../../../../Shared/Domain/ValueObject/CommaTags';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Title from '../../../../Shared/Domain/ValueObject/Title';
import Faq from '../../Domain/Model/Faq';
import FaqType from '../../Domain/Model/FaqType';
import FaqRepository from '../../Domain/Persistence/FaqRepository';
import Solution from '../../Domain/ValueObject/Solution';

const pool = mariadb.createPool({
    host: 'mariadb',
    port: 3306,
    database: 'markitos',
    user: 'markitos',
    password: 'markitos',
    connectionLimit: 5,
});

class FaqRepositoryMariaDB implements FaqRepository {
    async create(faq: Faq): Promise<void> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            await conn.query(
                'INSERT INTO faqs(id,title,solution,tags,createdAt) value (?, ?, ?, ?, ?)',
                [
                    faq.id.value,
                    faq.title.value,
                    faq.solution.value,
                    faq.tags.value,
                    faq.createdAt,
                ]
            );
        } catch (err) {
            throw new InternalException(
                'unable to create faq ' + faq.title.value
            );
        } finally {
            await this.disconnect(conn);
        }
    }

    async delete(id: Id): Promise<void> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            await conn.query('DELETE FROM faqs WHERE id=? LIMIT 1', [id.value]);
        } catch (err) {
            throw new NotFoundException('unable to delete faq ' + id.value);
        } finally {
            await this.disconnect(conn);
        }
    }

    async get(id: Id): Promise<Faq> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            const result = await conn.query(
                'SELECT id,title,solution,tags,createdAt FROM faqs WHERE id=? LIMIT 1',
                [id.value]
            );
            return Faq.create(
                new Id(result.id),
                new Title(result.title),
                new Solution(result.solution),
                new CommaTags(result.tags),
                new Date(result.createdAt)
            );
        } catch (err) {
            throw new NotFoundException('unable to get faq ' + id.value);
        } finally {
            await this.disconnect(conn);
        }
    }

    async list(pattern?: string): Promise<Faq[]> {
        const conn: mariadb.PoolConnection = await this.connect();
        const result: Faq[] = [];
        try {
            const likeSql: string =
                typeof pattern === 'string' && pattern.trim() !== ''
                    ? `%${pattern?.trim()}%`
                    : '';
            const where: string =
                likeSql !== ''
                    ? ' WHERE LOWER(title) LIKE ? OR LOWER(solution) LIKE ? OR LOWER(tags) LIKE ? '
                    : '';
            const values: string[] =
                likeSql !== '' ? [likeSql, likeSql, likeSql] : [];
            const sql: string =
                'SELECT id,title,solution,tags,createdAt FROM faqs ' + where;

            const collection = await conn.query(sql, values);
            collection.forEach((item: FaqType) => {
                result.push(
                    Faq.create(
                        new Id(item.id),
                        new Title(item.title),
                        new Solution(item.solution),
                        new CommaTags(item.tags),
                        new Date(item.createdAt)
                    )
                );
            });
        } catch (error) {
            return result;
        } finally {
            await this.disconnect(conn);
        }

        return result;
    }

    private async connect(): Promise<mariadb.PoolConnection> {
        return await pool.getConnection();
    }

    private async disconnect(
        connection: mariadb.PoolConnection
    ): Promise<void> {
        connection.end();
    }
}

export default FaqRepositoryMariaDB;
