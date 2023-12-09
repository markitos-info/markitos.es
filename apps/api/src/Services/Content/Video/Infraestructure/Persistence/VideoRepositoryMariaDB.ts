import mariadb from 'mariadb';
import InternalException from '../../../../Shared/Domain/Exception/InternalException';
import NotFoundException from '../../../../Shared/Domain/Exception/NotFoundException';
import CommaTags from '../../../../Shared/Domain/ValueObject/CommaTags';
import Description from '../../../../Shared/Domain/ValueObject/Description';
import Id from '../../../../Shared/Domain/ValueObject/Id';
import Poster from '../../../../Shared/Domain/ValueObject/Poster';
import Title from '../../../../Shared/Domain/ValueObject/Title';
import Youtube from '../../../../Shared/Domain/ValueObject/Youtube';
import Video from '../../Domain/Model/Video';
import VideoType from '../../Domain/Model/VideoType';
import VideoRepository from '../../Domain/Persistence/VideoRepository';
import PlaylistId from '../../Domain/ValueObject/PlaylistId';

const pool = mariadb.createPool({
    host: 'mariadb',
    port: 3306,
    database: 'markitos',
    user: 'markitos',
    password: 'markitos',
    connectionLimit: 5,
});

class VideoRepositoryMariaDB implements VideoRepository {
    async create(video: Video): Promise<void> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            await conn.query(
                'INSERT INTO videos(id,title,description,tags,url,poster,createdAt,playlist,position) value (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    video.id.value,
                    video.title.value,
                    video.description.value,
                    video.tags.value,
                    video.url.value,
                    video.poster.value,
                    video.createdAt,
                    video.playlist?.value,
                    video.position,
                ]
            );
        } catch (err) {
            throw new InternalException(
                'unable to create video ' + video.title.value
            );
        } finally {
            await this.disconnect(conn);
        }
    }

    async delete(id: Id): Promise<void> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            await conn.query('DELETE FROM videos WHERE id=? LIMIT 1', [
                id.value,
            ]);
        } catch (err) {
            throw new NotFoundException('unable to delete video ' + id.value);
        } finally {
            await this.disconnect(conn);
        }
    }

    async get(id: Id): Promise<Video> {
        const conn: mariadb.PoolConnection = await this.connect();
        try {
            const result = await conn.query(
                'SELECT id,title,description,tags,url,poster,createdAt,playlist,position FROM videos WHERE id=? LIMIT 1',
                [id.value]
            );

            return Video.create(
                new Id(result[0].id),
                new Title(result[0].title),
                new Description(result[0].description),
                new CommaTags(result[0].tags),
                new Youtube(result[0].url),
                new Poster(result[0].poster),
                new Date(result[0].createdAt),
                new PlaylistId(result[0].playlist),
                result[0].position
            );
        } catch (err) {
            throw new NotFoundException('unable to get video ' + id.value);
        } finally {
            await this.disconnect(conn);
        }
    }

    async list(pattern?: string): Promise<Video[]> {
        const conn: mariadb.PoolConnection = await this.connect();
        const result: Video[] = [];
        try {
            const likeSql: string =
                typeof pattern === 'string' && pattern.trim() !== ''
                    ? `%${pattern?.trim()}%`
                    : '';
            const where: string =
                likeSql !== ''
                    ? ' WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ? '
                    : '';
            const values: string[] =
                likeSql !== '' ? [likeSql, likeSql, likeSql] : [];
            const sql: string =
                'SELECT id,title,description,tags,url,poster,createdAt,playlist,position FROM videos ' +
                where +
                ' ORDER BY createdAt,position';

            const collection = await conn.query(sql, values);
            collection.forEach((item: VideoType) => {
                result.push(
                    Video.create(
                        new Id(item.id),
                        new Title(item.title),
                        new Description(item.description),
                        new CommaTags(item.tags),
                        new Youtube(item.url),
                        new Poster(item.poster),
                        new Date(item.createdAt),
                        new PlaylistId(<string>item.playlist),
                        item.position
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
    async playlist(id: string): Promise<Video[]> {
        const conn: mariadb.PoolConnection = await this.connect();
        const result: Video[] = [];
        try {
            const where: string = ' WHERE playlist=?';
            const values: string[] = [id];
            const sql: string =
                'SELECT id,title,description,tags,url,poster,createdAt,playlist,position FROM videos ' +
                where +
                ' ORDER BY createdAt,position';

            const collection = await conn.query(sql, values);
            collection.forEach((item: VideoType) => {
                result.push(
                    Video.create(
                        new Id(item.id),
                        new Title(item.title),
                        new Description(item.description),
                        new CommaTags(item.tags),
                        new Youtube(item.url),
                        new Poster(item.poster),
                        new Date(item.createdAt),
                        new PlaylistId(<string>item.playlist),
                        item.position
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

export default VideoRepositoryMariaDB;
