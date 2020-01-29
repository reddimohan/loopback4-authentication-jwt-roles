import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Blog } from '../models';
import { BlogRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';
import { PermissionKeys } from '../authorization/permission-keys';

export class BlogController {
  constructor(
    @repository(BlogRepository)
    public blogRepository: BlogRepository,
  ) { }

  @authenticate('jwt', { required: [PermissionKeys.BlogManagement] })
  @post('/blogs', {
    responses: {
      '200': {
        description: 'Blog model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Blog) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {
            title: 'NewBlog',
            exclude: ['id'],
          }),
        },
      },
    })
    blog: Omit<Blog, 'id'>,
  ): Promise<Blog> {
    return this.blogRepository.create(blog);
  }

  @get('/blogs/count', {
    responses: {
      '200': {
        description: 'Blog model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Blog)) where?: Where<Blog>,
  ): Promise<Count> {
    return this.blogRepository.count(where);
  }

  @authenticate('jwt', { required: [PermissionKeys.GetBlogs, PermissionKeys.BlogManagement] })
  @get('/blogs', {
    responses: {
      '200': {
        description: 'Array of Blog model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Blog, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Blog)) filter?: Filter<Blog>,
  ): Promise<Blog[]> {
    return this.blogRepository.find(filter);
  }

  @authenticate('jwt', { required: [PermissionKeys.GetBlogs, PermissionKeys.BlogManagement] })
  @get('/blogs/{id}', {
    responses: {
      '200': {
        description: 'Blog model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Blog, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Blog)) filter?: Filter<Blog>
  ): Promise<Blog> {
    return this.blogRepository.findById(id, filter);
  }

  // @patch('/blogs/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Blog PATCH success',
  //     },
  //   },
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Blog, {partial: true}),
  //       },
  //     },
  //   })
  //   blog: Blog,
  // ): Promise<void> {
  //   await this.blogRepository.updateById(id, blog);
  // }

  @authenticate('jwt', { required: [PermissionKeys.GetBlogs, PermissionKeys.BlogManagement] })
  @put('/blogs/{id}', {
    responses: {
      '204': {
        description: 'Blog PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() blog: Blog,
  ): Promise<void> {
    await this.blogRepository.replaceById(id, blog);
  }

  @authenticate('jwt', { required: [PermissionKeys.BlogManagement] })
  @del('/blogs/{id}', {
    responses: {
      '204': {
        description: 'Blog DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.blogRepository.deleteById(id);
  }
}
