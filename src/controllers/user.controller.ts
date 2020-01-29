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
  getJsonSchemaRef,
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository, Credentials } from '../repositories';
import { CredentialsRequestBody } from './specs/user.controller.spec';
import { UserServiceBindings, TokenServiceBindings, PasswordHasherBindings } from '../keys';
import { inject } from '@loopback/core';
import { MyUserService } from '../services/user.service';
import { JWTService } from '../services/jwt-service';
import { BcryptHasher } from '../services/hash.password.bcrypt';
import { PermissionKeys } from '../authorization/permission-keys';
import { validateCredentials } from '../services/validator';
import * as _ from 'lodash';
import { authenticate } from '@loopback/authentication';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) { }

  @authenticate('jwt', { required: [PermissionKeys.UserManagement] })
  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  async signup(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          title: 'NewUser',
          exclude: ['id', 'permissions', 'additionalProp1'],
        }),
      },
    },
  })
  userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']));
    userData.permissions = [
      PermissionKeys.AuthFeatures,
      PermissionKeys.GetBlogs
    ]
    userData.password = await this.hasher.hashPassword(userData.password)

    const newUser = await this.userRepository.create(userData);
    delete newUser.password;

    return newUser;
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<{ token: string }> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    userProfile.permissions = user.permissions;
    const jwt = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({ token: jwt });
  }


  @authenticate('jwt', { required: [PermissionKeys.UserBasic] })
  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate('jwt', { required: [PermissionKeys.UserManagement] })
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @authenticate('jwt', { required: [PermissionKeys.UserManagement] })
  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @authenticate('jwt', { required: [PermissionKeys.UserManagement] })
  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }


  @authenticate('jwt', { required: [PermissionKeys.UserManagement] })
  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
