import { post, requestBody, getJsonSchemaRef, getModelSchemaRef } from "@loopback/rest";
import { User } from "../models";
import { validateCredentials } from "../services/validator";
import { PasswordHasherBindings, UserServiceBindings } from "../keys";
import { BcryptHasher } from "../services/hash.password.bcrypt";
import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories";
import * as _ from 'lodash';
import { PermissionKeys } from "../authorization/permission-keys";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class AdminController {
  constructor(
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/admin', {
    responses: {
      '200': {
        description: 'Admin',
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  async create(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          title: 'NewUser',
          exclude: ['id', 'permissions', 'additionalProp1'],
        }),
      },
    },
  })
  admin: User) {
    validateCredentials(_.pick(admin, ['email', 'password']));
    admin.permissions = [
      PermissionKeys.BlogManagement,
      PermissionKeys.UserManagement
    ]
    admin.password = await this.hasher.hashPassword(admin.password);
    const newAdmin = await this.userRepository.create(admin);
    delete newAdmin.password;

    return newAdmin;
  }

}
