import { DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import { User, UserRelations, Blog} from '../models';
import { MysqlDataSource } from '../datasources';
import { inject, Getter} from '@loopback/core';
import {BlogRepository} from './blog.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  public readonly blogs: HasManyRepositoryFactory<Blog, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BlogRepository') protected blogRepositoryGetter: Getter<BlogRepository>,
  ) {
    super(User, dataSource);
    this.blogs = this.createHasManyRepositoryFactoryFor('blogs', blogRepositoryGetter,);
    this.registerInclusionResolver('blogs', this.blogs.inclusionResolver);
  }
}
