import mariadb from 'mariadb';
import InternalException from '../../../../Shared/Domain/Exception/InternalException';
import NotFoundException from '../../../../Shared/Domain/Exception/NotFoundException';
import Email from '../../../../Shared/Domain/ValueObject/Email';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Name from '../../../../Shared/Domain/ValueObject/Name';
import Password from '../../../../Shared/Domain/ValueObject/Password';
import { pool } from '../../../../Shared/Infraestructure/PollMariaDB';
import User from '../../Domain/Model/User';
import UserType from '../../Domain/Model/UserType';
import UserRepository from '../../Domain/Persistence/UserRepository';

class UserRepositoryMariaDB implements UserRepository {
    async register(user: User): Promise<void> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            await conn.query(
                'INSERT INTO users(id,email,name,password,createdAt) value (?, ?, ?, ?, ?)',
                [
                    user.id.value,
                    user.email.value,
                    user.name.value,
                    user.password.value,
                    user.createdAt,
                ]
            );
        } catch (err) {
            throw new InternalException(
                'unable to create user ' +
                    user.name.value +
                    '::' +
                    user.email.value
            );
        } finally {
            await this.disconnect(conn);
        }
    }

    async delete(id: Id): Promise<void> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            await conn.query('DELETE FROM users WHERE id=? LIMIT 1', [
                id.value,
            ]);
        } catch (err) {
            throw new NotFoundException('unable to delete user ' + id.value);
        } finally {
            await this.disconnect(conn);
        }
    }

    async get(id: Id): Promise<User> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            const result = await conn.query(
                'SELECT id,email,name,password,createdAt FROM users WHERE id=? LIMIT 1',
                [id.value]
            );
            if (result.length <= 0) {
                throw new NotFoundException('unable to get user');
            }

            return User.create(
                new Id(result[0].id),
                new Email(result[0].email),
                new Name(result[0].name),
                new Password(result[0].password),
                new Date(result[0].createdAt)
            );
        } catch (err) {
            throw new NotFoundException('unable to get user ' + id.value);
        } finally {
            await this.disconnect(conn);
        }
    }

    async getByEmail(email: Email): Promise<User> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            const collection = await conn.query(
                'SELECT id,email,name,password,createdAt FROM users WHERE email=? LIMIT 1',
                [email.value]
            );
            if (collection.length <= 0) {
                throw new NotFoundException('unable to get user by email');
            }

            return User.create(
                new Id(collection[0].id),
                new Email(collection[0].email),
                new Name(collection[0].name),
                new Password(collection[0].password),
                new Date(collection[0].createdAt)
            );
        } catch (err) {
            throw new NotFoundException('unable to get user');
        } finally {
            await this.disconnect(conn);
        }
    }

    async list(pattern?: string): Promise<User[]> {
        const conn: mariadb.PoolConnection = await this.connect();
        const result: User[] = [];
        try {
            const likeSql: string =
                typeof pattern === 'string' && pattern.trim() !== ''
                    ? `%${pattern?.trim()}%`
                    : '';
            const where: string =
                likeSql !== '' ? ' WHERE LOWER(name) LIKE ? ' : '';
            const values: string[] = likeSql !== '' ? [likeSql, likeSql] : [];
            const sql: string =
                'SELECT id,email,name,password,createdAt FROM users ' + where;

            const collection = await conn.query(sql, values);
            collection.forEach((item: UserType) => {
                result.push(
                    User.create(
                        new Id(item.id),
                        new Email(item.email),
                        new Name(item.name),
                        new Password(item.password),
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

export default UserRepositoryMariaDB;
